import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, Feather, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEntries, getUser } from "@/api/diary-storage";

export const Route = createFileRoute("/_protected/dashboard")({
  head: () => ({
    meta: [
      { title: "Your stories — Diary" },
      {
        name: "description",
        content: "Browse and revisit the moments saved in your personal Diary.",
      },
      { property: "og:title", content: "Your stories — Diary" },
      {
        property: "og:description",
        content: "Browse and revisit the moments saved in your personal Diary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const shortDate = (value) =>
  new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(
    new Date(value),
  );

const longDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "short" }).format(new Date(value));

// Builds a short, readable excerpt from an entry's content, centered on the first
// place the search term appears (falls back to the start of the entry).
function excerpt(content, normalizedQuery) {
  const flat = content.replace(/\s+/g, " ").trim();
  if (!normalizedQuery) return flat.length > 160 ? `${flat.slice(0, 160).trim()}…` : flat;
  const matchAt = flat.toLocaleLowerCase().indexOf(normalizedQuery);
  if (matchAt === -1) return flat.length > 160 ? `${flat.slice(0, 160).trim()}…` : flat;
  const start = Math.max(0, matchAt - 60);
  const end = Math.min(flat.length, matchAt + normalizedQuery.length + 100);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < flat.length ? "…" : "";
  return `${prefix}${flat.slice(start, end).trim()}${suffix}`;
}

function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [diaryName, setDiaryName] = useState("My Diary");
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const bookScrollRef = useRef(null);
  const bookRef = useRef(null);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const isSearching = normalizedQuery.length > 0;

  // Search results, shown as a clean list — the 3D page-turn book below is unaffected
  // by search and always browses the full, unfiltered set of entries.
  const results = useMemo(() => {
    if (!isSearching) return [];
    return entries.filter((entry) =>
      `${entry.title} ${entry.content}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [entries, isSearching, normalizedQuery]);

  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch(() => setEntries([]));
    setDiaryName(getUser()?.diaryName || "My Diary");
  }, []);

  // Drives the 3D diary / page-turn animation — unchanged from the original browsing
  // experience, and always driven by the full entry list (never the search results).
  useEffect(() => {
    const scrollScene = bookScrollRef.current;
    const book = bookRef.current;
    if (isSearching || !scrollScene || !book || entries.length === 0) return;
    let frame = 0;
    const updateBook = () => {
      frame = 0;
      const bounds = scrollScene.getBoundingClientRect();
      const distance = Math.max(1, scrollScene.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / distance));
      const pageProgress = progress * Math.max(1, entries.length - 1);
      const index = Math.min(entries.length - 1, Math.floor(pageProgress + 0.001));
      const turn = index === entries.length - 1 ? 0 : pageProgress - index;
      book.style.setProperty("--page-turn", turn.toFixed(3));
      book.style.setProperty("--book-progress", progress.toFixed(3));
      setActiveIndex((current) => (current === index ? current : index));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateBook);
    };
    updateBook();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [entries, isSearching]);

  // Clears the search box and smoothly scrolls the (always-full) book to the page
  // for the chosen entry.
  const jumpToEntry = (index) => {
    setQuery("");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const scrollScene = bookScrollRef.current;
        if (!scrollScene) return;
        const distance = Math.max(1, scrollScene.offsetHeight - window.innerHeight);
        const progress = index / Math.max(1, entries.length - 1);
        const top = scrollScene.getBoundingClientRect().top + window.scrollY + progress * distance;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  };

  const current = entries[activeIndex];
  const next = entries[Math.min(activeIndex + 1, entries.length - 1)];
  const sceneHeight = `${Math.max(1, entries.length - 1) * 90 + 100}svh`;

  return (
    <div className="dashboard-page">
      <div className="dashboard-atmosphere" aria-hidden="true">
        <span className="dashboard-glow dashboard-glow-one" />
        <span className="dashboard-glow dashboard-glow-two" />
        {Array.from({ length: 10 }, (_, index) => (
          <i key={index} style={{ "--particle-index": index }} />
        ))}
      </div>
      <div className="dashboard-content mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-12">
        <div className="dashboard-heading-reveal">
          <PageHeading
            eyebrow={diaryName}
            title="Your stories"
            detail="Every page is a small home for the person you were in that moment."
            action={
              <Button asChild variant="hero">
                <Link to="/add-entry">
                  <Plus /> New entry
                </Link>
              </Button>
            }
          />
        </div>
        {entries.length > 0 ? (
          <div className={`dashboard-search ${query ? "has-query" : ""}`}>
            <Search aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your diary…"
              aria-label="Search diary entries by title or content"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="dashboard-search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              tabIndex={query ? 0 : -1}
            >
              <X />
            </Button>
          </div>
        ) : null}

        {isSearching ? (
          <div className="dashboard-results" role="status" aria-live="polite">
            <p className="dashboard-results-count">
              {results.length === 0
                ? "No pages found"
                : `${results.length} ${results.length === 1 ? "entry" : "entries"} found`}
            </p>
            {results.length === 0 ? (
              <div className="dashboard-no-results">
                <Search aria-hidden="true" />
                <h2>No pages found</h2>
                <p>Try another word or clear your search.</p>
                <Button type="button" variant="outline" onClick={() => setQuery("")}>
                  <X /> Clear search
                </Button>
              </div>
            ) : (
              <ul className="dashboard-results-list">
                {results.map((entry) => {
                  const originalIndex = entries.findIndex((candidate) => candidate.id === entry.id);
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        className="dashboard-result"
                        onClick={() => jumpToEntry(Math.max(0, originalIndex))}
                      >
                        <span className="dashboard-result-top">
                          <span className="dashboard-result-mood">{entry.mood}</span>
                          <time>{shortDate(entry.createdAt)}</time>
                        </span>
                        <h3>{entry.title}</h3>
                        <p>{excerpt(entry.content, normalizedQuery)}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}
      </div>

      {entries.length === 0 ? (
        <div className="empty-state mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <span className="empty-book mx-auto mb-7 grid size-20 place-items-center rounded-lg bg-secondary text-primary">
            <BookOpen size={34} />
          </span>
          <h2 className="font-display text-3xl">Your diary is waiting for its first story…</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A passing thought, a full heart, or simply what happened today—it all belongs.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-7">
            <Link to="/add-entry">
              <Feather /> Write your first entry
            </Link>
          </Button>
        </div>
      ) : isSearching ? null : current && next ? (
        <div className="dashboard-book-scroll" ref={bookScrollRef} style={{ height: sceneHeight }}>
          <div className="dashboard-book-sticky">
            <div className="dashboard-book-stage">
              <div className="dashboard-book" ref={bookRef} aria-live="polite">
                <div className="dashboard-book-shadow" aria-hidden="true" />
                <div className="dashboard-book-edges" aria-hidden="true" />
                <div className="dashboard-book-spread">
                  <section className="dashboard-diary-page dashboard-left-page">
                    <span className="dashboard-page-number">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="dashboard-entry-mood">{current.mood}</span>
                    <time>{shortDate(current.createdAt)}</time>
                    <h2>{current.title}</h2>
                    <span className="dashboard-flourish" aria-hidden="true">
                      ✦
                    </span>
                  </section>
                  <section className="dashboard-diary-page dashboard-right-page">
                    <div className="dashboard-entry-copy">
                      <h2>{next.title}</h2>
                      <p>{next.content}</p>
                      <small>
                        Felt {next.mood} · {longDate(next.createdAt)}
                      </small>
                    </div>
                  </section>
                  <div className="dashboard-turning-page" aria-hidden="true">
                    <div className="dashboard-turn-front">
                      <div className="dashboard-entry-copy">
                        <h2>{current.title}</h2>
                        <p>{current.content}</p>
                        <small>
                          Felt {current.mood} · {longDate(current.createdAt)}
                        </small>
                      </div>
                    </div>
                    <div className="dashboard-turn-back">
                      <span>{next.mood}</span>
                      <strong>{next.title}</strong>
                    </div>
                  </div>
                  <span className="dashboard-book-spine" aria-hidden="true" />
                </div>
              </div>
              <div className="dashboard-book-status">
                <span>
                  {activeIndex + 1} / {entries.length}
                </span>
                {entries.length > 1 && activeIndex < entries.length - 1 ? (
                  <span className="dashboard-scroll-prompt">
                    Scroll to turn the page <i />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

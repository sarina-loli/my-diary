import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import roomImage from "@/assets/cozy-diary-room.jpg";
import { HomeDiaryScene } from "@/components/home-diary-scene";
import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/api/diary-storage";
export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Diary — Where thoughts become memories" },
      {
        name: "description",
        content:
          "Open a magical private diary for your thoughts, moods, and most meaningful memories.",
      },
      { property: "og:title", content: "Diary — Where thoughts become memories" },
      {
        property: "og:description",
        content:
          "Open a magical private diary for your thoughts, moods, and most meaningful memories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
const quotes = [
  "Some memories deserve a place to stay.",
  "Write what your heart cannot say.",
  "Yesterday is a memory, today is a story.",
  "Where thoughts become memories.",
];
function HomePage() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const sceneRef = useRef(null);
  useEffect(() => {
    setReady(isLoggedIn());
  }, []);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setProgress(1);
      return;
    }
    let frame = 0;
    let target = 0;
    let current = 0;
    const measure = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const bounds = scene.getBoundingClientRect();
      const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
      target = Math.min(1, Math.max(0, -bounds.top / travel));
    };
    let last = 0;
    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.25) : 1 / 60;
      last = now;
      const diff = target - current;
      current = Math.abs(diff) < 0.0005 ? target : current + diff * (1 - Math.exp(-dt * 5));
      setProgress(current);
      if (target !== current) frame = window.requestAnimationFrame(tick);
      else {
        frame = 0;
        last = 0;
      }
    };
    const requestUpdate = () => {
      measure();
      if (!frame) frame = window.requestAnimationFrame(tick);
    };
    measure();
    current = target;
    setProgress(current);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const destination = ready ? "/add-entry" : "/login";
  return (
    <div className="home-experience overflow-clip">
      <section
        ref={sceneRef}
        className="diary-hero-scroll"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({
            x: (event.clientX / rect.width) * 2 - 1,
            y: ((event.clientY - rect.top) / window.innerHeight) * 2 - 1,
          });
        }}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="diary-hero-sticky">
          <img
            src={roomImage}
            width={1536}
            height={1024}
            alt="A warm blush reading room ready for quiet writing"
            className="diary-room-image"
            style={{
              transform: `scale(${1.04 + progress * 0.08}) translate3d(${pointer.x * -8}px, ${progress * -3}vh, 0)`,
            }}
          />
          <div className="diary-room-wash" />
          <div
            className="hero-copy"
            style={{
              opacity: 1 - clamp01(progress / 0.3) * 0.75,
              translate: `0 ${-progress * 8}vh`,
            }}
          >
            <p className="hero-eyebrow">
              <Sparkles size={14} /> Your story lives here
            </p>
            <h1>
              Your story,
              <br />
              <em>held softly.</em>
            </h1>
            <p className="hero-lede">
              A beautiful little ritual for honest thoughts, small wonders, and everything worth
              remembering.
            </p>
          </div>

          <div className="diary-canvas-wrap" aria-hidden="true">
            <HomeDiaryScene progress={progress} pointer={pointer} />
          </div>

          <div className="diary-words" aria-live="polite">
            {quotes.map((quote, index) => {
              const t = clamp01((progress - (0.06 + index * 0.165)) / 0.24);
              const ease = t * t * (3 - 2 * t);
              const opacity =
                t <= 0 || t >= 1 ? 0 : Math.min(1, t / 0.18) * Math.min(1, (1 - t) / 0.38);
              return (
                <blockquote
                  key={quote}
                  className={t > 0 && t < 1 ? "is-rising" : ""}
                  style={{
                    opacity,
                    transform: `translate3d(0, ${-ease * 34}vh, 0) scale(${0.86 + ease * 0.2}) rotateX(${(1 - ease) * 38}deg)`,
                    filter: `blur(${(1 - Math.min(1, t / 0.18)) * 4 + Math.max(0, t - 0.7) * 10}px)`,
                  }}
                >
                  “{quote}”
                </blockquote>
              );
            })}
          </div>

          {(() => {
            const t = clamp01((progress - 0.74) / 0.18);
            const ease = 1 - Math.pow(1 - t, 3);
            return (
              <div
                className="diary-cta"
                style={{
                  opacity: ease,
                  transform: `translate3d(-50%, ${-ease * 16}vh, 0) scale(${0.8 + ease * 0.2})`,
                  pointerEvents: t > 0.4 ? "auto" : "none",
                }}
              >
                <Button asChild variant="hero" size="lg">
                  <Link to={destination}>
                    Get started <ArrowRight />
                  </Link>
                </Button>
              </div>
            );
          })()}

          <div className="scroll-cue">
            <span /> Scroll to open
          </div>
        </div>
      </section>
    </div>
  );
}

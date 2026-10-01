import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Feather, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addEntry } from "@/api/diary-storage";
const moods = ["😊", "😢", "❤️", "✨", "🌿", "😠", "💭"];
const schema = z.object({
  title: z.string().trim().min(1, "Give this memory a title.").max(120),
  content: z.string().trim().min(1, "Write a little something first.").max(5000),
  mood: z.string().refine((v) => moods.includes(v), "Choose a mood."),
});
export const Route = createFileRoute("/_protected/add-entry")({
  head: () => ({
    meta: [
      { title: "Write a new entry — Diary" },
      {
        name: "description",
        content: "Write a new personal diary entry and capture how today felt.",
      },
      { property: "og:title", content: "Write a new entry — Diary" },
      {
        property: "og:description",
        content: "Write a new personal diary entry and capture how today felt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AddEntryPage,
});
function AddEntryPage() {
  const navigate = useNavigate({ from: "/add-entry" });
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("✨");
  const [error, setError] = useState("");
  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  const submit = async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse({ ...values, mood });
    if (!result.success) return setError(result.error.issues[0]?.message || "Check your entry.");
    try {
      await addEntry(result.data);
      toast.success("Your story is safely tucked away.");
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || "Could not save your entry.");
    }
  };
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <PageHeading
        eyebrow="New page"
        title="What’s on your mind?"
        detail="There is no right way to fill a page. Begin exactly where you are."
        action={
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <CalendarDays size={16} />
            {today}
          </div>
        }
      />
      <form
        onSubmit={submit}
        className="paper-sheet mx-auto max-w-3xl rounded-lg border border-border bg-card p-5 shadow-elevated sm:p-9"
      >
        <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
          <div>
            <p className="font-display text-2xl">Dear Diary,</p>
            <p className="mt-1 text-xs text-muted-foreground sm:hidden">{today}</p>
          </div>
          <Feather className="text-primary" />
        </div>
        <Input
          name="title"
          placeholder="Give this moment a title…"
          maxLength={120}
          required
          className="h-14 border-0 border-b border-border px-0 font-display text-2xl shadow-none focus-visible:ring-0"
        />
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let the words find their way…"
          maxLength={5000}
          required
          className="mt-5 min-h-64 resize-y border-0 bg-transparent px-0 text-base leading-8 shadow-none focus-visible:ring-0"
        />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Your words stay on this device.</span>
          <span>{content.length} / 5000</span>
        </div>
        <fieldset className="mt-7">
          <legend className="mb-3 text-sm font-semibold">How does this moment feel?</legend>
          <div className="flex flex-wrap gap-2">
            {moods.map((item) => (
              <button
                type="button"
                key={item}
                aria-label={`Mood ${item}`}
                aria-pressed={mood === item}
                onClick={() => setMood(item)}
                className={`mood-button ${mood === item ? "is-selected" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        {error ? (
          <p role="alert" className="mt-5 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div className="mt-8 flex justify-end">
          <Button type="submit" variant="hero" size="lg">
            <Save /> Save entry
          </Button>
        </div>
      </form>
    </div>
  );
}

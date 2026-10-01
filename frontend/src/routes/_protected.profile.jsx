import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookHeart, BookOpenText, LogOut, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { getEntries, getUser, logoutUser } from "@/api/diary-storage";
export const Route = createFileRoute("/_protected/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Diary" },
      { name: "description", content: "View your Diary profile and personal writing details." },
      { property: "og:title", content: "Your profile — Diary" },
      {
        property: "og:description",
        content: "View your Diary profile and personal writing details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});
function ProfilePage() {
  const navigate = useNavigate({ from: "/profile" });
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setUser(getUser());
    getEntries()
      .then((entries) => setCount(entries.length))
      .catch(() => setCount(0));
  }, []);
  const logout = async () => {
    await logoutUser();
    navigate({ to: "/login", replace: true });
  };
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <PageHeading
        eyebrow="Your space"
        title="Profile"
        detail="The little details behind your private collection of moments."
      />
      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-elevated">
        <div className="profile-banner p-7 sm:p-10">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-petal">
              <UserRound size={28} />
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-display text-3xl">{user?.name || "Diary keeper"}</h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                Keeper of {user?.diaryName || "My Diary"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-3">
          <ProfileItem icon={<Mail />} label="Email" value={user?.email || "—"} />
          <ProfileItem icon={<BookHeart />} label="Diary name" value={user?.diaryName || "—"} />
          <ProfileItem icon={<BookOpenText />} label="Stories written" value={String(count)} />
        </div>
        <div className="flex justify-end p-5 sm:p-7">
          <Button variant="outline" onClick={logout}>
            <LogOut /> Log out
          </Button>
        </div>
      </section>
    </div>
  );
}
function ProfileItem({ icon, label, value }) {
  return (
    <div className="min-w-0 bg-card p-6">
      <span className="mb-4 block text-primary">{icon}</span>
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-medium">{value}</p>
    </div>
  );
}

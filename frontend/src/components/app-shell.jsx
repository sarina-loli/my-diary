import { Link, useLocation } from "@tanstack/react-router";
import {
  BookHeart,
  Feather,
  Home,
  LayoutDashboard,
  LogIn,
  Menu,
  Moon,
  Plus,
  Sun,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isLoggedIn } from "@/api/diary-storage";
const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-entry", label: "Add Entry", icon: Plus },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/login", label: "Login", icon: LogIn },
];
function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Diary home">
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-petal">
        <BookHeart size={20} />
      </span>
      <span>
        <strong className="block font-display text-2xl font-medium leading-none">Diary</strong>
        <small className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Your quiet place
        </small>
      </span>
    </Link>
  );
}
function NavLinks({ onNavigate }) {
  const location = useLocation();
  const [signedIn, setSignedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setSignedIn(isLoggedIn());
    setMounted(true);
  }, [location.pathname]);
  if (!mounted) return <nav className="h-[218px]" aria-label="Primary navigation" />;
  return (
    <nav className="space-y-1.5" aria-label="Primary navigation">
      {links.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to;
        const shownLabel = to === "/login" && signedIn ? "Account" : label;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`group flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all ${active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
          >
            <Icon size={18} className="shrink-0" />
            {shownLabel}
            {active ? <span className="ml-auto size-1.5 rounded-full bg-primary" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}
function ThemeButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const next = localStorage.getItem("diary:theme") === "dark";
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("diary:theme", next ? "dark" : "light");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      title={dark ? "Use light theme" : "Use dark theme"}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
export function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar/90 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <Brand />
        <div className="mt-12 flex-1">
          <NavLinks />
        </div>
        <div className="rounded-lg border border-border bg-secondary/60 p-4">
          <Feather size={18} className="mb-2 text-primary" />
          <p className="font-display text-lg">One page at a time.</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Make room for whatever today held.
          </p>
        </div>
      </aside>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:left-64 lg:px-7">
        <div className="lg:hidden">
          <Brand />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeButton />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[82vw] max-w-xs border-sidebar-border bg-sidebar p-5"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Brand />
              <div className="mt-12">
                <NavLinks onNavigate={() => setMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="min-h-screen pt-16 lg:pl-64">
        <div className="page-enter">{children}</div>
      </main>
    </div>
  );
}

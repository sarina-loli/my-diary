import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookHeart, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isLoggedIn, loginUser } from "@/api/diary-storage";
const searchSchema = z.object({ redirect: z.string().optional().catch(undefined) });
const schema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  beforeLoad: () => {
    if (isLoggedIn()) return;
  },
  head: () => ({
    meta: [
      { title: "Welcome back — Diary" },
      { name: "description", content: "Sign in to continue writing in your personal Diary." },
      { property: "og:title", content: "Welcome back — Diary" },
      {
        property: "og:description",
        content: "Sign in to continue writing in your personal Diary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});
function LoginPage() {
  const navigate = useNavigate({ from: "/login" });
  const { redirect } = Route.useSearch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) return setError(result.error.issues[0]?.message || "Check your details.");
    try {
      await loginUser(result.data.email, result.data.password);
      navigate({
        to:
          redirect === "/dashboard" || redirect === "/add-entry" || redirect === "/profile"
            ? redirect
            : "/dashboard",
      });
    } catch (err) {
      setError(err.message || "That email and password do not match.");
    }
  };
  return (
    <AuthLayout title="Welcome back" detail="Your pages have been waiting for you.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={255}
            required
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <Input
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              maxLength={72}
              required
              className="pr-11"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </Field>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Open my diary
        </Button>
      </form>
      <p className="mt-7 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create your diary
        </Link>
      </p>
    </AuthLayout>
  );
}
export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
export function AuthLayout({ title, detail, children }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-10">
      <div className="auth-panel w-full max-w-md rounded-lg border border-border bg-card/85 p-6 shadow-elevated backdrop-blur-xl sm:p-9">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-5 grid size-14 place-items-center rounded-lg bg-primary text-primary-foreground shadow-petal">
            <BookHeart />
          </span>
          <h1 className="font-display text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

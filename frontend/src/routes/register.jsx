import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout, Field } from "./login";
import { registerUser } from "@/api/diary-storage";
const schema = z
  .object({
    name: z.string().trim().min(2, "Tell us your name.").max(80),
    email: z.string().trim().email("Enter a valid email.").max(255),
    password: z.string().min(6, "Use at least 6 characters.").max(72),
    confirm: z.string(),
    diaryName: z.string().trim().min(2, "Name your diary.").max(80),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match.",
  });
export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your Diary" },
      {
        name: "description",
        content: "Create your personal Diary and begin capturing the moments that matter.",
      },
      { property: "og:title", content: "Create your Diary" },
      {
        property: "og:description",
        content: "Create your personal Diary and begin capturing the moments that matter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});
function RegisterPage() {
  const navigate = useNavigate({ from: "/register" });
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const result = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) return setError(result.error.issues[0]?.message || "Check your details.");
    const { name, email, password, diaryName } = result.data;
    try {
      await registerUser({ name, email, password, diaryName });
      navigate({ to: "/add-entry" });
    } catch (err) {
      setError(err.message || "Could not create your diary.");
    }
  };
  return (
    <AuthLayout title="Begin your story" detail="A private little place to call your own.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <Input name="name" maxLength={80} required placeholder="Your name" />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" maxLength={255} required placeholder="you@example.com" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Password">
            <Input name="password" type="password" minLength={6} maxLength={72} required />
          </Field>
          <Field label="Confirm password">
            <Input name="confirm" type="password" minLength={6} maxLength={72} required />
          </Field>
        </div>
        <Field label="Diary name">
          <Input name="diaryName" maxLength={80} required placeholder="My little book" />
        </Field>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Create my diary
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have one?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

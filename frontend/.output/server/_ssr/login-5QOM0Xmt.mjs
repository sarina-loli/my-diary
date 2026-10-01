import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as loginUser, t as Button } from "./diary-storage-BmFIbeEd.mjs";
import { t as Input } from "./input-TrwTBHGd.mjs";
import { _ as EyeOff, g as Eye, x as BookHeart } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { r as Route } from "./login-6Gqa4PNl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-5QOM0Xmt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email("Enter a valid email."),
	password: stringType().min(6, "Password must be at least 6 characters.")
});
function LoginPage() {
	const navigate = useNavigate({ from: "/login" });
	const { redirect } = Route.useSearch();
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const submit = async (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const result = schema.safeParse(data);
		if (!result.success) return setError(result.error.issues[0]?.message || "Check your details.");
		try {
			await loginUser(result.data.email, result.data.password);
			navigate({ to: redirect === "/dashboard" || redirect === "/add-entry" || redirect === "/profile" ? redirect : "/dashboard" });
		} catch (err) {
			setError(err.message || "That email and password do not match.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Welcome back",
		detail: "Your pages have been waiting for you.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "email",
						type: "email",
						autoComplete: "email",
						placeholder: "you@example.com",
						maxLength: 255,
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "password",
							type: show ? "text" : "password",
							autoComplete: "current-password",
							placeholder: "Your password",
							maxLength: 72,
							required: true,
							className: "pr-11"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "absolute right-1 top-1",
							onClick: () => setShow(!show),
							"aria-label": show ? "Hide password" : "Show password",
							children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
						})]
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-sm text-destructive",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "hero",
					size: "lg",
					className: "w-full",
					children: "Open my diary"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-7 text-center text-sm text-muted-foreground",
			children: [
				"New here?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "font-semibold text-primary hover:underline",
					children: "Create your diary"
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-sm font-semibold",
			children: label
		}), children]
	});
}
function AuthLayout({ title, detail, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-panel w-full max-w-md rounded-lg border border-border bg-card/85 p-6 shadow-elevated backdrop-blur-xl sm:p-9",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto mb-5 grid size-14 place-items-center rounded-lg bg-primary text-primary-foreground shadow-petal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookHeart, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: detail
					})
				]
			}), children]
		})
	});
}
//#endregion
export { AuthLayout, Field, LoginPage as component };

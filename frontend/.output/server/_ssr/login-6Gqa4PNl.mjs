import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as isLoggedIn } from "./diary-storage-BmFIbeEd.mjs";
import { x as BookHeart } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-6Gqa4PNl.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./login-5QOM0Xmt.mjs");
var searchSchema = objectType({ redirect: stringType().optional().catch(void 0) });
var Route = createFileRoute("/login")({
	validateSearch: searchSchema,
	beforeLoad: () => {
		if (isLoggedIn()) return;
	},
	head: () => ({ meta: [
		{ title: "Welcome back — Diary" },
		{
			name: "description",
			content: "Sign in to continue writing in your personal Diary."
		},
		{
			property: "og:title",
			content: "Welcome back — Diary"
		},
		{
			property: "og:description",
			content: "Sign in to continue writing in your personal Diary."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
export { Field as n, Route as r, AuthLayout as t };

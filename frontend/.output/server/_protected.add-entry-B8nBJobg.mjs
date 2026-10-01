import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as addEntry, r as cn, t as Button } from "./_ssr/diary-storage-BmFIbeEd.mjs";
import { t as PageHeading } from "./_ssr/page-heading-BMEt2tRV.mjs";
import { t as Input } from "./_ssr/input-TrwTBHGd.mjs";
import { h as Feather, o as Save, v as CalendarDays } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_protected.add-entry-B8nBJobg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var moods = [
	"😊",
	"😢",
	"❤️",
	"✨",
	"🌿",
	"😠",
	"💭"
];
var schema = objectType({
	title: stringType().trim().min(1, "Give this memory a title.").max(120),
	content: stringType().trim().min(1, "Write a little something first.").max(5e3),
	mood: stringType().refine((v) => moods.includes(v), "Choose a mood.")
});
function AddEntryPage() {
	const navigate = useNavigate({ from: "/add-entry" });
	const [content, setContent] = (0, import_react.useState)("");
	const [mood, setMood] = (0, import_react.useState)("✨");
	const [error, setError] = (0, import_react.useState)("");
	const today = new Intl.DateTimeFormat("en", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	}).format(/* @__PURE__ */ new Date());
	const submit = async (event) => {
		event.preventDefault();
		const values = Object.fromEntries(new FormData(event.currentTarget));
		const result = schema.safeParse({
			...values,
			mood
		});
		if (!result.success) return setError(result.error.issues[0]?.message || "Check your entry.");
		try {
			await addEntry(result.data);
			toast.success("Your story is safely tucked away.");
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err.message || "Could not save your entry.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
			eyebrow: "New page",
			title: "What’s on your mind?",
			detail: "There is no right way to fill a page. Begin exactly where you are.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 text-sm text-muted-foreground sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 }), today]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "paper-sheet mx-auto max-w-3xl rounded-lg border border-border bg-card p-5 shadow-elevated sm:p-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-7 flex items-center justify-between border-b border-border pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "Dear Diary,"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground sm:hidden",
						children: today
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, { className: "text-primary" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "title",
					placeholder: "Give this moment a title…",
					maxLength: 120,
					required: true,
					className: "h-14 border-0 border-b border-border px-0 font-display text-2xl shadow-none focus-visible:ring-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					name: "content",
					value: content,
					onChange: (e) => setContent(e.target.value),
					placeholder: "Let the words find their way…",
					maxLength: 5e3,
					required: true,
					className: "mt-5 min-h-64 resize-y border-0 bg-transparent px-0 text-base leading-8 shadow-none focus-visible:ring-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your words stay on this device." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [content.length, " / 5000"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "mt-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-3 text-sm font-semibold",
						children: "How does this moment feel?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: moods.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Mood ${item}`,
							"aria-pressed": mood === item,
							onClick: () => setMood(item),
							className: `mood-button ${mood === item ? "is-selected" : ""}`,
							children: item
						}, item))
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-5 text-sm text-destructive",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "hero",
						size: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), " Save entry"]
					})
				})
			]
		})]
	});
}
//#endregion
export { AddEntryPage as component };

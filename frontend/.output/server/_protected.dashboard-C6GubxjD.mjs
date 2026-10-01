import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as getUser, i as getEntries, t as Button } from "./_ssr/diary-storage-BmFIbeEd.mjs";
import { t as PageHeading } from "./_ssr/page-heading-BMEt2tRV.mjs";
import { t as Input } from "./_ssr/input-TrwTBHGd.mjs";
import { a as Search, h as Feather, s as Plus, t as X, y as BookOpen } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_protected.dashboard-C6GubxjD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var shortDate = (value) => new Intl.DateTimeFormat("en", {
	month: "long",
	day: "numeric",
	year: "numeric"
}).format(new Date(value));
var longDate = (value) => new Intl.DateTimeFormat("en", {
	dateStyle: "full",
	timeStyle: "short"
}).format(new Date(value));
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
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [diaryName, setDiaryName] = (0, import_react.useState)("My Diary");
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [query, setQuery] = (0, import_react.useState)("");
	const bookScrollRef = (0, import_react.useRef)(null);
	const bookRef = (0, import_react.useRef)(null);
	const normalizedQuery = query.trim().toLocaleLowerCase();
	const isSearching = normalizedQuery.length > 0;
	const results = (0, import_react.useMemo)(() => {
		if (!isSearching) return [];
		return entries.filter((entry) => `${entry.title} ${entry.content}`.toLocaleLowerCase().includes(normalizedQuery));
	}, [
		entries,
		isSearching,
		normalizedQuery
	]);
	(0, import_react.useEffect)(() => {
		getEntries().then(setEntries).catch(() => setEntries([]));
		setDiaryName(getUser()?.diaryName || "My Diary");
	}, []);
	(0, import_react.useEffect)(() => {
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
			const index = Math.min(entries.length - 1, Math.floor(pageProgress + .001));
			const turn = index === entries.length - 1 ? 0 : pageProgress - index;
			book.style.setProperty("--page-turn", turn.toFixed(3));
			book.style.setProperty("--book-progress", progress.toFixed(3));
			setActiveIndex((current) => current === index ? current : index);
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
	const jumpToEntry = (index) => {
		setQuery("");
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const scrollScene = bookScrollRef.current;
				if (!scrollScene) return;
				const distance = Math.max(1, scrollScene.offsetHeight - window.innerHeight);
				const progress = index / Math.max(1, entries.length - 1);
				const top = scrollScene.getBoundingClientRect().top + window.scrollY + progress * distance;
				window.scrollTo({
					top,
					behavior: "smooth"
				});
			});
		});
	};
	const current = entries[activeIndex];
	const next = entries[Math.min(activeIndex + 1, entries.length - 1)];
	const sceneHeight = `${Math.max(1, entries.length - 1) * 90 + 100}svh`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dashboard-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard-atmosphere",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dashboard-glow dashboard-glow-one" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dashboard-glow dashboard-glow-two" }),
					Array.from({ length: 10 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--particle-index": index } }, index))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard-content mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dashboard-heading-reveal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
							eyebrow: diaryName,
							title: "Your stories",
							detail: "Every page is a small home for the person you were in that moment.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/add-entry",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New entry"]
								})
							})
						})
					}),
					entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `dashboard-search ${query ? "has-query" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": "true" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "search",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search your diary…",
								"aria-label": "Search diary entries by title or content"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "dashboard-search-clear",
								onClick: () => setQuery(""),
								"aria-label": "Clear search",
								tabIndex: query ? 0 : -1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})
						]
					}) : null,
					isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dashboard-results",
						role: "status",
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "dashboard-results-count",
							children: results.length === 0 ? "No pages found" : `${results.length} ${results.length === 1 ? "entry" : "entries"} found`
						}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dashboard-no-results",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": "true" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No pages found" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try another word or clear your search." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setQuery(""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), " Clear search"]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "dashboard-results-list",
							children: results.map((entry) => {
								const originalIndex = entries.findIndex((candidate) => candidate.id === entry.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "dashboard-result",
									onClick: () => jumpToEntry(Math.max(0, originalIndex)),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "dashboard-result-top",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "dashboard-result-mood",
												children: entry.mood
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: shortDate(entry.createdAt) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: entry.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: excerpt(entry.content, normalizedQuery) })
									]
								}) }, entry.id);
							})
						})]
					}) : null
				]
			}),
			entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "empty-book mx-auto mb-7 grid size-20 place-items-center rounded-lg bg-secondary text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 34 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Your diary is waiting for its first story…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground",
						children: "A passing thought, a full heart, or simply what happened today—it all belongs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						size: "lg",
						className: "mt-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/add-entry",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {}), " Write your first entry"]
						})
					})
				]
			}) : isSearching ? null : current && next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dashboard-book-scroll",
				ref: bookScrollRef,
				style: { height: sceneHeight },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dashboard-book-sticky",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dashboard-book-stage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dashboard-book",
							ref: bookRef,
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dashboard-book-shadow",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dashboard-book-edges",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dashboard-book-spread",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
											className: "dashboard-diary-page dashboard-left-page",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "dashboard-page-number",
													children: String(activeIndex + 1).padStart(2, "0")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "dashboard-entry-mood",
													children: current.mood
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: shortDate(current.createdAt) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current.title }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "dashboard-flourish",
													"aria-hidden": "true",
													children: "✦"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
											className: "dashboard-diary-page dashboard-right-page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "dashboard-entry-copy",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: next.title }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: next.content }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
														"Felt ",
														next.mood,
														" · ",
														longDate(next.createdAt)
													] })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dashboard-turning-page",
											"aria-hidden": "true",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "dashboard-turn-front",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "dashboard-entry-copy",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current.title }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.content }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
															"Felt ",
															current.mood,
															" · ",
															longDate(current.createdAt)
														] })
													]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "dashboard-turn-back",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: next.mood }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: next.title })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "dashboard-book-spine",
											"aria-hidden": "true"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dashboard-book-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								activeIndex + 1,
								" / ",
								entries.length
							] }), entries.length > 1 && activeIndex < entries.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "dashboard-scroll-prompt",
								children: ["Scroll to turn the page ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
							}) : null]
						})]
					})
				})
			}) : null
		]
	});
}
//#endregion
export { DashboardPage as component };

import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as getUser, c as logoutUser, i as getEntries, t as Button } from "./_ssr/diary-storage-BmFIbeEd.mjs";
import { t as PageHeading } from "./_ssr/page-heading-BMEt2tRV.mjs";
import { b as BookOpenText, d as LogOut, n as UserRound, u as Mail, x as BookHeart } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_protected.profile-BeOHJqIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate({ from: "/profile" });
	const [user, setUser] = (0, import_react.useState)(null);
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setUser(getUser());
		getEntries().then((entries) => setCount(entries.length)).catch(() => setCount(0));
	}, []);
	const logout = async () => {
		await logoutUser();
		navigate({
			to: "/login",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {
			eyebrow: "Your space",
			title: "Profile",
			detail: "The little details behind your private collection of moments."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "overflow-hidden rounded-lg border border-border bg-card shadow-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "profile-banner p-7 sm:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-16 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-petal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 28 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate font-display text-3xl",
								children: user?.name || "Diary keeper"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 truncate text-sm text-muted-foreground",
								children: ["Keeper of ", user?.diaryName || "My Diary"]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-px bg-border sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}),
							label: "Email",
							value: user?.email || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookHeart, {}),
							label: "Diary name",
							value: user?.diaryName || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, {}),
							label: "Stories written",
							value: String(count)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end p-5 sm:p-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: logout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), " Log out"]
					})
				})
			]
		})]
	});
}
function ProfileItem({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-4 block text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.15em] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate font-medium",
				children: value
			})
		]
	});
}
//#endregion
export { ProfilePage as component };

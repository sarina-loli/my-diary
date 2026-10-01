import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diary-storage-BmFIbeEd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			hero: "bg-primary text-primary-foreground shadow-petal hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-elevated",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var API_URL = "http://localhost:8000/api";
var TOKENS_KEY = "diary:tokens";
function getTokens() {
	if (typeof window === "undefined") return null;
	try {
		return JSON.parse(localStorage.getItem(TOKENS_KEY) || "null");
	} catch {
		return null;
	}
}
function setTokens(tokens) {
	if (tokens) localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
	else localStorage.removeItem(TOKENS_KEY);
}
async function refreshAccessToken() {
	const tokens = getTokens();
	if (!tokens?.refresh) return null;
	const res = await fetch(`${API_URL}/auth/refresh/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refresh: tokens.refresh })
	});
	if (!res.ok) return null;
	const data = await res.json();
	const next = {
		...tokens,
		access: data.access
	};
	setTokens(next);
	return next;
}
function firstErrorMessage(data) {
	if (!data || typeof data !== "object") return null;
	const value = Object.values(data)[0];
	return Array.isArray(value) ? value[0] : typeof value === "string" ? value : null;
}
async function apiRequest(path, options = {}) {
	const call = async () => {
		const tokens = getTokens();
		const headers = {
			"Content-Type": "application/json",
			...options.headers
		};
		if (tokens?.access) headers.Authorization = `Bearer ${tokens.access}`;
		return fetch(`${API_URL}${path}`, {
			...options,
			headers
		});
	};
	let res = await call();
	if (res.status === 401 && getTokens()?.refresh) {
		if (await refreshAccessToken()) res = await call();
	}
	const data = await res.json().catch(() => null);
	if (!res.ok) throw new Error(firstErrorMessage(data) || "Something went wrong. Please try again.");
	return data;
}
var USER_KEY = "diary:user";
var canStore = () => typeof window !== "undefined";
function setUser(user) {
	if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
	else localStorage.removeItem(USER_KEY);
}
function toUser(apiUser) {
	return {
		name: apiUser.name,
		email: apiUser.email,
		diaryName: apiUser.diary_name
	};
}
function toEntry(apiEntry) {
	return {
		id: apiEntry.id,
		title: apiEntry.title,
		content: apiEntry.content,
		mood: apiEntry.mood,
		createdAt: apiEntry.created_at
	};
}
function getUser() {
	if (!canStore()) return null;
	try {
		const value = localStorage.getItem(USER_KEY);
		return value ? JSON.parse(value) : null;
	} catch {
		return null;
	}
}
function isLoggedIn() {
	return canStore() && Boolean(getTokens()?.access) && Boolean(getUser());
}
async function registerUser({ name, email, password, diaryName }) {
	const data = await apiRequest("/auth/register/", {
		method: "POST",
		body: JSON.stringify({
			name,
			email,
			password,
			confirm_password: password,
			diary_name: diaryName
		})
	});
	setTokens({
		access: data.access,
		refresh: data.refresh
	});
	setUser(toUser(data.user));
}
async function loginUser(email, password) {
	const data = await apiRequest("/auth/login/", {
		method: "POST",
		body: JSON.stringify({
			email,
			password
		})
	});
	setTokens({
		access: data.access,
		refresh: data.refresh
	});
	setUser(toUser(data.user));
}
async function logoutUser() {
	const tokens = getTokens();
	try {
		if (tokens?.refresh) await apiRequest("/auth/logout/", {
			method: "POST",
			body: JSON.stringify({ refresh: tokens.refresh })
		});
	} catch {} finally {
		setTokens(null);
		setUser(null);
	}
}
async function getEntries() {
	return (await apiRequest("/entries/")).map(toEntry);
}
async function addEntry({ title, content, mood }) {
	return toEntry(await apiRequest("/entries/", {
		method: "POST",
		body: JSON.stringify({
			title,
			content,
			mood
		})
	}));
}
//#endregion
export { getUser as a, logoutUser as c, getEntries as i, registerUser as l, addEntry as n, isLoggedIn as o, cn as r, loginUser as s, Button as t };

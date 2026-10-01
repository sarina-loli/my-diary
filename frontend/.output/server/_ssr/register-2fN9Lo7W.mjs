import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as registerUser, t as Button } from "./diary-storage-BmFIbeEd.mjs";
import { t as Input } from "./input-TrwTBHGd.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { n as Field, t as AuthLayout } from "./login-6Gqa4PNl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-2fN9Lo7W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2, "Tell us your name.").max(80),
	email: stringType().trim().email("Enter a valid email.").max(255),
	password: stringType().min(6, "Use at least 6 characters.").max(72),
	confirm: stringType(),
	diaryName: stringType().trim().min(2, "Name your diary.").max(80)
}).refine((v) => v.password === v.confirm, {
	path: ["confirm"],
	message: "Passwords do not match."
});
function RegisterPage() {
	const navigate = useNavigate({ from: "/register" });
	const [error, setError] = (0, import_react.useState)("");
	const submit = async (event) => {
		event.preventDefault();
		const result = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
		if (!result.success) return setError(result.error.issues[0]?.message || "Check your details.");
		const { name, email, password, diaryName } = result.data;
		try {
			await registerUser({
				name,
				email,
				password,
				diaryName
			});
			navigate({ to: "/add-entry" });
		} catch (err) {
			setError(err.message || "Could not create your diary.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Begin your story",
		detail: "A private little place to call your own.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Full name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "name",
						maxLength: 80,
						required: true,
						placeholder: "Your name"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "email",
						type: "email",
						maxLength: 255,
						required: true,
						placeholder: "you@example.com"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "password",
							type: "password",
							minLength: 6,
							maxLength: 72,
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Confirm password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "confirm",
							type: "password",
							minLength: 6,
							maxLength: 72,
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Diary name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "diaryName",
						maxLength: 80,
						required: true,
						placeholder: "My little book"
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
					children: "Create my diary"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: [
				"Already have one?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "font-semibold text-primary hover:underline",
					children: "Sign in"
				})
			]
		})]
	});
}
//#endregion
export { RegisterPage as component };

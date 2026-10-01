globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/input-DsjEnePo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26b-+Pa8jgg/tMGEDsT9GBUdjKxiOAs\"",
		"mtime": "2026-09-29T20:29:54.843Z",
		"size": 619,
		"path": "../public/assets/input-DsjEnePo.js"
	},
	"/assets/login-BZDfpwI9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d56-ZhmJA+vR/FUZPB/YZkz9db8fGj4\"",
		"mtime": "2026-09-29T20:29:54.846Z",
		"size": 3414,
		"path": "../public/assets/login-BZDfpwI9.js"
	},
	"/assets/page-heading-CPopA-ab.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29a-rbxvlo+aXd/SSYQ5/nAlUSUykBQ\"",
		"mtime": "2026-09-29T20:29:54.853Z",
		"size": 666,
		"path": "../public/assets/page-heading-CPopA-ab.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-29T19:09:52.246Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/react-dom-Dj2KXnwj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f15-MDNI6fEOjupAauvbdzu0t0D3smc\"",
		"mtime": "2026-09-29T20:29:54.856Z",
		"size": 3861,
		"path": "../public/assets/react-dom-Dj2KXnwj.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-29T19:09:52.311Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/index-CUKGyECG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f458-cMxyNLFTZ2axZS2edWo6YHe2DO0\"",
		"mtime": "2026-09-29T20:29:54.826Z",
		"size": 521304,
		"path": "../public/assets/index-CUKGyECG.js"
	},
	"/assets/register-cona7mzt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ca-uINUui/j+TXbfxXCaQHoatkXv8I\"",
		"mtime": "2026-09-29T20:29:54.858Z",
		"size": 2250,
		"path": "../public/assets/register-cona7mzt.js"
	},
	"/assets/useRouter-ByJ6_rwb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231b-ITtpEuQX6WJauk56OjC4AbXN0Fs\"",
		"mtime": "2026-09-29T20:29:54.867Z",
		"size": 8987,
		"path": "../public/assets/useRouter-ByJ6_rwb.js"
	},
	"/assets/useStore-ZyuFtzfX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aa8-9Yt18qh+B9nDfREP2QG7U04N9w0\"",
		"mtime": "2026-09-29T20:29:54.906Z",
		"size": 19112,
		"path": "../public/assets/useStore-ZyuFtzfX.js"
	},
	"/assets/cozy-diary-room-DG33Up6S.jpg": {
		"type": "image/jpeg",
		"etag": "\"3a84c-hPo+YSKt2kTRYKkz3hHM2LA2wFw\"",
		"mtime": "2026-09-29T20:29:54.910Z",
		"size": 239692,
		"path": "../public/assets/cozy-diary-room-DG33Up6S.jpg"
	},
	"/assets/_protected-DlzIhrBI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-P29ygGBseoj5vb4uX0/V1SlIpww\"",
		"mtime": "2026-09-29T20:29:54.830Z",
		"size": 139,
		"path": "../public/assets/_protected-DlzIhrBI.js"
	},
	"/assets/_protected.add-entry-DkZ3SeX0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fa-//hqjzHoJpUOudosQtmb+eZTsLI\"",
		"mtime": "2026-09-29T20:29:54.832Z",
		"size": 4346,
		"path": "../public/assets/_protected.add-entry-DkZ3SeX0.js"
	},
	"/assets/_protected.dashboard-BtV8tlXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e10-M7IUco6DuGumjF+heFco+5Io9zM\"",
		"mtime": "2026-09-29T20:29:54.836Z",
		"size": 7696,
		"path": "../public/assets/_protected.dashboard-BtV8tlXv.js"
	},
	"/assets/_protected.profile-Dd7q4rTl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0e-t73tobw2EaOuDLO78RMz9TP+q8w\"",
		"mtime": "2026-09-29T20:29:54.840Z",
		"size": 2830,
		"path": "../public/assets/_protected.profile-Dd7q4rTl.js"
	},
	"/assets/styles-C219TGR4.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1caaa-nBn56UEJEvvnBCE9U9X2AFzM5aA\"",
		"mtime": "2026-09-29T20:29:54.916Z",
		"size": 117418,
		"path": "../public/assets/styles-C219TGR4.css"
	},
	"/assets/routes-C-brveLI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee52a-Q0tQy/hcQGqxrFwyNmV5s5h5SaY\"",
		"mtime": "2026-09-29T20:29:54.860Z",
		"size": 976170,
		"path": "../public/assets/routes-C-brveLI.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_rv5xJc = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_rv5xJc
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

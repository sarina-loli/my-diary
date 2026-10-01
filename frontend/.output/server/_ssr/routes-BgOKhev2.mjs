import { i as __toESM } from "../_runtime.mjs";
import { j as Shape, y as MathUtils } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as RoundedBox, i as Float, n as ContactShadows, o as Canvas, r as Environment, s as useFrame, t as Lightformer } from "../_libs/@react-three/drei+[...].mjs";
import { o as isLoggedIn, t as Button } from "./diary-storage-BmFIbeEd.mjs";
import { S as ArrowRight, i as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BgOKhev2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cozy_diary_room_default = "/assets/cozy-diary-room-DG33Up6S.jpg";
var PAPER = "#fff8f2";
var PAPER_EDGE = "#e9cfc9";
var ROSE = "#a94f62";
var ROSE_DARK = "#733343";
var GOLD = "#d7a961";
function PageLines({ side }) {
	const lines = (0, import_react.useMemo)(() => Array.from({ length: 7 }, (_, index) => index), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			side * 1.62,
			.145,
			.03
		],
		"rotation-x": -Math.PI / 2,
		children: [lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.05 - line * .23,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.28, .018] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: PAPER_EDGE,
				transparent: true,
				opacity: .64
			})]
		}, line)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				side * -.55,
				-.87,
				.01
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.11, 24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: ROSE,
				roughness: .7
			})]
		})]
	});
}
function PageStack({ side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			side * 1.58,
			0,
			0
		],
		"rotation-z": side * -.035,
		children: [
			0,
			1,
			2,
			3
		].map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				3.02,
				.055,
				2.25
			],
			radius: .05,
			smoothness: 3,
			position: [
				0,
				.06 + layer * .028,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: layer === 3 ? PAPER : PAPER_EDGE,
				roughness: .88
			})
		}, layer))
	});
}
function TurningPage({ progress }) {
	const pageRef = (0, import_react.useRef)(null);
	useFrame((_, rawDelta) => {
		const page = pageRef.current;
		if (!page) return;
		const delta = Math.min(rawDelta, .05);
		const turn = MathUtils.smoothstep(progress, .2, .52);
		const target = Math.PI * turn;
		page.rotation.z = MathUtils.damp(page.rotation.z, target, 5, delta);
		page.rotation.y = Math.sin(turn * Math.PI) * .16;
		page.position.y = MathUtils.damp(page.position.y, .25 + Math.sin(turn * Math.PI) * .34, 5, delta);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: pageRef,
		position: [
			.02,
			.25,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.5,
				0,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.98,
				.018,
				2.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PAPER,
				side: 2,
				roughness: .9
			})]
		})
	});
}
function Heart({ position, scale = 1 }) {
	const shape = (0, import_react.useMemo)(() => {
		const path = new Shape();
		path.moveTo(0, .25);
		path.bezierCurveTo(0, .05, -.34, -.1, -.34, .2);
		path.bezierCurveTo(-.34, .52, 0, .58, 0, .82);
		path.bezierCurveTo(0, .58, .34, .52, .34, .2);
		path.bezierCurveTo(.34, -.1, 0, .05, 0, .25);
		return path;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
		speed: 1.2,
		rotationIntensity: .45,
		floatIntensity: .55,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position,
			rotation: [
				-.3,
				.2,
				Math.PI
			],
			scale,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("extrudeGeometry", { args: [shape, {
				depth: .06,
				bevelEnabled: true,
				bevelSize: .025,
				bevelThickness: .025
			}] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: ROSE,
				emissive: ROSE,
				emissiveIntensity: .12,
				roughness: .45
			})]
		})
	});
}
function Flower({ position, scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
		speed: .9,
		rotationIntensity: .7,
		floatIntensity: .45,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position,
			scale,
			rotation: [
				-.45,
				.1,
				.2
			],
			children: [Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				"rotation-z": index / 6 * Math.PI * 2,
				position: [
					Math.cos(index / 6 * Math.PI * 2) * .24,
					Math.sin(index / 6 * Math.PI * 2) * .24,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.17,
					16,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: index % 2 ? "#f4b8c4" : "#f8d4db",
					roughness: .7
				})]
			}, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				"position-z": .05,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.13,
					16,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: GOLD,
					roughness: .6
				})]
			})]
		})
	});
}
function Dust() {
	const ref = (0, import_react.useRef)(null);
	const positions = (0, import_react.useMemo)(() => {
		const points = /* @__PURE__ */ new Float32Array(270);
		for (let i = 0; i < 90; i += 1) {
			points[i * 3] = i * 37 % 100 / 10 - 5;
			points[i * 3 + 1] = i * 61 % 80 / 10 - 2;
			points[i * 3 + 2] = i * 47 % 60 / 10 - 3;
		}
		return points;
	}, []);
	useFrame((state, rawDelta) => {
		if (!ref.current) return;
		const delta = Math.min(rawDelta, .05);
		ref.current.rotation.y += delta * .025;
		ref.current.position.y = Math.sin(state.clock.elapsedTime * .25) * .12;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#fff1d1",
			size: .035,
			transparent: true,
			opacity: .62,
			depthWrite: false
		})]
	});
}
function Diary({ progress, pointer }) {
	const diaryRef = (0, import_react.useRef)(null);
	useFrame((_, rawDelta) => {
		const diary = diaryRef.current;
		if (!diary) return;
		const delta = Math.min(rawDelta, .05);
		const zoom = 1 + MathUtils.smoothstep(progress, .05, .78) * .12;
		diary.scale.setScalar(MathUtils.damp(diary.scale.x, zoom, 4, delta));
		diary.rotation.y = MathUtils.damp(diary.rotation.y, pointer.x * .07, 4, delta);
		diary.rotation.x = MathUtils.damp(diary.rotation.x, -.08 + pointer.y * .035, 4, delta);
		diary.position.y = MathUtils.damp(diary.position.y, -.08 + progress * .2, 4, delta);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: diaryRef,
		rotation: [
			-.08,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					6.65,
					.16,
					2.55
				],
				radius: .12,
				smoothness: 4,
				position: [
					0,
					-.08,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: ROSE_DARK,
					roughness: .55,
					metalness: .05
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageStack, { side: -1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageStack, { side: 1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLines, { side: -1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLines, { side: 1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurningPage, { progress }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					.12,
					.25,
					2.34
				],
				radius: .04,
				smoothness: 3,
				position: [
					0,
					.14,
					0
				],
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: ROSE_DARK,
					roughness: .55
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.42,
					.27,
					-.42
				],
				"rotation-x": -Math.PI / 2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.18,
					.22,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: GOLD,
					metalness: .6,
					roughness: .28
				})]
			})
		]
	});
}
function Scene(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .8 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-4,
				7,
				5
			],
			intensity: 2.4,
			color: "#fff0db",
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-left": -6,
			"shadow-camera-right": 6,
			"shadow-camera-top": 5,
			"shadow-camera-bottom": -5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				3.5,
				2.2,
				1
			],
			intensity: 6,
			distance: 8,
			color: "#f7b5c3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
			intensity: 2.4,
			color: "#fff3e7",
			position: [
				0,
				5,
				2
			],
			scale: [
				8,
				4,
				1
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
			intensity: 1.2,
			color: "#e9a8b8",
			position: [
				-5,
				1,
				-1
			],
			"rotation-y": Math.PI / 2,
			scale: [
				8,
				2,
				1
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diary, { ...props }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			position: [
				-3.5,
				1.25,
				.4
			],
			scale: .48
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			position: [
				3.7,
				1.6,
				-.2
			],
			scale: .32
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
			position: [
				-4,
				-.15,
				.4
			],
			scale: .75
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
			position: [
				4.1,
				.2,
				-.35
			],
			scale: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dust, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-.36,
				0
			],
			opacity: .38,
			scale: 10,
			blur: 2.8,
			far: 4,
			color: "#6d3141"
		})
	] });
}
function HomeDiaryScene(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		shadows: true,
		dpr: [1, 1.5],
		camera: {
			position: [
				0,
				4.6,
				7.6
			],
			fov: 42
		},
		gl: {
			antialias: true,
			alpha: true
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, { ...props })
	});
}
var quotes = [
	"Some memories deserve a place to stay.",
	"Write what your heart cannot say.",
	"Yesterday is a memory, today is a story.",
	"Where thoughts become memories."
];
function HomePage() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [pointer, setPointer] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const sceneRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setReady(isLoggedIn());
	}, []);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setProgress(1);
			return;
		}
		let frame = 0;
		let target = 0;
		let current = 0;
		const measure = () => {
			const scene = sceneRef.current;
			if (!scene) return;
			const bounds = scene.getBoundingClientRect();
			const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
			target = Math.min(1, Math.max(0, -bounds.top / travel));
		};
		let last = 0;
		const tick = (now) => {
			const dt = last ? Math.min((now - last) / 1e3, .25) : 1 / 60;
			last = now;
			const diff = target - current;
			current = Math.abs(diff) < 5e-4 ? target : current + diff * (1 - Math.exp(-dt * 5));
			setProgress(current);
			if (target !== current) frame = window.requestAnimationFrame(tick);
			else {
				frame = 0;
				last = 0;
			}
		};
		const requestUpdate = () => {
			measure();
			if (!frame) frame = window.requestAnimationFrame(tick);
		};
		measure();
		current = target;
		setProgress(current);
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
		};
	}, []);
	const clamp01 = (v) => Math.min(1, Math.max(0, v));
	const destination = ready ? "/add-entry" : "/login";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "home-experience overflow-clip",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			ref: sceneRef,
			className: "diary-hero-scroll",
			onPointerMove: (event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				setPointer({
					x: event.clientX / rect.width * 2 - 1,
					y: (event.clientY - rect.top) / window.innerHeight * 2 - 1
				});
			},
			onPointerLeave: () => setPointer({
				x: 0,
				y: 0
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "diary-hero-sticky",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cozy_diary_room_default,
						width: 1536,
						height: 1024,
						alt: "A warm blush reading room ready for quiet writing",
						className: "diary-room-image",
						style: { transform: `scale(${1.04 + progress * .08}) translate3d(${pointer.x * -8}px, ${progress * -3}vh, 0)` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "diary-room-wash" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						style: {
							opacity: 1 - clamp01(progress / .3) * .75,
							translate: `0 ${-progress * 8}vh`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "hero-eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Your story lives here"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
								"Your story,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "held softly." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-lede",
								children: "A beautiful little ritual for honest thoughts, small wonders, and everything worth remembering."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "diary-canvas-wrap",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeDiaryScene, {
							progress,
							pointer
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "diary-words",
						"aria-live": "polite",
						children: quotes.map((quote, index) => {
							const t = clamp01((progress - (.06 + index * .165)) / .24);
							const ease = t * t * (3 - 2 * t);
							const opacity = t <= 0 || t >= 1 ? 0 : Math.min(1, t / .18) * Math.min(1, (1 - t) / .38);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: t > 0 && t < 1 ? "is-rising" : "",
								style: {
									opacity,
									transform: `translate3d(0, ${-ease * 34}vh, 0) scale(${.86 + ease * .2}) rotateX(${(1 - ease) * 38}deg)`,
									filter: `blur(${(1 - Math.min(1, t / .18)) * 4 + Math.max(0, t - .7) * 10}px)`
								},
								children: [
									"“",
									quote,
									"”"
								]
							}, quote);
						})
					}),
					(() => {
						const t = clamp01((progress - .74) / .18);
						const ease = 1 - Math.pow(1 - t, 3);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "diary-cta",
							style: {
								opacity: ease,
								transform: `translate3d(-50%, ${-ease * 16}vh, 0) scale(${.8 + ease * .2})`,
								pointerEvents: t > .4 ? "auto" : "none"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: destination,
									children: ["Get started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							})
						});
					})(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "scroll-cue",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), " Scroll to open"]
					})
				]
			})
		})
	});
}
//#endregion
export { HomePage as component };

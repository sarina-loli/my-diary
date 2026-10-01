// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The TanStack Start router codegen (with router.disableTypes enabled below) still appends a
// small TypeScript-only footer to the generated route tree (an `import type` + `declare module`
// block used only for typed route registration). That block is invalid plain-JS syntax. This
// plugin strips it both from the bundler's in-memory view (transform) and from the physical file
// on disk (so `src/routeTree.gen.js` itself stays valid, runnable JavaScript at all times).
import fs from "node:fs";

function stripFooter(code) {
  const marker = code.indexOf("\nimport type");
  return marker === -1 ? null : code.slice(0, marker) + "\n";
}

function cleanRouteTreeFile(root) {
  const filePath = `${root}/src/routeTree.gen.js`;
  try {
    const code = fs.readFileSync(filePath, "utf8");
    const stripped = stripFooter(code);
    if (stripped) fs.writeFileSync(filePath, stripped);
  } catch {
    // file may not exist yet (first run before codegen) — nothing to clean
  }
}

const stripRouteTreeTypeFooter = {
  name: "strip-route-tree-type-footer",
  enforce: "pre",
  transform(code, id) {
    if (!id.endsWith("routeTree.gen.js")) return null;
    const stripped = stripFooter(code);
    return stripped === null ? null : stripped;
  },
  writeBundle() {
    cleanRouteTreeFile(process.cwd());
  },
  configureServer(server) {
    const clean = () => cleanRouteTreeFile(process.cwd());
    server.watcher.on("change", (file) => {
      if (file.endsWith("routeTree.gen.js")) clean();
    });
    setTimeout(clean, 500);
  },
};

export default defineConfig({
  vite: {
    plugins: [stripRouteTreeTypeFooter],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Project is plain JavaScript — emit the generated route tree as .js, with no type declarations.
    router: { disableTypes: true },
  },
});

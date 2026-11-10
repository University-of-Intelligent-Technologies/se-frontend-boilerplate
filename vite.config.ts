import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { normalizePath } from "vite";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// the TanStack Router plugin must come before react()
		tanstackRouter({ target: "react" }),
		react(),
		tailwindcss(),
		copy({
			targets: [
				{
					src: normalizePath(path.resolve("./src/assets/locales")),
					dest: normalizePath(path.resolve("./public")),
				},
			],
		}),
	],
	server: {
		host: true,
		strictPort: true,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
});

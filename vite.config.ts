import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@store": fileURLToPath(new URL("./src/store", import.meta.url)),
			"@router": fileURLToPath(new URL("./src/router", import.meta.url)),
			"@views": fileURLToPath(new URL("./src/views", import.meta.url)),
			"@ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
			"@types": fileURLToPath(new URL("./src/types", import.meta.url)),
			"@config": fileURLToPath(new URL("./src/config", import.meta.url)),
			"@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
			"@modules": fileURLToPath(
				new URL("./src/modules", import.meta.url)
			),
		},
	},
});

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/** Set by beguru-deployment sandbox (nginx /preview/{port}/…). Must match Vite `base` for asset URLs. */
function baseFromEnv(): string {
  const raw = process.env.NEXT_BASE_PATH?.trim();
  if (!raw) return "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

function proxyToAPI(env: Record<string, string>) {
  return {
    target: env.VITE_API_BASE_URL ?? "http://localhost:8000",
    changeOrigin: true,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = baseFromEnv();

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      allowedHosts: ["app.local", "app.beguru.ai"],
      proxy: {
        ...(base === "/"
          ? { "/api": proxyToAPI(env) }
          : { [`${base.replace(/\/$/, "")}/api`]: proxyToAPI(env) }),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
              return "react";
            }
            if (id.includes("node_modules/@tanstack")) {
              return "query";
            }
            if (id.includes("node_modules/@radix-ui")) {
              return "radix";
            }
          },
        },
      },
    },
  };
});

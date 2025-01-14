import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "url";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
        "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
        "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
      },
    },
    server: {
      https: {
        key: process.env.SSL_KEY_PATH 
          ? fs.readFileSync(process.env.SSL_KEY_PATH)
          : fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
        cert: process.env.SSL_CERT_PATH 
          ? fs.readFileSync(process.env.SSL_CERT_PATH)
          : fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
      },
      proxy: {
        "/api": {
          target: env.VITE_APP_REMOTE === 'true' ? env.VITE_API_URL : "https://localhost:5173",
          changeOrigin: true,
          secure: env.VITE_APP_REMOTE === 'true' ? true : false,
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              if (req.headers.cookie) {
                proxyReq.setHeader("Cookie", req.headers.cookie);
              }
              if (req.headers.authorization) {
                proxyReq.setHeader("Authorization", req.headers.authorization);
              }
              proxyReq.setHeader("Access-Control-Allow-Credentials", "true");
              proxyReq.setHeader(
                "Access-Control-Allow-Origin",
                req.headers.origin || "*"
              );
            });

            proxy.on("proxyRes", (proxyRes, req) => {
              proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
              proxyRes.headers["Access-Control-Allow-Origin"] =
                req.headers.origin || "*";
            });
          },
        },
      },
    },
    preview: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              if (req.headers.cookie) {
                proxyReq.setHeader("Cookie", req.headers.cookie);
              }
              if (req.headers.authorization) {
                proxyReq.setHeader("Authorization", req.headers.authorization);
              }
              proxyReq.setHeader("Access-Control-Allow-Credentials", "true");
              proxyReq.setHeader(
                "Access-Control-Allow-Origin",
                req.headers.origin || "*"
              );
            });

            proxy.on("proxyRes", (proxyRes, req) => {
              proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
              proxyRes.headers["Access-Control-Allow-Origin"] =
                req.headers.origin || "*";
            });
          },
        },
      },
    },
  };
});

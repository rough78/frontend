import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@app/App.tsx";
import "./app/styles/main.scss";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
  return Promise.resolve()
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

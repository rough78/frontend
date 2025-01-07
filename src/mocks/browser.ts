import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// 디버깅을 위한 설정 추가
worker.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

worker.events.on("response:mocked", ({ response }) => {
  console.log("MSW response headers:", response.headers);
});

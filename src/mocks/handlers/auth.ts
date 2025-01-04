import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.get("/api/auth/check", ({ request, cookies }) => {
    // console.log("All headers:", [...request.headers.entries()]);
    
    // 다른 방법으로 쿠키 읽기 시도
    // const cookieHeader = request.headers.get('Cookie') || request.headers.get('cookie') || '';
    // console.log("Cookie header:", cookieHeader);
    
    // const hasAccessToken = cookieHeader.includes("access=");
    // const hasRefreshToken = cookieHeader.includes("refresh=");

    if (!cookies.access || !cookies.refresh) {
      return new HttpResponse(null, { 
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:5173",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
        }
      });
    }
    
    // console.log("Token check:", {
    //     hasAccessToken,
    //     hasRefreshToken,
    //     cookieHeader
    // });

    // if (!hasAccessToken || !hasRefreshToken) {
    //   return new HttpResponse(null, { 
    //     status: 401,
    //     headers: {
    //       "Access-Control-Allow-Origin": "https://localhost:5173",
    //       "Access-Control-Allow-Credentials": "true",
    //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //       "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
    //     }
    //   });
    // }

    return HttpResponse.json(
      {
        access_token_is_expired: false,
        refresh_token_is_expired: false,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:5173",
          "Access-Control-Allow-Credentials": "true",
        }
      }
    );
  }),

  http.options("/api/auth/check", () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }),

  http.get("/api/auth/:provider/login", () => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "https://localhost:5173");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Set-Cookie", "access=mock-access-token; Path=/; SameSite=Lax");
    headers.append("Set-Cookie", "refresh=mock-refresh-token; Path=/; SameSite=Lax");

    return new HttpResponse(null, {
      status: 200,
      headers
    });
  }),

  http.post("/api/auth/logout", () => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "https://localhost:5173");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Set-Cookie", "access=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax");
    headers.append("Set-Cookie", "refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax");

    return new HttpResponse(null, {
      status: 200,
      headers
    });
  }),
];
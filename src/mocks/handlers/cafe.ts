import { http, HttpResponse } from "msw";
import { dummyCafes } from "@shared/api/cafe/mockData";

export const cafeHandlers = [
  http.get("/api/cafes/search", ({ request }) => {
    const url = new URL(request.url);
    const searchName = url.searchParams.get("name")?.toLowerCase();

    const filteredCafes = dummyCafes
      .filter(cafe => (cafe.title ?? "").toLowerCase().includes(searchName || ""));

    return HttpResponse.json({ items: filteredCafes });
  })
];

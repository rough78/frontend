import { http, HttpResponse } from "msw";
import { dummyCafes } from "@shared/api/cafe/mockData";
import { CafeMapper } from "@shared/api/cafe/mapper/cafeMapper";

export const cafeHandlers = [
  http.get("/api/cafes/search", ({ request }) => {
    const url = new URL(request.url);
    const searchName = url.searchParams.get("name")?.toLowerCase();

    const filteredCafes = dummyCafes
      .filter(cafe => cafe.name.toLowerCase().includes(searchName || ""))
      .map(cafe => CafeMapper.toNaverApiFormat(cafe));

    return HttpResponse.json({ items: filteredCafes });
  })
];

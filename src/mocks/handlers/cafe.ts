import { http, HttpResponse } from "msw";
import { dummyCafes } from "@shared/api/cafe/mockData";

export const cafeHandlers = [
  http.get("/api/cafes/search", ({ request }) => {
    const url = new URL(request.url);
    const searchName = url.searchParams.get("name")?.toLowerCase(); // 'name' 파라미터 검색

    // 디버깅을 위한 로그 추가
    console.log('Search URL:', request.url);
    console.log('Search Name:', searchName);

    const filteredCafes = dummyCafes
      .filter(cafe => cafe.name.toLowerCase().includes(searchName || ""))
      .map(({ id, name, ...rest }) => ({
        ...rest,
        title: name  // Rename 'name' to 'title'
      }));

    console.log('Filtered Cafes:', filteredCafes);

    return HttpResponse.json({ items: filteredCafes });
  })
];
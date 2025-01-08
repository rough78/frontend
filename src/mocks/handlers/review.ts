import { http, HttpResponse } from "msw";
import type { ReviewRequest, ReviewResponse } from "@shared/api/reviews/types";

export const reviewHandlers = [
  http.post('/api/reviews', async ({ request }) => {
    const reviewRequest = await request.json() as ReviewRequest;

    // 새 리뷰 응답 생성
    const reviewResponse: ReviewResponse = {
      id: Math.floor(Math.random() * 10000), // 임의의 ID 생성
      content: reviewRequest.content,
      rating: reviewRequest.rating,
      visitDate: reviewRequest.visitDate,
      cafeId: reviewRequest.cafeId
    };

    return HttpResponse.json(reviewResponse, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': 'https://localhost:5173',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  })
];

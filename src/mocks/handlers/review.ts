import { http, HttpResponse } from "msw";
import { IndexedDBReviewStorage } from "../storage/ReviewStorage";
import type { ReviewRequest } from "@shared/api/reviews/types";

const reviewStorage = new IndexedDBReviewStorage();

export const reviewHandlers = [
  http.post('/api/reviews', async ({ request }) => {
    try {
      const reviewRequest = await request.json() as ReviewRequest;
      
      if (!reviewRequest.cafeId || !reviewRequest.rating || !reviewRequest.visitDate) {
        return new HttpResponse(null, { 
          status: 400,
          statusText: 'Bad Request: Missing required fields' 
        });
      }

      const response = await reviewStorage.save(reviewRequest);
      return HttpResponse.json(response, { status: 201 });

    } catch (error) {
      console.error('Review creation failed:', error);
      return new HttpResponse(null, { status: 500 });
    }
  }),

  http.get('/api/reviews/cafe/:cafeId', async ({ params }) => {
    try {
      const reviews = await reviewStorage.findByCafeId(Number(params.cafeId));
      return HttpResponse.json(reviews);
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  })
];

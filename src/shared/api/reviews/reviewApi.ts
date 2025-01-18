import { useApi } from "@shared/api/hooks/useApi";
import type {
  ReviewRequest,
  ReviewResponse,
  ShowCafeReviewRequest,
  ShowReviewResponse,
} from "./types";

export const useReviewApi = () => {
  const { post, get, isLoading, error } = useApi<ReviewResponse>();

  const createReview = async (
    request: ReviewRequest,
    options?: {
      onSuccess?: (response: ReviewResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      const response = await post(
        "/api/reviews",
        request,
        {},
        {
          onSuccess: options?.onSuccess,
          onError: options?.onError,
        }
      );
      return response;
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      throw error;
    }
  };

  const getCafeReviews = async (
    cafeId: number,
    params: ShowCafeReviewRequest,
    options?: {
      onSuccess?: (response: ShowReviewResponse[]) => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      const response = await get<ShowReviewResponse[]>(
        `/api/cafe/${cafeId}`,
        { params },
        {
          onSuccess: options?.onSuccess,
          onError: options?.onError,
        }
      );
      return response;
    } catch (error) {
      console.error("카페 리뷰 조회 중 오류 발생:", error);
      throw error;
    }
  };

  return {
    createReview,
    getCafeReviews,
    isLoading,
    error,
  };
};

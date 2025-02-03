import { useApi } from "@shared/api/hooks/useApi";
import { useCallback } from "react";
import type {
  ReviewRequest,
  ReviewResponse,
  ShowCafeReviewRequest,
  ShowReviewResponse,
  ShowReviewListRequest,
  ShowUserReviewRequest,
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
        `/api/reviews/cafe/${cafeId}`,
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

  const getReviewList = useCallback(async (
    params: ShowReviewListRequest = {
      sort: "NEW",
      limit: 10
    }
  ) => {
    try {
      return await get<ShowReviewResponse[]>('/api/reviews/list', { params });
    } catch (error) {
      console.error("리뷰 목록 조회 중 오류 발생:", error);
      throw error;
    }
  }, [get]);

  const getMyReviews = useCallback(async (
    params: ShowUserReviewRequest = {
      limit: 10
    }
  ) => {
    try {
      return await get<ShowReviewResponse[]>('/api/reviews/my', { params });
    } catch (error) {
      console.error("내 리뷰 목록 조회 중 오류 발생:", error);
      throw error;
    }
  }, [get]);

  return {
    createReview,
    getCafeReviews,
    getReviewList,
    getMyReviews,
    isLoading,
    error,
  };
};

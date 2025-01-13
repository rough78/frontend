import { useApi } from '@shared/api/hooks/useApi';
import type { ReviewRequest, ReviewResponse } from './types';

export const useReviewApi = () => {
  const { post, isLoading, error } = useApi<ReviewResponse>();

  const createReview = async (
    request: ReviewRequest,
    options?: {
      onSuccess?: (response: ReviewResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      const response = await post('/api/reviews/', request, {}, {
        onSuccess: options?.onSuccess,
        onError: options?.onError
      });
      return response;
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error);
      throw error;
    }
  };

  return {
    createReview,
    isLoading,
    error
  };
};
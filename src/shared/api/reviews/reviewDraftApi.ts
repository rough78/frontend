import {
  DraftReviewResponse,
  CreateDraftReviewRequest,
  UpdateDraftReviewRequest,
  ShowUserDraftReviewResponse,
} from "./types";
import { useApiQuery, useApiMutation } from "@shared/api/hooks/useQuery";
import { useQueryClient } from "@tanstack/react-query";

export const useReviewDraftApi = () => {
  const queryClient = useQueryClient();

  // 초안 생성
  const createDraftMutation = useApiMutation<
    DraftReviewResponse,
    CreateDraftReviewRequest
  >("/api/reviews/draft", "post");

  // 초안 수정
  const updateDraftMutation = useApiMutation<
    DraftReviewResponse,
    UpdateDraftReviewRequest & { id: number }
  >("/api/reviews/draft/:id", "patch", {
    urlTransform: ({ id }) => `/api/reviews/draft/${id}`,
  });

  // 초안 삭제
  const deleteDraftMutation = useApiMutation<void, void>(
    "/api/reviews/draft",
    "delete"
  );

  // 특정 초안 조회
  const useDraftReview = (draftId: number) => {
    return useApiQuery<ShowUserDraftReviewResponse>(
      ["reviewDraft", draftId],
      `/api/reviews/draft/${draftId}`
    );
  };

  // 사용자의 모든 초안 조회
  const useUserDraftReviews = (cafeId?: number) => {
    const queryString = cafeId ? `?cafeId=${cafeId}` : "";
    return useApiQuery<ShowUserDraftReviewResponse[]>(
      ["reviewDrafts", "user", cafeId],
      `/api/my/draft-reviews${queryString}`
    );
  };

  // 초안 생성 함수
  const createDraft = async (
    request: CreateDraftReviewRequest,
    options?: {
      onSuccess?: (response: DraftReviewResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      const response = await createDraftMutation.mutateAsync(request);
      await queryClient.invalidateQueries({ queryKey: ["reviewDrafts"] });
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      console.error("리뷰 초안 생성 중 오류 발생:", error);
      options?.onError?.(error);
      throw error;
    }
  };

  // 초안 수정 함수
  const updateDraft = async (
    draftId: number,
    request: UpdateDraftReviewRequest,
    options?: {
      onSuccess?: (response: DraftReviewResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      // Convert request payload to match backend format
      const payload = {
        content: request.content,
        rating: request.rating,
        visitDate: request.visitDate,
        tagIds: request.tagIds || [], // Ensure tagIds is sent as array
      };

      const response = await updateDraftMutation.mutateAsync({
        ...payload,
        id: draftId,
      });
      await queryClient.invalidateQueries({ queryKey: ["reviewDrafts"] });
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      console.error("리뷰 초안 수정 중 오류 발생:", error);
      options?.onError?.(error);
      throw error;
    }
  };

  // 초안 삭제 함수
  const deleteDraft = async (
    draftId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      await deleteDraftMutation.mutateAsync();
      await queryClient.invalidateQueries({ queryKey: ["reviewDrafts"] });
      options?.onSuccess?.();
    } catch (error) {
      console.error("리뷰 초안 삭제 중 오류 발생:", error);
      options?.onError?.(error);
      throw error;
    }
  };

  return {
    // Mutations
    createDraft,
    updateDraft,
    deleteDraft,

    // Queries
    useDraftReview,
    useUserDraftReviews,

    // Mutation states
    isCreating: createDraftMutation.isPending,
    isUpdating: updateDraftMutation.isPending,
    isDeleting: deleteDraftMutation.isPending,

    // Errors
    createError: createDraftMutation.error,
    updateError: updateDraftMutation.error,
    deleteError: deleteDraftMutation.error,
  };
};

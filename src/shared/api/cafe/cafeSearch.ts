import { useApi, ApiError } from "@shared/api/hooks/useApi";
import type { INaverLocalApiResponse, ICafeDescription } from '@shared/api/cafe/types';
import { CafeMapper } from '@shared/api/cafe/mapper/cafeMapper';

interface SearchResponse {
  items: INaverLocalApiResponse[]
}

export interface CafeSearchHook {
  cafes: ICafeDescription[]
  isLoading: boolean
  error: ApiError | null
  searchByName: (name: string | null) => Promise<ICafeDescription[]>
}

export const useCafeSearch = (): CafeSearchHook => {
  const { 
    data, 
    isLoading, 
    error, 
    get 
  } = useApi<ICafeDescription[]>();

  const searchByName = async (name: string | null) => {
    if (!name) {
      return [];
    }

    try {
      const response = await get<SearchResponse>(
        '/api/cafes/search',
        {
          params: { name }
        }
      );

      if (response?.items) {
        return response.items.map((item, index) => ({
          ...CafeMapper.toICafeDescription(item),
          id: index + 1
        }));
      }

      return [];
    } catch (error) {
      console.error('카페 검색 중 오류 발생:', error);
      throw error;
    }
  };

  return {
    cafes: data || [],
    isLoading,
    error,
    searchByName
  };
};
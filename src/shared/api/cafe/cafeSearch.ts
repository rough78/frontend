import type { ICafeDescription } from '@shared/api/cafe/types';
import { apiInstance } from '@shared/api/base';

export const searchCafes = async (query: string): Promise<ICafeDescription[]> => {
  try {
    const { data } = await apiInstance.get<{ data: ICafeDescription[] }>('search', {
      params: { query }
    });
    return data;
  } catch (error) {
    console.error('카페 검색 중 오류 발생:', error);
    throw error;
  }
};

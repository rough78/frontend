import type { ICafeDescription, INaverLocalApiResponse } from '@shared/api/cafe/types';
import { apiInstance } from '@shared/api/base';
import { dummyCafes } from './mockData';
import { CafeMapper } from '@shared/api/cafe/mapper/cafeMapper';

const isDevelopment = import.meta.env.DEV;

export const searchCafes = async (name: string): Promise<ICafeDescription[]> => {
  try {
    const response = await apiInstance.get<{ items: INaverLocalApiResponse[] }>('/api/cafes/search', {
      params: { name }
    });
    
    if (response.items && response.items.length > 0) {
      return response.items.map((item, index) => ({
        ...CafeMapper.toICafeDescription(item),
        id: index + 1
      }));
    }
    return [];
  } catch (error) {
    console.error('카페 검색 중 오류 발생:', error);
    if (isDevelopment) {
      return dummyCafes;
    }
    throw error;
  }
};
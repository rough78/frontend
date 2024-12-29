import type { ICafeDescription } from '@shared/api/cafe/types';
import { apiInstance } from '@shared/api/base';
import { dummyCafes } from './mockData';

const isDevelopment = import.meta.env.DEV;

export const searchCafes = async (query: string): Promise<ICafeDescription[]> => {
  try {
    const response = await apiInstance.get<{ data: ICafeDescription[] }>('search', {
      params: { query }
    });
    
    if (!response.data || response.data.length === 0) {
      if (isDevelopment) {
        console.log('개발 환경: 더미 데이터를 반환합니다.');
        return dummyCafes;
      }
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error('카페 검색 중 오류 발생:', error);
    if (isDevelopment) {
      console.log('개발 환경: 오류 발생으로 더미 데이터를 반환합니다.');
      return dummyCafes;
    }
    throw error;
  }
};

import type { ICafeDescription } from '@shared/api/cafe/types';
import { apiInstance } from '@shared/api/base';
import { dummyCafes } from './mockData';

const isDevelopment = import.meta.env.DEV;

export const searchCafes = async (query: string): Promise<ICafeDescription[]> => {
  try {
    const response = await apiInstance.get<{ items: any[] }>('/api/cafes/search', {
      params: { name: query }
    });
    
    // Transform Naver API response to match ICafeDescription format
    if (response.items && response.items.length > 0) {
      const cafes: ICafeDescription[] = response.items.map((item, index) => ({
        id: index + 1, // Generate unique ID
        name: item.title.replace(/<[^>]*>/g, ''), // Remove HTML tags
        address: item.roadAddress || item.address,
        location: {
          latitude: parseFloat(item.mapy) * 1e-7,
          longitude: parseFloat(item.mapx) * 1e-7
        },
        instaLink: item.link || '',
        isBookmark: false,
        avgStar: 0,
        profileImg: ''
      }));
      return cafes;
    }

    if (isDevelopment) {
      console.log('개발 환경: 더미 데이터를 반환합니다.');
      return dummyCafes;
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
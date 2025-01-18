import type { ICafeDescription, ICafeApiResponse } from './types';
import { useApi, ApiError } from "@shared/api/hooks/useApi";

const BASE_URL = '/api/cafes';

interface IsExistCafeResponse {
  cafeId: number
  exist: boolean
}

interface SaveCafeRequest {
  title: string;
  category: string;
  mapx: string;
  mapy: string;
  address: string;
  roadAddress: string;
  link?: string;
}

interface SaveCafeResponse {
  cafeId: number;
}

export interface CafeApiHook {
  cafe: ICafeDescription | null
  isLoading: boolean
  error: ApiError | null
  getCafe: (cafeId: string) => Promise<ICafeDescription>
  checkCafeExists: (params: {
    name: string
    mapx: string
    mapy: string
  }) => Promise<IsExistCafeResponse>
  saveCafe: (params: SaveCafeRequest) => Promise<SaveCafeResponse>
}

const mapCafeApiResponse = (response: ICafeApiResponse): ICafeDescription => {
  return {
    id: 0,
    name: response.cafeName,
    category: "카페",
    isClosedDown: response._closed_down,
    address: response.address,
    roadAddress: response.roadAddress,
    mapx: response.mapx,
    mapy: response.mapy,
    link: response.link,
    isBookmark: false,
    avgStar: response.avgRating,
    profileImg: '',
    image: []
  };
};

export const useCafeApi = (): CafeApiHook => {
  const {
    data: cafe,
    isLoading,
    error,
    get,
    post
  } = useApi<ICafeDescription>();

  const getCafe = async (cafeId: string): Promise<ICafeDescription> => {
    try {
      const response = await get<ICafeApiResponse>(`${BASE_URL}/${cafeId}`);
      return mapCafeApiResponse(response);
    } catch (error) {
      console.error('카페 정보 조회 중 오류 발생:', error);
      throw error;
    }
  };

  const checkCafeExists = async (params: {
    name: string
    mapx: string
    mapy: string
  }): Promise<IsExistCafeResponse> => {
    try {
      const response = await get<IsExistCafeResponse>(BASE_URL, {
        params: params
      });
      return response;
    } catch (error) {
      console.error('카페 존재 여부 확인 중 오류 발생:', error);
      throw error;
    }
  };

  const saveCafe = async (params: SaveCafeRequest): Promise<SaveCafeResponse> => {
    try {
      const response = await post<SaveCafeResponse>(`${BASE_URL}`, params);
      return response;
    } catch (error) {
      console.error('카페 저장 중 오류 발생:', error);
      throw error;
    }
  };

  return {
    cafe: cafe,
    isLoading,
    error,
    getCafe,
    checkCafeExists,
    saveCafe
  };
};

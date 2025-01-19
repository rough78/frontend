import type { ICafeDescription } from '../types';
import type { INaverLocalApiResponse } from '../types';

export class CafeMapper {
  static toICafeDescription(naverResponse: INaverLocalApiResponse): ICafeDescription {
    return {
      id: 0,
      name: this.sanitizeTitle(naverResponse.title || ''),
      category: naverResponse.category || "카페",
      isClosedDown: false,
      address: naverResponse.address || '',
      roadAddress: naverResponse.roadAddress || '',
      mapx: naverResponse.mapx || '',
      mapy: naverResponse.mapy || '',
      link: naverResponse.link || '',
      imageIds: [],
      isBookmark: false,
      avgStar: 0,
      profileImg: ''
    };
  }

  static toNaverApiFormat(cafe: ICafeDescription): Partial<INaverLocalApiResponse> {
    return {
      title: cafe.name,
      link: cafe.link,
      address: cafe.address,
      roadAddress: cafe.roadAddress,
      mapx: cafe.mapx,
      mapy: cafe.mapy
    };
  }

  private static sanitizeTitle(title: string): string {
    return title.replace(/<[^>]*>/g, '');
  }

  private static convertNaverCoordinate(coord: string): number {
    return parseFloat(coord) * 1e-7;
  }
}
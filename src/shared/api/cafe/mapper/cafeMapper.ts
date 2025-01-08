import type { ICafeDescription } from '../types';
import type { INaverLocalApiResponse } from '../types';

export class CafeMapper {
  static toICafeDescription(naverResponse: INaverLocalApiResponse): ICafeDescription {
    return {
      id: 0,
      name: this.sanitizeTitle(naverResponse.title),
      address: naverResponse.roadAddress || naverResponse.address,
      location: {
        latitude: this.convertNaverCoordinate(naverResponse.mapy),
        longitude: this.convertNaverCoordinate(naverResponse.mapx)
      },
      instaLink: naverResponse.link || '',
      isBookmark: false,
      avgStar: 0,
      profileImg: ''
    };
  }

  static toNaverApiFormat(cafe: ICafeDescription): Partial<INaverLocalApiResponse> {
    return {
      title: cafe.name,
      link: cafe.instaLink,
      address: cafe.address,
      roadAddress: cafe.address,
      mapx: String(cafe.location.longitude * 1e7),
      mapy: String(cafe.location.latitude * 1e7)
    };
  }

  private static sanitizeTitle(title: string): string {
    return title.replace(/<[^>]*>/g, '');
  }

  private static convertNaverCoordinate(coord: string): number {
    return parseFloat(coord) * 1e-7;
  }
}
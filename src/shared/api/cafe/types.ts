interface ICoordinate {
    readonly latitude: number
    readonly longitude: number
}

export interface ICafeDescription {
    readonly id: number
    readonly image?: string[]
    readonly name: string
    readonly location: ICoordinate
    readonly instaLink: string
    readonly isBookmark: boolean
    readonly avgStar: number
    readonly address: string
    readonly profileImg: string
}

export interface INaverLocalApiResponse {
    title: string;
    link: string;
    category: string;
    description: string;
    telephone: string;
    address: string;
    roadAddress: string;
    mapx: string;
    mapy: string;
  }
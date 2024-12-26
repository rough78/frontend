export interface ICafeDescription {
    readonly image?: string[]
    readonly name: string
    readonly location: ICoordinate
    readonly instaLink: string
    readonly isBookmark: boolean
    readonly avgStar: number
}

interface ICoordinate {
    readonly latitude: number
    readonly longitude: number
}

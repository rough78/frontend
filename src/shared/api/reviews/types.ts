export interface TagCategory {
  menu: Array<{ id: number }>;
  interior: Array<{ id: number }>;
}

export interface ReviewResponse {
  reviewId: number;
  content: string; 
  rating: number;
  visitDate: string;
  imageIds: string[];
  // tags: TagCategory;
  tagIds: number[];
  cafeId: number;
  userId: number;
  nickname: string;
  isProfileImageExist: boolean;
  createdAt: string;
}

export interface ReviewRequest {
  cafeId: number;
  rating: number;
  visitDate: string;
  content: string;
  imageIds: string[];
  // tagIds: {
  //   menu: Array<{ id: number }>;
  //   interior: Array<{ id: number }>;
  // };
  tagIds: number[];
}

export interface ShowCafeReviewRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export interface ShowReviewResponse {
  reviewId: number;
  content: string;
  rating: number;
  visitDate: string;
  imageIds: string[];
  tagIds: number[];
  cafeId: number;
  userId: number;
  nickname: string;
  isProfileImageExist: boolean;
  createdAt: string;
}
export interface ReviewResponse {
  id: number;
  content: string;
  rating: number;
  visitDate: string;
  cafeId: number;
}

export interface ReviewRequest {
  cafeId: number;
  rating: number;
  visitDate: string;
  content: string;
  imageIds: string[];
  tags: {
    menu: Array<{ id: number }>;
    interior: Array<{ id: number }>;
  };
}

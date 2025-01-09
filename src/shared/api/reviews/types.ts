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
  imageIds: number[];
  tags: {
    menu: Array<{ id: number; description: string }>;
    interior: Array<{ id: number; description: string }>;
  };
}

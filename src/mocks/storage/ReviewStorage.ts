import type { ReviewRequest, ReviewResponse } from "@shared/api/reviews/types";

export interface ReviewStorage {
  save: (review: ReviewRequest) => Promise<ReviewResponse>;
  findByCafeId: (cafeId: number) => Promise<ReviewResponse[]>;
}

export class IndexedDBReviewStorage implements ReviewStorage {
  private DB_NAME = 'reviewsDB';
  private STORE_NAME = 'reviews';

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          store.createIndex('cafeId', 'cafeId', { unique: false });
          store.createIndex('visitDate', 'visitDate', { unique: false });
        }
      };
    });
  }

  async save(reviewData: ReviewRequest): Promise<ReviewResponse> {
    const db = await this.openDB();
    const transaction = db.transaction(this.STORE_NAME, 'readwrite');
    const store = transaction.objectStore(this.STORE_NAME);

    const review = {
      ...reviewData,
      createdAt: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const request = store.add(review);
      request.onsuccess = () => {
        resolve({
          reviewId: request.result as number,
          content: review.content,
          rating: review.rating,
          visitDate: review.visitDate,
          imageIds: review.imageIds || [],
          tagIds: review.tagIds || [],
          cafeId: review.cafeId,
          userId: 1,
          nickname: "User",
          isProfileImageExist: false,
          createdAt: new Date().toISOString()
        });
      };
      request.onerror = () => reject(request.error);
    });
  }

  async findByCafeId(cafeId: number): Promise<ReviewResponse[]> {
    const db = await this.openDB();
    const transaction = db.transaction(this.STORE_NAME, 'readonly');
    const store = transaction.objectStore(this.STORE_NAME);
    const index = store.index('cafeId');

    return new Promise((resolve, reject) => {
      const request = index.getAll(cafeId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
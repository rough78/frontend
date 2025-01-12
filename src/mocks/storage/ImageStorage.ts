// src/mocks/storage/ImageStorage.ts
export interface ImageStorage {
  save: (id: string, file: File) => Promise<void>;
  find: (id: string) => Promise<File | null>;
  delete: (id: string) => Promise<void>;
}

export class IndexedDBImageStorage implements ImageStorage {
  private DB_NAME = "imagesDB";
  private STORE_NAME = "images";

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: "id" });
        }
      };
    });
  }

  async save(id: string, file: File): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction(this.STORE_NAME, "readwrite");
    const store = tx.objectStore(this.STORE_NAME);
    await store.put({ id, file });
  }

  async find(id: string): Promise<File | null> {
    const db = await this.openDB();
    const tx = db.transaction(this.STORE_NAME, "readonly");
    const store = tx.objectStore(this.STORE_NAME);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result?.file || null);
    });
  }

  async delete(id: string): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction(this.STORE_NAME, "readwrite");
    const store = tx.objectStore(this.STORE_NAME);
    await store.delete(id);
  }
}

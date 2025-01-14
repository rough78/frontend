import { http, HttpResponse, delay } from "msw";
import { IndexedDBImageStorage } from "../storage/ImageStorage";

const imageStorage = new IndexedDBImageStorage();

export const imageHandlers = [
  http.post("/api/images", async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const imageId = `image_${Math.random().toString(36).substring(2)}`;

    await delay(1000);
    
    await imageStorage.save(imageId, file);

    return HttpResponse.json({ imageId }, { status: 201 });
  }),

  http.get("/api/images/:imageId", async ({ params }) => {
    const file = await imageStorage.find(params.imageId as string);
    
    if (!file) {
      // 이미지 불러오기에 실패했을 경우
      const canvas = new OffscreenCanvas(100, 100);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffcccc';
        ctx.fillRect(0, 0, 100, 100);
      }
      const blob = await canvas.convertToBlob({
        type: 'image/png'
      });

      return new HttpResponse(blob, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    return new HttpResponse(file, {
      status: 200,
      headers: {
        'Content-Type': file.type,
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  }),

  http.delete("/api/images/review/:imageId", async ({ params }) => {
    await imageStorage.delete(params.imageId as string);
    return HttpResponse.json({ success: true }, { status: 200 });
  })
];

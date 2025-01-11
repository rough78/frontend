import { http, HttpResponse } from "msw";

// Store uploaded images in memory
const imageStorage = new Map<string, File>();

export const imageHandlers = [
  // 이미지 업로드 핸들러
  http.post("/api/images/", async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    // 임의의 이미지 ID 생성
    const imageId = `image_${Math.random().toString(36).substring(2)}`;

    // Store the file
    imageStorage.set(imageId, file);

    return HttpResponse.json(
      { imageId }, 
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:5173",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    );
  }),

  http.get("/api/images/:imageId", async ({ params }) => {
    const { imageId } = params;
    const storedImage = imageStorage.get(imageId as string);

    if (!storedImage) {
      // Create a default 100x100 pink placeholder image
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

    return new HttpResponse(storedImage, {
      status: 200,
      headers: {
        'Content-Type': storedImage.type,
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  }),

  // 이미지 삭제 핸들러
  http.delete("/api/images/review/:imageId", ({ params }) => {
    const { imageId } = params;
    imageStorage.delete(imageId as string);
    return HttpResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:5173",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    );
  })
];

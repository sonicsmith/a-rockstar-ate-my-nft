import { useEffect, useRef } from "react";

export const PixelatedImage = ({ imageUrl }: { imageUrl: string }) => {
  const imageCanvas = useRef();

  useEffect(() => {
    if (imageCanvas.current) {
      const can = imageCanvas.current as any;
      const ctx = can.getContext("2d");
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        // Draw Image
        ctx.drawImage(img, 0, 0, 80, 80);
        const imageData = ctx.getImageData(0, 0, 80, 80);
        const pixels = imageData.data;
        const numPixels = pixels.length;
        ctx.clearRect(0, 0, can.width, can.height);
        for (let i = 0; i < numPixels; i++) {
          pixels[i * 4] = pixels[i * 4] - (pixels[i * 4] % 64);
          pixels[i * 4 + 1] = pixels[i * 4 + 1] - (pixels[i * 4 + 1] % 64);
          pixels[i * 4 + 2] = pixels[i * 4 + 2] - (pixels[i * 4 + 2] % 64);
        }
        ctx.putImageData(imageData, 0, 0);
      };
    }
  }, []);

  return (
    <div className="w-40 p-2">
      <canvas
        ref={imageCanvas as any}
        style={{
          transform: "scale(2)",
          imageRendering: "pixelated",
          transformOrigin: "top left",
        }}
      />
    </div>
  );
};

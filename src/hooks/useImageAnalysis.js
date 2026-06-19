import { useRef, useState } from "react";
import { getAveragePixel, computeIndex } from "../utils/imageAnalysis";

export const useImageAnalysis = () => {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [rgb, setRgb] = useState({ r: "-", g: "-", b: "-" });
  const [points, setPoints] = useState([]);
  const [mode, setMode] = useState("single");

  const handleFile = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setPoints([]);
      setRgb({ r: "-", g: "-", b: "-" });
    };

    reader.readAsDataURL(file);
  };

  const handleClick = (e) => {
    const imgEl = imgRef.current;
    const canvas = canvasRef.current;
    if (!imgEl || !canvas) return;

    const rect = imgEl.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const normX = clickX / rect.width;
    const normY = clickY / rect.height;

    const realX = Math.floor(normX * imgEl.naturalWidth);
    const realY = Math.floor(normY * imgEl.naturalHeight);

    const ctx = canvas.getContext("2d");
    const avg = getAveragePixel(ctx, realX, realY);

    
    if (!avg) return;

    if (mode === "single") {
      setPoints([{ x: clickX, y: clickY, ...avg }]);
      setRgb(avg);
    } else {
      const updated = [...points, { x: clickX, y: clickY, ...avg }];

      setPoints(updated);

      // ⚠️ asegurar que solo promedias valores válidos
      const valid = updated.filter(
        (p) => p.r != null && p.g != null && p.b != null
      );

      if (valid.length === 0) {
        setRgb({ r: "-", g: "-", b: "-" });
        return;
      }

      const sum = valid.reduce(
        (a, p) => ({
          r: a.r + p.r,
          g: a.g + p.g,
          b: a.b + p.b,
        }),
        { r: 0, g: 0, b: 0 }
      );

      setRgb({
        r: Math.round(sum.r / valid.length),
        g: Math.round(sum.g / valid.length),
        b: Math.round(sum.b / valid.length),
      });
    }
  };

  return {
    fileInputRef,
    canvasRef,
    imgRef,
    imageSrc,
    rgb,
    points,
    mode,
    setMode,
    handleFile,
    handleClick,
    computeIndex: () => computeIndex(rgb),
    reset: () => {
      setPoints([]);
      setRgb({ r: "-", g: "-", b: "-" });
    },
  };
};
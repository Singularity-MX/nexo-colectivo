export const getAveragePixel = (ctx, x, y, size = 11) => {
  const half = Math.floor(size / 2);

  const startX = Math.max(0, x - half);
  const startY = Math.max(0, y - half);

  const width = Math.min(size, ctx.canvas.width - startX);
  const height = Math.min(size, ctx.canvas.height - startY);

  const data = ctx.getImageData(startX, startY, width, height).data;

  let r = 0, g = 0, b = 0;
  let count = 0;

  const clamp = (v) => Math.max(0, Math.min(255, v));

  for (let i = 0; i < data.length; i += 4) {
    const pr = clamp(data[i]);
    const pg = clamp(data[i + 1]);
    const pb = clamp(data[i + 2]);

    const luminance = 0.2126 * pr + 0.7152 * pg + 0.0722 * pb;

    if (luminance < 20 || luminance > 240) continue;

    r += pr;
    g += pg;
    b += pb;
    count++;
  }

  if (count === 0) return null;

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
};


export const computeIndex = ({ r, g, b }) => {
  if (
    r == null || g == null || b == null ||
    r === "-" || g === "-" || b === "-"
  ) return "-";

  const sum = r + g + b;
  if (sum === 0) return 0;

  return ((2 * g - r - b) / sum).toFixed(3);
};
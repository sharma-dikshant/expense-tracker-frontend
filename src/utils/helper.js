// HSV → RGB
const hsvToRgb = (h, s, v) => {
  s /= 100;
  v /= 100;

  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

// RGB -> HEX
const rgbToHex = ({ r, g, b }) =>
  "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");

// Main random colors generator
export const getRandomColors = (n) => {
  return Array.from({ length: n }, () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 21) + 80;
    const v = Math.floor(Math.random() * 21) + 80;
    return rgbToHex(hsvToRgb(h, s, v)); 
  });
};

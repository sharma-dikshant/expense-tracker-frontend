export function generateUniqueRandomRGBA(n) {
  const colors = new Set();
  while (colors.size < n) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    colors.add([r, g, b]);
  }
  const backgroundColor = Array.from(colors).map(
    (el) => `rgba(${el[0]}, ${el[1]}, ${el[2]}, 0.2)`
  );
  const BorderColor = Array.from(colors).map(
    (el) => `rgba(${el[0]}, ${el[1]}, ${el[2]}, 1)`
  );

  return [backgroundColor, BorderColor];
}

export function generateUniqueRandomHSV(n) {
  const backgroundColor = [];
  const borderColor = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i);
    const saturation = 70;
    const lightness = 60;

    const hslBackground = `hsl(${hue}, ${saturation}%, 65%)`;
    const hslBorder = `hsl(${hue}, ${saturation}%, 40%)`;

    backgroundColor.push(hslBackground);
    borderColor.push(hslBorder);
  }

  return [backgroundColor, borderColor];
}

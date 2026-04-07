import sharp from 'sharp';

const purple = '#7F77DD';
const white = '#FFFFFF';

function iconSvg(size) {
  const fontSize = Math.round(size * 0.56);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="none" />
  <circle cx="${size / 2}" cy="${size / 2}" r="${Math.round(size * 0.46875)}" fill="${purple}" />
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    fill="${white}"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    font-size="${fontSize}"
  >z</text>
</svg>`.trim();
}

async function writeIcon(size) {
  const outputPath = `icon-${size}.png`;
  await sharp(Buffer.from(iconSvg(size)))
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(outputPath);
  console.log(`created ${outputPath}`);
}

await Promise.all([writeIcon(192), writeIcon(512)]);

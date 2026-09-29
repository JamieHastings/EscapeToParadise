import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const BG   = path.join(publicDir, 'audrey-hastings.jpg');
const LOGO = path.join(publicDir, 'Escape_to_Paradise_Logo.jpeg');
const OUT  = path.join(publicDir, 'og-image.jpg');

const W = 1200;
const H = 630;
const LOGO_SIZE  = 120;   // logo square px
const PADDING    = 28;    // corner padding px

// Resize logo to a circle-clipped square with slight opacity
const logoBuffer = await sharp(LOGO)
  .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'cover' })
  .toBuffer();

// Compose: crop background to 1200x630, overlay logo bottom-right
await sharp(BG)
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .composite([
    {
      input: logoBuffer,
      gravity: 'southeast',
      left: W - LOGO_SIZE - PADDING,
      top: H - LOGO_SIZE - PADDING,
    },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const { size } = (await import('fs')).statSync(OUT);
console.log(`og-image.jpg written → ${(size / 1024).toFixed(1)} KB`);

const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(w, h, pixelFn) {
  const pixels = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const [r, g, b, a] = pixelFn(x, y, w, h);
      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = Math.round(a * 255);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 4);
    row[0] = 0;
    pixels.copy(row, 1, y * w * 4, y * w * 4 + w * 4);
    rows.push(row);
  }

  const compressed = zlib.deflateSync(Buffer.concat(rows));

  return Buffer.concat([
    Buffer.from('\x89PNG\r\n\x1a\n', 'binary'),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function createIcoFromPng(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 64;
  entry[1] = 64;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  return Buffer.concat([header, entry, pngBuf]);
}

const w = 64;
const h = 64;

const png = createPng(w, h, (x, y, w, h) => {
  const bg = [2, 4, 9];
  const cx = w * 0.5;
  const cy = h * 0.5;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = w * 0.36;
  const inner = w * 0.18;
  let r = bg[0], g = bg[1], b = bg[2], a = 1;

  if (dist < radius) {
    const t = Math.max(0, Math.min(1, (radius - dist) / (radius - inner)));
    const gold1 = [255, 223, 124];
    r = Math.round(gold1[0] * t + r * (1 - t));
    g = Math.round(gold1[1] * t + g * (1 - t));
    b = Math.round(gold1[2] * t + b * (1 - t));
  }

  if (dist < inner) {
    const t2 = 1 - dist / inner;
    r = Math.round(255 * t2 + r * (1 - t2));
    g = Math.round(223 * t2 + g * (1 - t2));
    b = Math.round(124 * t2 + b * (1 - t2));
  }

  return [r, g, b, a];
});

const ico = createIcoFromPng(png);
fs.writeFileSync('public/favicon.ico', ico);
console.log('Generated public/favicon.ico');

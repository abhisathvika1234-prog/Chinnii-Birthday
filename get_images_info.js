const fs = require('fs');
const path = require('path');

function getJpgSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const blockLength = buffer.readUInt16BE(offset + 2);
    offset += 2 + blockLength;
  }
  return null;
}

const dir = path.join(__dirname, 'images');
fs.readdirSync(dir).forEach(file => {
  const size = getJpgSize(path.join(dir, file));
  console.log(file, size);
});

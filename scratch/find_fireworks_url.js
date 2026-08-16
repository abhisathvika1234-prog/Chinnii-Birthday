const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'videos', 'fireworks.mp4');

// High-quality public fireworks MP4 sample URLs
const urls = [
  'https://raw.githubusercontent.com/yannick-cw/fireworks-background/master/fireworks.mp4',
  'https://cdn.pixabay.com/video/2021/01/01/60878-497184209_large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-fireworks-exploding-in-the-sky-at-night-42861-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-night-sky-41484-large.mp4'
];

function tryDownload(urlIndex) {
  if (urlIndex >= urls.length) {
    console.error('All URLs failed');
    return;
  }

  const url = urls[urlIndex];
  console.log(`Trying URL [${urlIndex}]: ${url}`);
  const client = url.startsWith('https') ? https : http;

  const request = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log('Redirecting to:', res.headers.location);
      https.get(res.headers.location, (redRes) => {
        if (redRes.statusCode === 200) {
          saveStream(redRes);
        } else {
          tryDownload(urlIndex + 1);
        }
      });
      return;
    }

    if (res.statusCode === 200) {
      saveStream(res);
    } else {
      console.log(`Status ${res.statusCode}, trying next...`);
      tryDownload(urlIndex + 1);
    }
  });

  request.on('error', (err) => {
    console.log(`Error ${err.message}, trying next...`);
    tryDownload(urlIndex + 1);
  });
}

function saveStream(res) {
  const file = fs.createWriteStream(targetPath);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const stats = fs.statSync(targetPath);
      console.log(`SUCCESS! Saved fireworks video: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    });
  });
}

tryDownload(0);

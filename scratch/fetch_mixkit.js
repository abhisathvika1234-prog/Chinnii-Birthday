const fs = require('fs');
const https = require('https');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'videos', 'fireworks.mp4');

const mixkitUrls = [
  'https://assets.mixkit.co/videos/42861/42861-720.mp4',
  'https://assets.mixkit.co/videos/41484/41484-720.mp4',
  'https://assets.mixkit.co/videos/42861/42861-1080.mp4',
  'https://cdn.pixabay.com/video/2020/12/31/60670-495817208_tiny.mp4',
  'https://cdn.pixabay.com/video/2021/01/01/60878-497184209_tiny.mp4'
];

function tryFetch(index) {
  if (index >= mixkitUrls.length) {
    console.error('All mixkit URLs failed');
    return;
  }

  const url = mixkitUrls[index];
  console.log(`Testing Mixkit URL [${index}]: ${url}`);

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://mixkit.co/',
      'Accept': '*/*'
    }
  };

  https.get(url, options, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log('Redirecting to:', res.headers.location);
      https.get(res.headers.location, options, (redRes) => {
        if (redRes.statusCode === 200) saveFile(redRes);
        else tryFetch(index + 1);
      });
      return;
    }

    if (res.statusCode === 200) {
      saveFile(res);
    } else {
      console.log(`Status ${res.statusCode}, trying next...`);
      tryFetch(index + 1);
    }
  }).on('error', (err) => {
    console.log(`Error ${err.message}, trying next...`);
    tryFetch(index + 1);
  });
}

function saveFile(res) {
  const file = fs.createWriteStream(targetPath);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const stats = fs.statSync(targetPath);
      console.log(`SUCCESS! Downloaded Mixkit fireworks MP4: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    });
  });
}

tryFetch(0);

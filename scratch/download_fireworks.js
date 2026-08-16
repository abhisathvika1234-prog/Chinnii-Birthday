const fs = require('fs');
const https = require('https');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'videos', 'fireworks.mp4');

// High-quality Pexels fireworks direct video download URL
const pexelsUrl = 'https://www.pexels.com/video/856881/download/';

function downloadFile(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  https.get(url, options, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      console.log('Redirecting to:', response.headers.location);
      downloadFile(response.headers.location, dest, callback);
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Failed to download video, status code:', response.statusCode);
      fs.unlink(dest, () => {});
      return;
    }

    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log('Successfully downloaded fireworks video to:', dest);
        if (callback) callback();
      });
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Download error:', err.message);
  });
}

downloadFile(pexelsUrl, targetPath, () => {
  const stats = fs.statSync(targetPath);
  console.log(`Downloaded file size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
});

const fs = require('fs');
const https = require('https');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'videos', 'fireworks.mp4');

// High resolution public domain / Creative Commons fireworks videos on Wikimedia Commons / Archive.org
const candidateUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/14/Nagaoka_Fireworks_2015.webm/Nagaoka_Fireworks_2015.webm.720p.vp9.webm',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/14/Nagaoka_Fireworks_2015.webm/Nagaoka_Fireworks_2015.webm.480p.vp9.webm',
  'https://ia800501.us.archive.org/12/items/Fireworks_201407/Fireworks.mp4',
  'https://ia801608.us.archive.org/28/items/Fireworks_201507/Fireworks.mp4'
];

function tryCandidate(index) {
  if (index >= candidateUrls.length) {
    console.error('All candidates failed');
    return;
  }

  const url = candidateUrls[index];
  console.log(`Testing candidate [${index}]: ${url}`);

  const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log('Redirecting to:', res.headers.location);
      https.get(res.headers.location, (redRes) => {
        if (redRes.statusCode === 200) {
          saveFile(redRes);
        } else {
          tryCandidate(index + 1);
        }
      });
      return;
    }

    if (res.statusCode === 200) {
      saveFile(res);
    } else {
      console.log(`Status ${res.statusCode}, trying next...`);
      tryCandidate(index + 1);
    }
  });

  req.on('error', (err) => {
    console.log(`Error ${err.message}, trying next...`);
    tryCandidate(index + 1);
  });
}

function saveFile(res) {
  const file = fs.createWriteStream(targetPath);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const stats = fs.statSync(targetPath);
      console.log(`SUCCESS! Saved video: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    });
  });
}

tryCandidate(0);

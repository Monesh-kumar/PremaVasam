const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const GAL_DIR = path.join(__dirname, 'images', 'gallery');
if (!fs.existsSync(GAL_DIR)) fs.mkdirSync(GAL_DIR, { recursive: true });

const GALLERY_IMAGES = [
  // Happy Schooling
  { name: 'school_1.jpg', url: 'https://www.premavasam.org/sites/default/files/thumb_IMG_1542_1024.jpg' },
  { name: 'school_2.jpg', url: 'https://www.premavasam.org/sites/default/files/thumb_IMG_1551_1024.jpg' },
  { name: 'school_3.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2020-08-09-15-58-49%202.jpg' },
  { name: 'school_4.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2020-08-09-15-58-52%202.jpg' },
  { name: 'school_5.jpg', url: 'https://www.premavasam.org/sites/default/files/IMG_5184.JPG' },

  // Diwali 2024
  { name: 'diwali_1.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53.jpg' },
  { name: 'diwali_2.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53%206.jpg' },
  { name: 'diwali_3.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53%209.jpg' },
  { name: 'diwali_4.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53%2013.jpg' },
  { name: 'diwali_5.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53%2012.jpg' },
  { name: 'diwali_6.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2024-10-31-19-53-53%2011.jpg' },

  // Sports Meet 2023
  { name: 'sports_1.jpg', url: 'https://www.premavasam.org/sites/default/files/Image1_0.jpeg' },
  { name: 'sports_2.jpg', url: 'https://www.premavasam.org/sites/default/files/Image2_0.jpeg' },
  { name: 'sports_3.jpg', url: 'https://www.premavasam.org/sites/default/files/Image3_0.jpeg' },
  { name: 'sports_4.jpg', url: 'https://www.premavasam.org/sites/default/files/Image4_0.jpeg' },
  { name: 'sports_5.jpg', url: 'https://www.premavasam.org/sites/default/files/Image5_0.jpeg' },
  { name: 'sports_6.jpg', url: 'https://www.premavasam.org/sites/default/files/Image6_0.jpeg' },

  // Our Beautiful Children
  { name: 'children_1.jpg', url: 'https://www.premavasam.org/sites/default/files/IMG_9524.JPG' },
  { name: 'children_2.jpg', url: 'https://www.premavasam.org/sites/default/files/IMG_5589_0.JPG' },
  { name: 'children_3.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2021-04-24-16-23-35.jpg' },
  { name: 'children_4.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2020-08-09-15-58-39.jpg' },
  { name: 'children_5.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2021-03-21-18-40-30.jpg' }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(GAL_DIR, item.name);
    const client = item.url.startsWith('https') ? https : http;

    const req = client.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': 'https://www.premavasam.org/'
      },
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = 'https://www.premavasam.org' + redirectUrl;
        }
        item.url = redirectUrl;
        download(item).then(resolve);
        return;
      }

      if (res.statusCode !== 200) {
        console.warn(`⚠️  Failed ${item.name}: HTTP ${res.statusCode} (${item.url})`);
        resolve(false);
        return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const sz = fs.statSync(dest).size;
          console.log(`✅ Downloaded: ${item.name} (${sz} bytes)`);
          resolve(true);
        });
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        console.warn(`❌ Write error ${item.name}:`, err.message);
        resolve(false);
      });
    });

    req.on('error', (err) => {
      console.warn(`❌ Network error ${item.name}:`, err.message);
      resolve(false);
    });

    req.setTimeout(15000, () => {
      req.abort();
      console.warn(`⏱️  Timeout ${item.name}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${GALLERY_IMAGES.length} gallery images from premavasam.org...\n`);
  let success = 0;
  for (const img of GALLERY_IMAGES) {
    const ok = await download(img);
    if (ok) success++;
  }
  console.log(`\n🎉 Finished! Downloaded ${success}/${GALLERY_IMAGES.length} gallery images to ${GAL_DIR}`);
}

run();

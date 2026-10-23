const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const IMG_DIR = path.join(__dirname, 'images');
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

const IMAGES = [
  // Logos
  { name: 'logo.png', url: 'https://www.premavasam.org/sites/all/themes/trust/logo.png' },
  { name: 'prema-vasam.png', url: 'https://www.premavasam.org/sites/default/files/prema-vasam.png' },
  { name: 'front_page_web.jpg', url: 'https://www.premavasam.org/sites/default/files/Front-page-web.jpg' },

  // Hero Banners (ddblock)
  { name: 'banner_1.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/Banner%201.jpeg' },
  { name: 'img_1163.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/IMG_1163.jpg' },
  { name: 'img_1207.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/IMG_1207.jpg' },
  { name: 'img_9718.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/IMG_9718_0.jpg' },
  { name: 'img_9729.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/IMG_9729.jpg' },
  { name: 'swathidiwali.png', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/Swathidiwali.png' },
  { name: 'design_6.png', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/Untitled%20design-6.png' },
  { name: 'design_7.png', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/Untitled%20design-7.png' },
  { name: 'design.png', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/Untitled%20design.png' },
  { name: 'event_banner.jpg', url: 'https://www.premavasam.org/sites/default/files/images/ddblock/c2f1df1a-fec9-40f0-9b88-989119f7451b.jpeg' },

  // About Us / Who We Are
  { name: 'splgroup.jpg', url: 'https://www.premavasam.org/sites/default/files/splgroup.jpg' },
  { name: 'indra.jpg', url: 'https://www.premavasam.org/sites/default/files/indra.jpg' },
  { name: 'selvyn_roy.jpg', url: 'https://www.premavasam.org/sites/default/files/IMG_9525.JPG' },
  { name: 'baby_prem.jpg', url: 'https://www.premavasam.org/sites/default/files/appa2.jpg' },
  { name: 'mumtaj.jpg', url: 'https://www.premavasam.org/sites/default/files/Mumtaj-web.jpg' },

  // Activities & Therapies
  { name: 'physio_team.jpg', url: 'https://www.premavasam.org/sites/default/files/team.jpg' },
  { name: 'occupational.jpg', url: 'https://www.premavasam.org/sites/default/files/occupational.JPG' },
  { name: 'special_ed.jpg', url: 'https://www.premavasam.org/sites/default/files/IMG_5184.JPG' },
  { name: 'special_ed_aids.jpg', url: 'https://www.premavasam.org/sites/default/files/PHOTO-2020-08-09-15-58-52%202.jpg' },
  { name: 'play_therapy.jpg', url: 'https://www.premavasam.org/sites/default/files/play-therapy.jpg' },
  { name: 'play_therapy_sports.jpg', url: 'https://www.premavasam.org/sites/default/files/Playtherapy.jpg' },
  { name: 'dance1.jpg', url: 'https://www.premavasam.org/sites/default/files/dance1.jpg' },
  { name: 'dance2.jpg', url: 'https://www.premavasam.org/sites/default/files/dance2_0.jpg' },
  { name: 'achieve2_music.jpg', url: 'https://www.premavasam.org/sites/default/files/achieve2.JPG' },
  { name: 'achieve3_cultural.jpg', url: 'https://www.premavasam.org/sites/default/files/achieve3.JPG' },

  // Achievements
  { name: 'achieve_building.jpg', url: 'https://www.premavasam.org/sites/default/files/achieve.JPG' },
  { name: 'individual_care1.jpg', url: 'https://www.premavasam.org/sites/default/files/individual%20care1.jpg' },
  { name: 'individual_care4.jpg', url: 'https://www.premavasam.org/sites/default/files/Individualcare4.jpg' },
  { name: 'individual_care3.jpg', url: 'https://www.premavasam.org/sites/default/files/Individualcare3.JPG' },
  { name: 'achieve_praveena.jpg', url: 'https://www.premavasam.org/sites/default/files/achieve-praveena.JPG' }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(IMG_DIR, item.name);
    const client = item.url.startsWith('https') ? https : http;

    const req = client.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.premavasam.org/'
      },
      rejectUnauthorized: false
    }, (res) => {
      // Handle redirect
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
  console.log(`Downloading ${IMAGES.length} original images from premavasam.org...\n`);
  let success = 0;
  for (const img of IMAGES) {
    const ok = await download(img);
    if (ok) success++;
  }
  console.log(`\n🎉 Finished! Downloaded ${success}/${IMAGES.length} images directly to ${IMG_DIR}`);
}

run();

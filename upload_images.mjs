import fs from 'node:fs';
import path from 'node:path';

const STRAPI_URL = 'http://localhost:1337';
const IMAGES_DIR = '/home/cristian/.gemini/antigravity/brain/798d1f16-97a6-43bc-ae21-16bce7cdfd43';

const imagesToUpload = [
  { name: 'smartwatch_premium', file: 'smartwatch_premium_1772065283358.png' },
  { name: 'tablet_ultra_slim', file: 'tablet_ultra_slim_1772065357497.png' },
  { name: 'monitor_gaming_4k', file: 'monitor_gaming_4k_1772065418600.png' },
  { name: 'camera_security_wifi', file: 'camera_security_wifi_1772065480650.png' },
  { name: 'smart_speaker_modern', file: 'smart_speaker_modern_1772065584395.png' }
];

async function uploadImages() {
  console.log('📤 Subiendo imágenes a Strapi...');
  const uploadedFiles = {};

  for (const img of imagesToUpload) {
    const filePath = path.join(IMAGES_DIR, img.file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      continue;
    }

    const formData = new FormData();
    const blob = new Blob([fs.readFileSync(filePath)], { type: 'image/png' });
    formData.append('files', blob, img.file);

    try {
      const res = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        uploadedFiles[img.name] = json[0].id;
        console.log(`✅ Subido: ${img.name} (ID: ${json[0].id})`);
      } else {
        console.error(`❌ Error al subir ${img.name}:`, json);
      }
    } catch (err) {
      console.error(`🔥 Error fatal subiendo ${img.name}:`, err);
    }
  }

  fs.writeFileSync('uploaded_images.json', JSON.stringify(uploadedFiles, null, 2));
  console.log('✨ Proceso finalizado. IDs guardados en uploaded_images.json');
}

uploadImages();

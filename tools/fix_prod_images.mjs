const STRAPI_URL = 'https://reassuring-flower-045536ee58.strapiapp.com';
const IMAGES_DIR = '/home/cristian/.gemini/antigravity/brain/798d1f16-97a6-43bc-ae21-16bce7cdfd43';
import fs from 'node:fs';
import path from 'node:path';

const productsToUpdate = [
  { slug: 'iphone-15-pro-max', docId: 'rmvq3lxp81l5onwgb3uxwka9', file: 'uploaded_media_1772067433836.png' },
  { slug: 'samsung-s24-ultra', docId: 'sd14dfu2gh5i0ni2njaazrpb', file: 'uploaded_media_1772065918049.png' }
];

async function updateProducts() {
  console.log('🔄 Iniciando actualización de productos con imágenes de respaldo...');

  for (const item of productsToUpdate) {
    const filePath = path.join(IMAGES_DIR, item.file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      continue;
    }

    // 1. Subir imagen
    const formData = new FormData();
    const blob = new Blob([fs.readFileSync(filePath)], { type: 'image/png' });
    formData.append('files', blob, item.file);

    try {
      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadJson = await uploadRes.json();

      if (Array.isArray(uploadJson) && uploadJson.length > 0) {
        const imageId = uploadJson[0].id;
        console.log(`✅ Imagen subida para ${item.slug} (ID: ${imageId})`);

        // 2. Vincular imagen al producto
        const updateRes = await fetch(`${STRAPI_URL}/api/productos/${item.docId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              imagen: [imageId]
            }
          })
        });
        const updateJson = await updateRes.json();
        if (updateJson.data) {
          console.log(`✨ Producto ${item.slug} actualizado con éxito!`);
        } else {
          console.error(`❌ Falló actualización de ${item.slug}:`, updateJson.error);
        }
      }
    } catch (err) {
      console.error(`🔥 Error procesando ${item.slug}:`, err);
    }
  }
}

updateProducts();

const STRAPI_URL = 'https://reassuring-flower-045536ee58.strapiapp.com';

const productsToUpdate = [
  { slug: 'iphone-15-pro-max', docId: 'rmvq3lxp81l5onwgb3uxwka9', imageId: 6 },
  { slug: 'samsung-s24-ultra', docId: 'sd14dfu2gh5i0ni2njaazrpb', imageId: 7 }
];

async function linkImages() {
  console.log('🔗 Vinculando imágenes existentes a los productos...');

  for (const item of productsToUpdate) {
    try {
      const updateRes = await fetch(`${STRAPI_URL}/api/productos/${item.docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            imagen: [item.imageId]
          }
        })
      });
      const updateJson = await updateRes.json();
      if (updateJson.data) {
        console.log(`✨ Producto ${item.slug} vinculado con imagen ID ${item.imageId} con éxito!`);
      } else {
        console.error(`❌ Falló vinculación de ${item.slug}:`, updateJson.error);
      }
    } catch (err) {
      console.error(`🔥 Error procesando ${item.slug}:`, err);
    }
  }
}

linkImages();

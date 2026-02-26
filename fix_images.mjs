// fix_images.mjs
const STRAPI_URL = 'http://localhost:1337';

async function fix() {
  console.log('🖼️ Iniciando corrección de imágenes...');
  
  try {
    // 1. Obtener todos los productos
    const res = await fetch(`${STRAPI_URL}/api/productos`);
    const json = await res.json();
    
    if (!json.data) {
      console.error('❌ No se pudieron cargar los productos:', json.error);
      return;
    }

    const imageId = 1; // El ID de la imagen que encontramos

    for (const prod of json.data) {
      // Usamos documentId para actualizar en Strapi 5
      const docId = prod.documentId;
      
      console.log(`Updating product: ${prod.nombre} (${docId})...`);
      
      const updateRes = await fetch(`${STRAPI_URL}/api/productos/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            imagen: [imageId] // Es un array porque el campo es múltiple
          }
        })
      });

      const updateJson = await updateRes.json();
      if (updateJson.data) {
        console.log(`✅ Imagen asignada a: ${prod.nombre}`);
      } else {
        console.error(`❌ Error en ${prod.nombre}:`, updateJson.error);
      }
    }

    console.log('✨ Corrección finalizada. ¡Refresca la web!');
  } catch (error) {
    console.error('🔥 Error:', error);
  }
}

fix();

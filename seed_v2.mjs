const STRAPI_URL = 'http://localhost:1337';

const images = {
  smartwatch: 3,
  tablet: 4,
  monitor: 5,
  camera: 6,
  speaker: 7,
  iphone: 1, // Existente
  samsung: 2  // Existente
};

const categories = [
  { nombre: 'Smartphones', slug: 'smartphones' },
  { nombre: 'Laptops', slug: 'laptops' },
  { nombre: 'Audio', slug: 'audio' },
  { nombre: 'Accesorios', slug: 'accesorios' },
  { nombre: 'Wearables', slug: 'wearables' },
  { nombre: 'Hogar Inteligente', slug: 'hogar-inteligente' },
  { nombre: 'Gaming', slug: 'gaming' }
];

const products = [
  // Wearables
  { nombre: 'Smartwatch Pro Ultra', slug: 'smartwatch-pro-ultra', precio: 850, stock: 15, destacado: true, categoria: 'wearables', imagen: images.smartwatch },
  { nombre: 'Smartwatch Lite S', slug: 'smartwatch-lite-s', precio: 350, stock: 25, destacado: false, categoria: 'wearables', imagen: images.smartwatch },
  
  // Smartphones
  { nombre: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', precio: 5200, precioOferta: 4999, stock: 10, destacado: true, categoria: 'smartphones', imagen: images.iphone },
  { nombre: 'Samsung Galaxy S24 Ultra', slug: 'samsung-s24-ultra', precio: 4800, stock: 12, destacado: true, categoria: 'smartphones', imagen: images.samsung },
  { nombre: 'Xiaomi RedMi Note 13', slug: 'xiaomi-note-13', precio: 1200, stock: 40, destacado: false, categoria: 'smartphones', imagen: images.iphone },

  // Laptops / Tablets
  { nombre: 'Tablet Pro 12.9', slug: 'tablet-pro-12-9', precio: 3200, stock: 8, destacado: true, categoria: 'laptops', imagen: images.tablet },
  { nombre: 'MacBook Air M3', slug: 'macbook-air-m3-v2', precio: 5600, stock: 5, destacado: true, categoria: 'laptops', imagen: images.tablet },
  
  // Gaming
  { nombre: 'Monitor Gaming 32" 4K', slug: 'monitor-gaming-32', precio: 1800, precioOferta: 1650, stock: 10, destacado: true, categoria: 'gaming', imagen: images.monitor },
  { nombre: 'Teclado Mecánico RGB', slug: 'teclado-rgb', precio: 280, stock: 30, destacado: false, categoria: 'gaming', imagen: images.monitor },
  
  // Hogar Inteligente
  { nombre: 'Cámara 360 WiFi 4K', slug: 'camera-360-4k', precio: 220, stock: 50, destacado: true, categoria: 'hogar-inteligente', imagen: images.camera },
  { nombre: 'Smart Speaker V3', slug: 'smart-speaker-v3', precio: 180, stock: 60, destacado: true, categoria: 'hogar-inteligente', imagen: images.speaker },
  { nombre: 'Foco LED Inteligente', slug: 'foco-smart', precio: 45, stock: 100, destacado: false, categoria: 'hogar-inteligente', imagen: images.speaker },

  // Audio
  { nombre: 'Audífonos Noise Cancelling', slug: 'headphones-pro', precio: 950, stock: 20, destacado: true, categoria: 'audio', imagen: images.headphones || images.speaker },
  { nombre: 'Parlante Bluetooth Mini', slug: 'bt-speaker-mini', precio: 120, stock: 45, destacado: false, categoria: 'audio', imagen: images.speaker },

  // Accesorios
  { nombre: 'Mouse Inalámbrico Ergo', slug: 'mouse-ergo', precio: 150, stock: 80, destacado: false, categoria: 'accesorios', imagen: images.iphone },
  { nombre: 'Cargador Carga Rápida 65W', slug: 'charger-65w', precio: 95, stock: 120, destacado: false, categoria: 'accesorios', imagen: images.tablet },
  
  // Más productos para llegar a 20
  { nombre: 'Smartwatch Sport Fit', slug: 'smartwatch-sport', precio: 420, stock: 30, destacado: false, categoria: 'wearables', imagen: images.smartwatch },
  { nombre: 'Tablet Kid Edition', slug: 'tablet-kids', precio: 650, stock: 15, destacado: false, categoria: 'laptops', imagen: images.tablet },
  { nombre: 'Cámara Exterior Pro', slug: 'camera-outdoor', precio: 380, stock: 20, destacado: false, categoria: 'hogar-inteligente', imagen: images.camera },
  { nombre: 'Headset Gamer Pro', slug: 'headset-gamer', precio: 320, stock: 25, destacado: true, categoria: 'gaming', imagen: images.monitor }
];

async function seed() {
  console.log('🚀 Iniciando Seed V2...');
  try {
    const categoryIds = {};

    // 1. Crear Categorías
    for (const cat of categories) {
      const res = await fetch(`${STRAPI_URL}/api/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: cat })
      });
      const json = await res.json();
      if (json.data) {
        categoryIds[cat.slug] = json.data.documentId || json.data.id;
        console.log(`✅ Categoría: ${cat.nombre}`);
      }
    }

    // 2. Crear Productos
    for (const prod of products) {
      const { categoria, imagen, ...prodData } = prod;
      const res = await fetch(`${STRAPI_URL}/api/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: { 
            ...prodData, 
            categoria: categoryIds[categoria],
            imagen: imagen ? [imagen] : []
          } 
        })
      });
      const json = await res.json();
      if (json.data) {
        console.log(`✅ Producto: ${prod.nombre}`);
      } else {
        console.error(`❌ Error en ${prod.nombre}:`, json.error);
      }
    }

    console.log('✨ Catálogo expandido con éxito.');
  } catch (error) {
    console.error('🔥 Error fatal:', error);
  }
}

seed();

// Usando fetch nativo de Node v22
const STRAPI_URL = 'http://localhost:1337';

const categories = [
  { nombre: 'Smartphones', slug: 'smartphones' },
  { nombre: 'Laptops', slug: 'laptops' },
  { nombre: 'Accesorios', slug: 'accesorios' },
  { nombre: 'Audio', slug: 'audio' }
];

const products = [
  {
    nombre: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    precio: 4500,
    precioOferta: 4200,
    stock: 10,
    destacado: true,
    categoria: 'smartphones'
  },
  {
    nombre: 'Samsung Galaxy S24',
    slug: 'samsung-s24',
    precio: 3800,
    precioOferta: 3500,
    stock: 15,
    destacado: true,
    categoria: 'smartphones'
  },
  {
    nombre: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    precio: 5500,
    stock: 5,
    destacado: true,
    categoria: 'laptops'
  },
  {
    nombre: 'Dell XPS 13',
    slug: 'dell-xps-13',
    precio: 4800,
    stock: 8,
    destacado: false,
    categoria: 'laptops'
  },
  {
    nombre: 'Sony WH-1000XM5',
    slug: 'sony-wh1000xm5',
    precio: 1200,
    precioOferta: 999,
    stock: 20,
    destacado: true,
    categoria: 'audio'
  },
  {
    nombre: 'AirPods Pro 2',
    slug: 'airpods-pro-2',
    precio: 950,
    stock: 30,
    destacado: true,
    categoria: 'audio'
  },
  {
    nombre: 'Mouse Logitech MX Master 3S',
    slug: 'mx-master-3s',
    precio: 450,
    stock: 50,
    destacado: false,
    categoria: 'accesorios'
  },
  {
    nombre: 'Teclado Mecánico Keychron K2',
    slug: 'keychron-k2',
    precio: 380,
    stock: 12,
    destacado: true,
    categoria: 'accesorios'
  }
];

async function seed() {
  console.log('🚀 Iniciando poblado de datos...');

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
        console.log(`✅ Categoría creada: ${cat.nombre}`);
      } else {
        console.error(`❌ Error al crear categoría ${cat.nombre}:`, json.error);
      }
    }

    // 2. Crear Productos
    for (const prod of products) {
      const { categoria, ...prodData } = prod;
      const res = await fetch(`${STRAPI_URL}/api/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: { 
            ...prodData, 
            categoria: categoryIds[categoria]
          } 
        })
      });
      const json = await res.json();
      if (json.data) {
        console.log(`✅ Producto creado: ${prod.nombre}`);
      } else {
        console.error(`❌ Error al crear producto ${prod.nombre}:`, json.error);
      }
    }

    console.log('✨ Poblado completado con éxito.');
  } catch (error) {
    console.error('🔥 Error fatal durante el seed:', error);
  }
}

seed();

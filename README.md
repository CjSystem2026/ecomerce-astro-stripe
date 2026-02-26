# 🛍️ MiTienda Boilerplate - Astro + Strapi Cloud

Este es un **Boilerplate Fullstack** de alto rendimiento diseñado para crear eCommerce o Blogs modernos en tiempo récord. Utiliza una arquitectura **Headless** para separar el contenido (Strapi) de la presentación (Astro), logrando velocidades de carga superiores a WordPress o Shopify.

---

## 🚀 Características Principales

- **Frontend**: [Astro 5](https://astro.build/) (Ultra rápido, islas de interactividad).
- **Backend**: [Strapi 5](https://strapi.io/) (Headless CMS potente e intuitivo).
- **Despliegue**: Optimizado para **Vercel** y **Strapi Cloud**.
- **Imagen Pro**: Optimización automática con `astro:assets` (WebP/AVIF).
- **UX Premuim**: Skeletons loaders, Glassmorphism y animaciones fluidas (CSS Puro).
- **Monorepo**: Frontend y Backend en un solo repositorio para facilitar el despliegue.

---

## 🛠️ Estructura del Proyecto

```text
├── astro/         # Frontend (Páginas, Componentes, Estilos)
├── strapi/        # Backend (Modelos, API, Plugins)
├── tools/         # Scripts de utilidad (Seeding, Carga masiva)
└── docker-compose # Configuración para desarrollo local
```

---

## 🏁 Guía de Inicio Rápido

### 1. Clonar y Configurar

```bash
git clone <tu-repo-url>
cd ecomerce-astro-stripe
```

### 2. Variables de Entorno

Crea un archivo `.env` en la carpeta `astro/` con:

```env
PUBLIC_STRAPI_URL=https://tu-proyecto.strapiapp.com
```

### 3. Instalar Dependencias

- **Astro**: `cd astro && npm install`
- **Strapi**: `cd strapi && npm install`

### 4. Lanzar en Desarrollo

```bash
# En terminal 1 (Astro)
cd astro && npm run dev
# En terminal 2 (Strapi)
cd strapi && npm run develop
```

---

## 📂 Herramientas (/tools)

He incluido scripts automáticos para facilitar el trabajo:

- `seed_prod.mjs`: Llenar el catálogo de producción automáticamente.
- `upload_prod.mjs`: Subir imágenes locales a la nube de Strapi Cloud.

---

## 💡 ¿Cómo usarlo para un Cliente?

1.  **Categorías**: Define tus categorías en el panel de Strapi.
2.  **Branding**: Cambia los colores en `astro/src/layouts/MainLayout.astro` dentro de `:root`.
3.  **Componentes**: Los componentes en `astro/src/components` son 100% reutilizables.

---

## 📄 Licencia

Desarrollado por **Cristian** para portafolio profesional. ✨🦾

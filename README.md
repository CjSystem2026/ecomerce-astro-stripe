# E-commerce Astro + Strapi

Este proyecto es un e-commerce moderno utilizando **Astro** para el frontend y **Strapi** como Headless CMS.

## Estructura del proyecto

- `/astro`: Aplicación frontend (Astro, TypeScript, Vercel).
- `/strapi`: Backend CMS (Strapi, PostgreSQL, Docker).
- `docker-compose.yml`: Configuración para levantar la base de datos y Strapi localmente.

## Requisitos previos

- Docker y Docker Compose
- Node.js (v18 o superior)
- npm o yarn

## Guía de Inicio Rápido

### 1. Configurar el Backend (Strapi)

Primero, necesitamos inicializar el proyecto Strapi si aún no se ha hecho:

```bash
# Si la carpeta /strapi está vacía, ejecute:
npx create-strapi-app@latest strapi --quickstart --no-run
```

Luego, levanta el entorno con Docker:

```bash
docker-compose up -d
```

Esto levantará:

- **Strapi** en `http://localhost:1337`
- **PostgreSQL** en el puerto `5432`

### 2. Configurar el Frontend (Astro)

Entra en la carpeta de Astro e instala las dependencias:

```bash
cd astro
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:4321`.

### 3. Siguientes Pasos en Strapi (Admin)

Una vez que Strapi esté corriendo, ve a `http://localhost:1337/admin` y crea tu usuario administrador. Luego crea los siguientes **Content Types**:

1.  **Categoria**:
    - `nombre` (Text)
    - `slug` (UID, vinculado a nombre)
2.  **Producto**:
    - `nombre` (Text)
    - `slug` (UID, vinculado a nombre)
    - `descripcion` (Rich Text / Blocks)
    - `precio` (Number / Decimal)
    - `precioOferta` (Number / Decimal, opcional)
    - `stock` (Number / Integer)
    - `destacado` (Boolean)
    - `imagen` (Media, single)
    - `categoria` (Relation, Many-to-One con Categoria)

## Despliegue

- **Frontend**: Conecta la carpeta `/astro` a **Vercel**.
- **Backend**: Despliega la carpeta `/strapi` en **Strapi Cloud**.

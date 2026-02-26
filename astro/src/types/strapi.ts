// ─── Strapi Response Wrappers ────────────────────────────────────────────────

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ─── Imagen ──────────────────────────────────────────────────────────────────

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

// ─── Categoría ───────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Producto ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  descripcion: any;
  precio: number;
  precioOferta?: number;
  stock: number;
  destacado: boolean;
  imagen: StrapiImage | StrapiImage[] | null;
  imagenes?: StrapiImage[];
  categoria?: Category;
  createdAt: string;
  updatedAt: string;
}

// ─── Pedido ──────────────────────────────────────────────────────────────────

export type OrderStatus = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  id: number;
  producto: Product;
  cantidad: number;
  precioUnitario: number;
}

export interface Order {
  id: number;
  documentId: string;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente?: string;
  direccionEnvio: string;
  estado: OrderStatus;
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

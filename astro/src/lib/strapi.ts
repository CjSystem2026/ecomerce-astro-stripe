import type {
  Category,
  Order,
  Product,
  StrapiResponse,
  StrapiSingleResponse,
} from '@/types/strapi';

// ─── Config ──────────────────────────────────────────────────────────────────

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN ?? '';

// ─── Cliente base ────────────────────────────────────────────────────────────

async function strapiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText} — ${url}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── URL de imagen ───────────────────────────────────────────────────────────

export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return '/placeholder.webp';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export function blocksToPlainText(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block: any) => {
      return block.children?.map((child: any) => child.text).join('') || '';
    })
    .join(' ');
}

// ─── Productos ───────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  categoria?: string;
  destacado?: boolean;
  search?: string;
}): Promise<StrapiResponse<Product[]>> {
  const query = new URLSearchParams();
  query.set('populate', '*');

  if (params?.page) query.set('pagination[page]', String(params.page));
  if (params?.pageSize) query.set('pagination[pageSize]', String(params.pageSize));
  if (params?.categoria) query.set('filters[categoria][slug][$eq]', params.categoria);
  if (params?.search) query.set('filters[nombre][$containsi]', params.search);
  if (params?.destacado !== undefined)
    query.set('filters[destacado][$eq]', String(params.destacado));

  return strapiRequest<StrapiResponse<Product[]>>(`/productos?${query}`);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const data = await strapiRequest<StrapiResponse<Product[]>>(
    `/productos?filters[slug][$eq]=${slug}&populate=*`
  );
  return data.data[0] ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await getProducts({ destacado: true, pageSize: 8 });
  return data.data;
}

// ─── Categorías ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const data = await strapiRequest<StrapiResponse<Category[]>>(
    '/categorias?populate=*'
  );
  return data.data;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const data = await strapiRequest<StrapiResponse<Category[]>>(
    `/categorias?filters[slug][$eq]=${slug}&populate=*`
  );
  return data.data[0] ?? null;
}

// ─── Pedidos ─────────────────────────────────────────────────────────────────

export async function createOrder(
  orderData: Partial<Order>
): Promise<StrapiSingleResponse<Order>> {
  return strapiRequest<StrapiSingleResponse<Order>>('/pedidos', {
    method: 'POST',
    body: JSON.stringify({ data: orderData }),
  });
}

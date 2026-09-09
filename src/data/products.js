/*
  MASKARITAS — Product catalog
  ---------------------------------------------------------------
  DEMO PRODUCTS ONLY. Replace with real inventory before launch —
  see the checklist in README.md.

  HOW TO ADD A PRODUCT: copy one full product object below (from the
  opening { to the closing },), paste it before the closing bracket
  of the `products` array, and edit every field. It will automatically
  appear in search, its collection page, its audience page, and
  filters — you do not need to create a new page or touch any other
  file. Full instructions, including how to add photos, are in
  README.md → "Cómo agregar un producto".

  FIELD NOTES
  - slug: used in the product's URL (/producto/SLUG). Lowercase,
    words separated by hyphens, no spaces or accents.
  - audience: "ninos" or "adultos".
  - collection: one collection slug from siteConfig.js → navCollections
    (e.g. "halloween", "heroes-princesas"), or "" if it doesn't belong
    to a seasonal collection.
  - category: "costumes", "accesorios", "pelucas", "maquillaje-fx",
    or "calzado" — this decides which shop pages the product appears on.
  - sizeInventory: one number per size — 0 means agotado (sold out),
    1–2 shows "ÚLTIMAS PIEZAS", anything higher just shows as available.
    This file is a manual, static list: it does NOT prevent two people
    from buying the last piece at the same time. Replace it with a real
    inventory system before relying on it for a busy launch — see the
    "Inventario" note in README.md.
  - images: list of paths under /images/products/. The first image is
    the cover shown on cards and search.
*/

export const products = [
  {
    id: 'demo-001',
    slug: 'disfraz-vampiro-infantil',
    sku: 'MSK-DEMO-001',
    name: 'Disfraz Infantil — Demo 01 (Vampiro)',
    shortName: 'Disfraz Vampiro Infantil',
    category: 'costumes',
    subcategory: 'halloween',
    collection: 'halloween',
    audience: 'ninos',
    description: 'Disfraz de vampiro para niños, ideal para Halloween, fiestas temáticas y noches de disfraces. Capa, cuello y detalles incluidos.',
    contents: ['Capa', 'Camisa con cuello', 'Detalles decorativos'],
    price: 0,
    compareAtPrice: null,
    sizes: ['4', '6', '8', '10', '12'],
    sizeInventory: { '4': 3, '6': 2, '8': 0, '10': 4, '12': 1 },
    colors: ['Negro / Rojo'],
    images: ['/images/products/demo-001-a.svg', '/images/products/demo-001-b.svg'],
    featured: true,
    newArrival: true,
    bestSeller: false,
    lowStock: false,
    available: true,
    tags: ['vampiro', 'halloween', 'niños', 'noche'],
    season: 'halloween',
    seoTitle: 'Disfraz de Vampiro Infantil — Halloween Mérida | Maskaritas',
    seoDescription: 'Disfraz de vampiro para niños, disponible en tallas 4 a 12. Entregas en Mérida, Yucatán. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-002',
    slug: 'disfraz-bruja-infantil',
    sku: 'MSK-DEMO-002',
    name: 'Disfraz Infantil — Demo 02 (Bruja)',
    shortName: 'Disfraz Bruja Infantil',
    category: 'costumes',
    subcategory: 'halloween',
    collection: 'halloween',
    audience: 'ninos',
    description: 'Disfraz de bruja para niñas, con vestido, sombrero y detalles editoriales pensados para una temporada de Halloween con estilo.',
    contents: ['Vestido', 'Sombrero', 'Cinturón decorativo'],
    price: 0,
    compareAtPrice: null,
    sizes: ['4', '6', '8', '10', '12'],
    sizeInventory: { '4': 2, '6': 0, '8': 1, '10': 0, '12': 2 },
    colors: ['Negro / Morado'],
    images: ['/images/products/demo-002-a.svg'],
    featured: false,
    newArrival: true,
    bestSeller: true,
    lowStock: false,
    available: true,
    tags: ['bruja', 'halloween', 'niñas', 'princesa'],
    season: 'halloween',
    seoTitle: 'Disfraz de Bruja Infantil — Halloween Mérida | Maskaritas',
    seoDescription: 'Disfraz de bruja para niñas, tallas 4 a 12. Compra en línea con entrega en Mérida. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-003',
    slug: 'disfraz-heroe-nocturno-infantil',
    sku: 'MSK-DEMO-003',
    name: 'Disfraz Infantil — Demo 03 (Héroe Nocturno)',
    shortName: 'Disfraz Héroe Nocturno',
    category: 'costumes',
    subcategory: 'heroes',
    collection: 'heroes-princesas',
    audience: 'ninos',
    description: 'Disfraz de héroe para niños, evergreen fuera de temporada, con capa y máscara. Ideal para fiestas, festivales escolares y todos los días del año.',
    contents: ['Traje', 'Capa', 'Máscara'],
    price: 0,
    compareAtPrice: null,
    sizes: ['4', '6', '8', '10', '12'],
    sizeInventory: { '4': 1, '6': 3, '8': 2, '10': 0, '12': 0 },
    colors: ['Negro / Azul'],
    images: ['/images/products/demo-003-a.svg'],
    featured: false,
    newArrival: false,
    bestSeller: true,
    lowStock: false,
    available: true,
    tags: ['héroe', 'superhéroe', 'niños'],
    season: '',
    seoTitle: 'Disfraz de Héroe Infantil — Mérida | Maskaritas',
    seoDescription: 'Disfraz de héroe para niños, colección Héroes + Princesas, disponible todo el año. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-004',
    slug: 'disfraz-princesa-adulto',
    sku: 'MSK-DEMO-004',
    name: 'Disfraz Adulto — Demo 04 (Princesa)',
    shortName: 'Disfraz Princesa Adulto',
    category: 'costumes',
    subcategory: 'heroes',
    collection: 'heroes-princesas',
    audience: 'adultos',
    description: 'Disfraz de princesa para adultos, corte editorial y acabado premium para fiestas temáticas y eventos.',
    contents: ['Vestido', 'Accesorio de cabeza'],
    price: 0,
    compareAtPrice: null,
    sizes: ['CH', 'M', 'G'],
    sizeInventory: { CH: 2, M: 3, G: 0 },
    colors: ['Azul claro'],
    images: ['/images/products/demo-004-a.svg'],
    featured: false,
    newArrival: false,
    bestSeller: false,
    lowStock: false,
    available: true,
    tags: ['princesa', 'adulto'],
    season: '',
    seoTitle: 'Disfraz de Princesa para Adultos — Mérida | Maskaritas',
    seoDescription: 'Disfraz de princesa para adultos, tallas CH, M y G. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-005',
    slug: 'accesorio-corona-editorial',
    sku: 'MSK-DEMO-005',
    name: 'Accesorio — Demo 01 (Corona)',
    shortName: 'Corona Editorial',
    category: 'accesorios',
    subcategory: 'accesorios',
    collection: 'heroes-princesas',
    audience: 'ninos',
    description: 'Corona decorativa, el detalle que completa cualquier personaje de princesa o realeza.',
    contents: ['1 corona'],
    price: 0,
    compareAtPrice: null,
    sizes: ['Única'],
    sizeInventory: { Única: 6 },
    colors: ['Dorado'],
    images: ['/images/products/demo-005-a.svg'],
    featured: true,
    newArrival: false,
    bestSeller: false,
    lowStock: false,
    available: true,
    tags: ['corona', 'accesorio', 'princesa'],
    season: '',
    seoTitle: 'Corona para Disfraz — Accesorios Mérida | Maskaritas',
    seoDescription: 'Corona decorativa para completar disfraces de princesa o realeza. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-006',
    slug: 'chemise-clasica-infantil',
    sku: 'MSK-DEMO-006',
    name: 'Chemise Infantil — Demo',
    shortName: 'Chemise Clásica Infantil',
    category: 'calzado',
    subcategory: 'calzado',
    collection: '',
    audience: 'ninos',
    description: 'Zapato básico para disfraz, bailable y evento escolar. Corte tipo flat, cómodo para toda la jornada.',
    contents: ['1 par de chemises'],
    price: 0,
    compareAtPrice: null,
    sizes: ['16', '18', '20', '22', '24'],
    sizeInventory: { '16': 4, '18': 3, '20': 2, '22': 0, '24': 1 },
    colors: ['Negro'],
    images: ['/images/products/demo-006-a.svg'],
    featured: true,
    newArrival: false,
    bestSeller: true,
    lowStock: false,
    available: true,
    tags: ['chemise', 'bailable', 'calzado', 'escolar'],
    season: '',
    seoTitle: 'Chemise Clásica Infantil — Calzado para Bailables Mérida | Maskaritas',
    seoDescription: 'Chemise infantil clásica, ideal para bailables y festivales escolares en Mérida. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-007',
    slug: 'peluca-heroe-infantil',
    sku: 'MSK-DEMO-007',
    name: 'Peluca — Demo 01',
    shortName: 'Peluca Héroe Infantil',
    category: 'pelucas',
    subcategory: 'pelucas',
    collection: 'heroes-princesas',
    audience: 'ninos',
    description: 'Peluca infantil para completar disfraces de héroe o personaje, fibra suave y cómoda.',
    contents: ['1 peluca'],
    price: 0,
    compareAtPrice: null,
    sizes: ['Única'],
    sizeInventory: { Única: 0 },
    colors: ['Negro'],
    images: ['/images/products/demo-007-a.svg'],
    featured: false,
    newArrival: false,
    bestSeller: false,
    lowStock: false,
    available: false,
    tags: ['peluca', 'héroe', 'niños'],
    season: '',
    seoTitle: 'Peluca Infantil para Disfraz — Mérida | Maskaritas',
    seoDescription: 'Peluca infantil para complementar disfraces de personaje. Producto demo — precio y stock por confirmar.',
  },
  {
    id: 'demo-008',
    slug: 'maquillaje-fx-sangre-falsa',
    sku: 'MSK-DEMO-008',
    name: 'Maquillaje FX — Demo',
    shortName: 'Sangre Falsa FX',
    category: 'maquillaje-fx',
    subcategory: 'maquillaje-fx',
    collection: 'halloween',
    audience: 'ninos',
    description: 'Sangre falsa de uso cosmético para efectos de Halloween. Fácil de aplicar y remover.',
    contents: ['1 frasco'],
    price: 0,
    compareAtPrice: null,
    sizes: ['Única'],
    sizeInventory: { Única: 8 },
    colors: ['Rojo'],
    images: ['/images/products/demo-008-a.svg'],
    featured: false,
    newArrival: true,
    bestSeller: false,
    lowStock: false,
    available: true,
    tags: ['maquillaje', 'sangre', 'fx', 'halloween'],
    season: 'halloween',
    seoTitle: 'Sangre Falsa para Halloween — Maquillaje FX Mérida | Maskaritas',
    seoDescription: 'Sangre falsa de efectos especiales para disfraces de Halloween. Producto demo — precio y stock por confirmar.',
  },
];

// ---------------------------------------------------------------
// Helpers — read from these in the UI rather than re-deriving stock
// logic in every page.
// ---------------------------------------------------------------

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug) {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getProductsByAudience(audience) {
  return products.filter((p) => p.audience === audience);
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(slugs) {
  if (!slugs || !slugs.length) return products.filter((p) => p.featured);
  return slugs.map((s) => getProductBySlug(s)).filter(Boolean);
}

export function totalStock(product) {
  return Object.values(product.sizeInventory).reduce((sum, n) => sum + n, 0);
}

export function isSoldOut(product) {
  return !product.available || totalStock(product) === 0;
}

export function sizeStatus(product, size) {
  const qty = product.sizeInventory[size] ?? 0;
  if (qty <= 0) return 'agotado';
  if (qty <= 2) return 'ultimas';
  return 'disponible';
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.shortName, p.description, ...(p.tags || [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

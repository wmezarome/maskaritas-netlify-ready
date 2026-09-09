/*
  MASKARITAS — Site configuration
  ---------------------------------------------------------------
  This is the ONE file to edit for most routine changes: switching
  the homepage campaign, updating the WhatsApp number, or changing
  delivery settings. See README.md for a plain-language walkthrough
  of every field below.

  TO CHANGE SEASON: change `activeSeason` to the key of any season
  object in `seasons` below (e.g. "holiday"). The homepage, hero,
  and accent color update automatically — you do not need to touch
  any other file. Fill in a season's content before switching to it.
*/

export const whatsappNumber = '+52 999 390 0333';
export const whatsappLink = 'https://wa.me/529993900333';

export function whatsappUrl(message) {
  const base = 'https://wa.me/529993900333';
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const announcementBar = {
  text: 'COMPRA 100% EN LÍNEA · ENVÍOS EN MÉRIDA · ¿NECESITAS AYUDA?',
  linkLabel: 'WHATSAPP',
  linkUrl: whatsappUrl('Hola Maskaritas, necesito ayuda con una compra.'),
};

// -----------------------------------------------------------------
// ACTIVE SEASON — change this one line to switch campaigns.
// -----------------------------------------------------------------
export const activeSeason = 'halloween';

export const seasons = {
  halloween: {
    key: 'halloween',
    name: 'Halloween',
    eyebrow: 'SEASON 01 / HALLOWEEN 2026',
    headlineLines: ['LITTLE', 'MONSTERS.'],
    subtitle: 'Disfraces para grandes historias, pequeños personajes y noches inolvidables.',
    sideLabel: ['HALLOWEEN COLLECTION', '2026 / MÉRIDA'],
    primaryCta: { label: 'COMPRAR HALLOWEEN', href: '/colecciones/halloween' },
    secondaryCta: { label: 'VER NIÑOS', href: '/ninos' },
    heroImage: '/images/campaigns/hero-halloween.svg',
    heroImageAlt: 'Campaña Maskaritas Halloween 2026',
    // Slider editorial del hero — agrega o quita objetos para cambiar
    // cuántas imágenes rotan. Reemplaza cada "image" por tu fotografía
    // real cuando la tengas; ver README.md → "Cambiar la imagen del hero".
    // Slides "flat": la imagen ya trae el titular, el logo y el botón
    // dibujados encima (diseñados fuera del sitio) — el sitio NO le
    // agrega texto propio, solo la muestra y la hace clickeable.
    heroFlat: true,
    heroSlides: [
      { image: '/images/campaigns/hero-halloween-flat-1.jpg', alt: 'Halloween — Maskaritas, un mundo para imaginar', href: '/colecciones/halloween' },
      { image: '/images/campaigns/hero-halloween-flat-2.jpg', alt: 'Maskaritas — imagina, juega, disfrázate, sonríe', href: '/shop' },
      { image: '/images/campaigns/hero-halloween-flat-3.jpg', alt: 'Un mundo para imaginar — Maskaritas', href: '/ninos' },
    ],
    accent: '#9a3512',
    accentDeep: '#511c18',
    accentTint: '#f4e6df',
    editorial: {
      eyebrow: 'NEW SEASON',
      headlineLines: ['HALLOWEEN', 'STARTS HERE.'],
      body: 'Una selección editorial de disfraces, accesorios y personajes para las noches más esperadas del año.',
      cta: { label: 'EXPLORAR COLECCIÓN', href: '/colecciones/halloween' },
      image: '/images/campaigns/editorial-halloween.svg',
      imageAlt: 'Editorial Halloween Maskaritas',
    },
    featuredCollections: ['halloween', 'heroes-princesas', 'accesorios', 'calzado'],
    featuredProductSlugs: [
      'diadema-medusa-serpientes',
      'diadema-arana-negra',
      'mascara-oso-siniestro',
      'mascara-monja-terror',
    ],
  },

  holiday: {
    key: 'holiday',
    name: 'Navidad',
    eyebrow: 'SEASON 02 / NAVIDAD 2026',
    headlineLines: ['PEQUEÑOS', 'PERSONAJES.'],
    subtitle: 'Disfraces y personajes para las posadas, pastorelas y noches de diciembre.',
    sideLabel: ['HOLIDAY COLLECTION', '2026 / MÉRIDA'],
    primaryCta: { label: 'COMPRAR NAVIDAD', href: '/colecciones/navidad' },
    secondaryCta: { label: 'VER NIÑOS', href: '/ninos' },
    heroImage: '/images/campaigns/hero-holiday.svg',
    heroImageAlt: 'Campaña Maskaritas Navidad',
    heroSlides: [
      { image: '/images/campaigns/hero-holiday.svg', alt: 'Campaña Maskaritas Navidad — portada' },
      { image: '/images/campaigns/hero-holiday-2.svg', alt: 'Campaña Maskaritas Navidad — personajes' },
      { image: '/images/campaigns/hero-holiday-3.svg', alt: 'Campaña Maskaritas Navidad — familia' },
    ],
    accent: '#3d412a',
    accentDeep: '#232619',
    accentTint: '#e7e9df',
    editorial: {
      eyebrow: 'NEW SEASON',
      headlineLines: ['LA TEMPORADA', 'HA LLEGADO.'],
      body: 'Personajes y disfraces para pastorelas, posadas y celebraciones en familia.',
      cta: { label: 'EXPLORAR COLECCIÓN', href: '/colecciones/navidad' },
      image: '/images/campaigns/editorial-holiday.svg',
      imageAlt: 'Editorial Navidad Maskaritas',
    },
    featuredCollections: ['navidad', 'heroes-princesas', 'accesorios', 'calzado'],
    featuredProductSlugs: [],
  },

  spring: {
    key: 'spring',
    name: 'Primavera',
    eyebrow: 'SEASON 03 / PRIMAVERA',
    headlineLines: ['NUEVOS', 'PERSONAJES.'],
    subtitle: 'Disfraces para bailables, festivales de primavera y eventos escolares.',
    sideLabel: ['SPRING COLLECTION', 'MÉRIDA'],
    primaryCta: { label: 'COMPRAR PRIMAVERA', href: '/colecciones/primavera' },
    secondaryCta: { label: 'VER NIÑOS', href: '/ninos' },
    heroImage: '/images/campaigns/hero-spring.svg',
    heroImageAlt: 'Campaña Maskaritas Primavera',
    heroSlides: [
      { image: '/images/campaigns/hero-spring.svg', alt: 'Campaña Maskaritas Primavera — portada' },
      { image: '/images/campaigns/hero-spring-2.svg', alt: 'Campaña Maskaritas Primavera — personajes' },
      { image: '/images/campaigns/hero-spring-3.svg', alt: 'Campaña Maskaritas Primavera — bailables' },
    ],
    accent: '#70594a',
    accentDeep: '#4a392f',
    accentTint: '#efe8df',
    editorial: {
      eyebrow: 'NEW SEASON',
      headlineLines: ['PRIMAVERA', 'EN ESCENA.'],
      body: 'Vestuario y calzado para bailables y festivales de fin de ciclo escolar.',
      cta: { label: 'EXPLORAR COLECCIÓN', href: '/colecciones/primavera' },
      image: '/images/campaigns/editorial-spring.svg',
      imageAlt: 'Editorial Primavera Maskaritas',
    },
    featuredCollections: ['primavera', 'calzado', 'accesorios'],
    featuredProductSlugs: [],
  },
};

export function getActiveSeason() {
  return seasons[activeSeason];
}

// -----------------------------------------------------------------
// Shipping — prices are not finalized. Fill these in before launch.
// -----------------------------------------------------------------
export const shippingConfig = {
  zoneLabel: 'Mérida, Yucatán',
  flatRate: null, // e.g. 99 — set a peso amount once delivery pricing is confirmed
  freeShippingThreshold: null, // e.g. 999 — order subtotal (MXN) that unlocks free delivery
  estimatedDays: '2 a 4 días hábiles dentro de Mérida',
  notes: 'La cobertura de entrega y el costo de envío están sujetos a confirmación por WhatsApp antes de tu compra.',
};

// -----------------------------------------------------------------
// Navigation structure
// -----------------------------------------------------------------
export const navShop = [
  { label: 'Todo', href: '/shop' },
  { label: 'Nuevo', href: '/shop?filter=nuevo' },
  { label: 'Niños', href: '/ninos' },
  { label: 'Adultos', href: '/adultos' },
];

export const navCollections = [
  { label: 'Halloween', href: '/colecciones/halloween', slug: 'halloween' },
  { label: 'Héroes + Princesas', href: '/colecciones/heroes-princesas', slug: 'heroes-princesas' },
  { label: 'Animalitos', href: '/colecciones/animalitos', slug: 'animalitos' },
  { label: 'Navidad', href: '/colecciones/navidad', slug: 'navidad' },
  { label: 'Primavera / Bailables', href: '/colecciones/primavera', slug: 'primavera' },
];

export const collectionMeta = {
  halloween: { name: 'Halloween', subtitle: 'La temporada comienza aquí.', coverImages: ['/images/collections/cover-halloween.jpg'] },
  'heroes-princesas': { name: 'Héroes + Princesas', subtitle: 'Personajes que nunca pasan de moda.', coverImages: ['/images/collections/cover-heroes.jpg', '/images/collections/cover-princesas.jpg'] },
  animalitos: { name: 'Animalitos', subtitle: 'Disfraces de animales y personajes para eventos escolares.', coverImages: ['/images/collections/cat-heroes.svg'] },
  navidad: { name: 'Navidad', subtitle: 'Personajes y disfraces para la temporada decembrina.', coverImages: ['/images/collections/cat-accesorios.svg'] },
  primavera: { name: 'Primavera / Bailables', subtitle: 'Vestuario para festivales y bailables escolares.', coverImages: ['/images/collections/cat-calzado.svg'] },
};

export const navComplete = [
  { label: 'Accesorios', href: '/accesorios' },
  { label: 'Pelucas', href: '/pelucas' },
  { label: 'Maquillaje + FX', href: '/maquillaje-fx' },
  { label: 'Calzado / Chemises', href: '/calzado' },
];

// Category strip on the homepage (section 15 of the brief)
export const categoryStrip = [
  { label: 'HALLOWEEN', copy: 'La temporada comienza aquí.', href: '/colecciones/halloween', image: '/images/collections/cat-halloween.svg' },
  { label: 'HÉROES + PRINCESAS', copy: 'Personajes que nunca pasan de moda.', href: '/colecciones/heroes-princesas', image: '/images/collections/cat-heroes.svg' },
  { label: 'ACCESORIOS', copy: 'El detalle que completa el personaje.', href: '/accesorios', image: '/images/collections/cat-accesorios.svg' },
  { label: 'CALZADO', copy: 'Chemises para disfraces, bailables y eventos.', href: '/calzado', image: '/images/collections/cat-calzado.svg' },
];

export const trustStrip = [
  { title: 'ENTREGA EN MÉRIDA', copy: 'Compra en línea, recibe en casa.' },
  { title: 'PAGO SEGURO', copy: 'Checkout protegido.' },
  { title: 'PEDIDOS ESPECIALES', copy: 'Solicítalo con anticipación.' },
  { title: 'AYUDA PERSONAL', copy: 'Estamos en WhatsApp.' },
];

export const faqItems = [
  { q: '¿Qué tallas manejan?', a: 'Niños: 4, 6, 8, 10 y 12. Adultos: CH, M y G. La disponibilidad de cada talla depende del producto y se muestra en cada página.' },
  { q: '¿Cómo sé si un disfraz está disponible?', a: 'Cada producto muestra sus tallas disponibles. Si una talla aparece deshabilitada, no hay piezas en existencia por el momento.' },
  { q: '¿Hacen entregas en Mérida?', a: 'Sí. Por ahora entregamos en Mérida, Yucatán. Estamos trabajando para ampliar nuestra cobertura.' },
  { q: '¿Cuánto tarda mi pedido?', a: shippingConfig.estimatedDays + '. Te confirmaremos el tiempo exacto al finalizar tu compra.' },
  { q: '¿Puedo solicitar un disfraz que no aparece en la página?', a: 'Sí. Usa el formulario de "¿No lo encontraste?" y haremos lo posible por conseguirlo para ti.' },
  { q: '¿Con cuánto tiempo debo solicitar un pedido especial?', a: 'Recomendamos al menos 2 semanas de anticipación. Los pedidos especiales están sujetos a disponibilidad.' },
  { q: '¿Manejan disfraces para adultos?', a: 'Sí, en tallas CH, M y G, aunque nuestro catálogo más amplio es para niños.' },
  { q: '¿Qué son los chemises?', a: 'Son zapatos básicos tipo flat, ideales para disfraces, bailables y eventos escolares.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Pago seguro en línea con tarjeta. Te avisaremos si algún método adicional está disponible.' },
  { q: '¿Cómo puedo contactar a Maskaritas?', a: 'Por WhatsApp al ' + whatsappNumber + ', el botón está disponible en cualquier página del sitio.' },
];

// Placeholder — must be written before accepting real orders.
export const exchangePolicy = {
  status: 'PENDIENTE DE CONFIGURAR',
  text: 'La política de cambios y devoluciones de Maskaritas se publicará aquí antes del lanzamiento. Por ahora, cualquier duda sobre un pedido puede resolverse por WhatsApp.',
};

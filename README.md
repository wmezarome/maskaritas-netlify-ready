# MASKARITAS — Sitio web

## IMPORTANTE — DESPLIEGUE EN GITHUB + NETLIFY

Lee esto primero si vas a subir el proyecto a GitHub y conectarlo a
Netlify. Un despliegue anterior falló porque Netlify no encontró un
proyecto de Vite en la raíz del repositorio — sigue estos pasos
exactamente para evitar que vuelva a pasar.

1. **Sube TODO el contenido de esta carpeta a GitHub — no solo los
   archivos `.html`.** El repositorio necesita `package.json`,
   `vite.config.js`, `netlify.toml`, la carpeta `src/`, la carpeta
   `public/` y la carpeta `netlify/` para poder construirse.

2. **La raíz del repositorio de GitHub debe mostrar, de inmediato,
   sin entrar a ninguna subcarpeta:**
   ```
   package.json
   netlify.toml
   vite.config.js
   index.html
   src/
   public/
   netlify/
   ```
   Si al abrir el repositorio ves una sola carpeta contenedora (por
   ejemplo "maskaritas/") y todo está adentro de ella, sube el
   **contenido** de esa carpeta a la raíz del repositorio, no la
   carpeta en sí. Usa `DEPLOY-CHECKLIST.txt` para confirmarlo antes
   de subir.

3. **Conecta el repositorio a Netlify** ("Add new site" → "Import an
   existing project" → elige tu repositorio de GitHub).

4. **Configura estos ajustes en Netlify** (normalmente Netlify los
   detecta solos gracias a `netlify.toml`, pero verifícalos):

   | Ajuste | Valor |
   |---|---|
   | Base directory | *(vacío / en blanco)* |
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Functions directory | `netlify/functions` |

5. Haz clic en **"Deploy site"**.

6. **Verifica el "Deploy log"** — debe contener líneas como:
   ```
   npm run build
   vite build
   building for production...
   ✓ built in ...
   ```
   Si en cambio el log dice **"No build steps found"** o
   **"Starting to deploy site from '/'"**, Netlify está apuntando a
   la carpeta equivocada del repositorio — revisa el paso 2.

Una vez que el log muestre `vite build` completado, el sitio, las
páginas internas, las URLs limpias de producto (`/producto/...`) y de
colección (`/colecciones/...`) funcionarán correctamente.

---


Boutique de disfraces en línea. Este documento está escrito para alguien
**sin experiencia en programación** — sigue los pasos en orden y no
necesitarás tocar código para las tareas del día a día.

---

## 0. Qué tecnología usa este proyecto (y por qué)

El sitio es un **proyecto estático de varias páginas**, construido con
**Vite** y JavaScript simple (sin React, sin Next.js, sin base de datos).
Se eligió esta opción porque:

- No necesita un servidor propio: se sube a **Netlify** y listo.
- Es la opción más fácil de entender y mantener para alguien que no
  programa — los datos que cambias con más frecuencia (productos, textos
  de temporada, WhatsApp) viven en dos archivos de texto sencillos.
- Carga muy rápido, incluso con muchas fotos de producto.
- Cuando llegue el momento de conectar pagos reales, **Netlify
  Functions** permite ejecutar código seguro en el servidor sin tener
  que rentar ni administrar un servidor aparte.

---

## 1. Qué hace cada carpeta

```
/index.html, /shop.html, /ninos.html, ...   → una página cada una
/collection.html                             → plantilla que se reutiliza
                                                para TODAS las colecciones
                                                (/colecciones/halloween, etc.)
/product.html                                → plantilla que se reutiliza
                                                para TODOS los productos
                                                (/producto/nombre-del-producto)
/src/data/siteConfig.js                      → temporada activa, textos del
                                                hero, WhatsApp, envíos, FAQ
/src/data/products.js                        → TODO el catálogo de productos
/src/js/                                     → la lógica del sitio (carrito,
                                                encabezado, pie de página,
                                                buscador, checkout…)
/src/styles/                                 → los estilos visuales
/public/images/products/                     → fotos de producto
/public/images/campaigns/                    → fotos de campaña/hero
/public/images/collections/                  → fotos de las colecciones
/netlify/functions/create-order.js           → el "puente" seguro hacia
                                                Openpay (ver sección 9)
/netlify.toml                                → configuración de Netlify
/.env.example                                → lista de claves secretas que
                                                se configuran en Netlify,
                                                NUNCA en este proyecto
```

### Cómo funcionan las URLs

`product.html` y `collection.html` son plantillas únicas que se rellenan
según la URL. Por ejemplo, `/producto/disfraz-vampiro-infantil` y
`/producto/disfraz-bruja-infantil` cargan el mismo archivo
`product.html`, que lee el final de la URL y muestra el producto
correspondiente. Esto está configurado en `netlify.toml` y no necesitas
tocarlo.

---

## 2. Cómo correr el sitio en tu computadora (opcional, para revisar cambios)

1. Instala [Node.js](https://nodejs.org) (versión 18 o superior).
2. Abre una terminal dentro de la carpeta del proyecto.
3. Ejecuta una sola vez: `npm install`
4. Ejecuta: `npm run dev`
5. Abre la dirección que aparece en la terminal (normalmente
   `http://localhost:5173`).

No es obligatorio hacer esto — también puedes editar los archivos y
subir el proyecto directamente a Netlify para verlo.

---

## 3. Cambios que harás seguido

### Cambiar el logo
El logo real de Maskaritas ya está integrado, en
`public/images/logo/`:
- `maskaritas-logo.png` — versión original en alta resolución
- `maskaritas-logo-header.png` — versión optimizada para el encabezado
  y el pie de página
- `favicon.png` — versión pequeña usada como ícono de pestaña

Para reemplazarlo por una versión nueva del logo:
1. Guarda tu archivo dentro de `public/images/logo/`, reemplazando
   `maskaritas-logo-header.png` (o usa un nombre distinto).
2. Si usas un nombre distinto, actualiza la ruta en
   `src/js/chrome.js` (busca `maskaritas-logo-header.png`, aparece
   dos veces: encabezado y pie de página) y en el atributo
   `href="/images/logo/favicon.png"` de cada archivo `.html` si
   también cambias el favicon.

### Cambiar la imagen del hero (y el slider)
El hero de la página de inicio ahora es un **slider editorial**: rota
automáticamente entre varias imágenes con una transición suave (fade),
flechas y puntos para navegar manualmente.
1. Sube tus fotos a `public/images/campaigns/`.
2. Abre `src/data/siteConfig.js`.
3. Dentro de la temporada activa, edita la lista `heroSlides`:
   ```js
   heroSlides: [
     { image: '/images/campaigns/tu-foto-1.jpg', alt: 'Descripción de la foto 1' },
     { image: '/images/campaigns/tu-foto-2.jpg', alt: 'Descripción de la foto 2' },
   ],
   ```
   Puedes tener 1, 2, 3 o más imágenes — si dejas solo una, el sitio
   muestra esa imagen fija, sin flechas ni puntos.

### Cambiar el titular de Halloween ("LITTLE MONSTERS.")
En `src/data/siteConfig.js`, dentro del objeto `halloween`, edita:
```js
headlineLines: ['LITTLE', 'MONSTERS.'],
subtitle: 'Disfraces para grandes historias, pequeños personajes y noches inolvidables.',
```

### Cambiar de temporada (por ejemplo, activar Navidad)
En `src/data/siteConfig.js`, busca la línea:
```js
export const activeSeason = 'halloween';
```
y cámbiala por:
```js
export const activeSeason = 'holiday';
```
Antes de hacer el cambio, completa el contenido del objeto `holiday`
en el mismo archivo (headline, subtítulo, imagen, productos
destacados) igual que está completo el de `halloween`. El resto del
sitio (menú, catálogo, carrito, checkout, footer) **no cambia** —
solo el homepage y su color de acento.

### Agregar un producto
1. Abre `src/data/products.js`.
2. Copia un producto completo (desde `{` hasta la `},` que lo cierra).
3. Pégalo antes del `];` que cierra la lista `products`.
4. Edita cada campo: `slug` (usado en la URL, sin espacios ni acentos),
   `name`, `price`, `sizes`, `sizeInventory`, `images`, etc.
5. Guarda el archivo. El producto aparecerá automáticamente en el
   buscador, en su colección, en su página de audiencia (Niños/Adultos)
   y en los filtros — no necesitas crear ninguna página nueva.

### Agregar fotos de producto
1. Guarda las fotos dentro de `public/images/products/`, con un nombre
   claro, por ejemplo `disfraz-vampiro-01.jpg` y `disfraz-vampiro-02.jpg`.
   Proporción recomendada: 4:5 (vertical).
2. En `src/data/products.js`, dentro del producto correspondiente,
   edita la lista `images`:
   ```js
   images: ['/images/products/disfraz-vampiro-01.jpg', '/images/products/disfraz-vampiro-02.jpg'],
   ```
   La primera imagen de la lista es la que se usa como portada.

### Cambiar un precio
En `src/data/products.js`, busca el producto y cambia el número en
`price:` (en pesos mexicanos, sin comas ni el símbolo $).

### Agregar o quitar tallas
Edita las listas `sizes` y `sizeInventory` del producto. Deben tener
exactamente las mismas tallas — por cada talla en `sizes`, debe existir
esa misma talla como llave dentro de `sizeInventory`.

### Actualizar el inventario / marcar AGOTADO
En `sizeInventory`, pon `0` en la talla que ya no tiene piezas:
```js
sizeInventory: { '4': 0, '6': 2, '8': 0, '10': 1, '12': 3 },
```
Un número entre 1 y 2 muestra "ÚLTIMAS PIEZAS" automáticamente. Para
marcar el producto completo como agotado (todas las tallas), pon todas
las cantidades en `0`.

**Importante — límite de este archivo:** `products.js` es un archivo de
texto que tú editas a mano. Es perfecto para empezar, pero **no evita**
que dos personas compren la última pieza al mismo tiempo, porque no
hay una base de datos real detrás. Si Maskaritas crece y el volumen de
pedidos aumenta, lo siguiente sería conectar un inventario real
(por ejemplo, una hoja de cálculo conectada o una base de datos) — el
código está organizado para que ese cambio sea sencillo más adelante.

### Marcar un producto como NUEVO, BESTSELLER o destacado
En el producto, cambia:
```js
newArrival: true,   // muestra la etiqueta NUEVO
bestSeller: true,   // muestra la etiqueta BESTSELLER
featured: true,      // lo hace elegible para aparecer en "THE MASKARITAS EDIT"
```
Para elegir exactamente qué 4 productos aparecen destacados en el
homepage, edita `featuredProductSlugs` dentro de la temporada activa en
`siteConfig.js`.

### Cambiar el número de WhatsApp
En `src/data/siteConfig.js`, cambia estas dos líneas al inicio del
archivo:
```js
export const whatsappNumber = '+52 999 390 0333';
export const whatsappLink = 'https://wa.me/529993900333';
```
`whatsappLink` debe llevar el número sin espacios ni signos, con `52`
al inicio.

### Configurar el envío (costo, zona, tiempos)
En `src/data/siteConfig.js`, edita el objeto `shippingConfig`:
```js
export const shippingConfig = {
  zoneLabel: 'Mérida, Yucatán',
  flatRate: null,               // pon un número, ej. 99, cuando definan el costo
  freeShippingThreshold: null,  // ej. 999
  estimatedDays: '2 a 4 días hábiles dentro de Mérida',
  notes: '...',
};
```
Mientras `flatRate` sea `null`, el sitio mostrará "Se confirma por
WhatsApp" en vez de un precio de envío.

### Editar el FAQ
En `src/data/siteConfig.js`, edita la lista `faqItems` (cada elemento
tiene `q` para la pregunta y `a` para la respuesta).

### Editar la política de cambios
En `src/data/siteConfig.js`, edita el objeto `exchangePolicy`. Debe
completarse **antes de aceptar pedidos reales** (ver checklist al
final de este documento).

---

## 4. Cómo construir el sitio (build)

Antes de subir el sitio, o si quieres previsualizar la versión final:
```
npm run build
```
Esto genera una carpeta `dist/` lista para publicar. Netlify hace este
paso automáticamente — normalmente no necesitas correrlo tú mismo.

---

## 5. Cómo desplegar (deploy) a Netlify

**Opción A — arrastrar y soltar (la más simple):**
1. Corre `npm run build` en tu computadora.
2. Entra a [app.netlify.com](https://app.netlify.com) → "Add new site" →
   "Deploy manually".
3. Arrastra la carpeta `dist/` generada.

**Opción B — conectar el proyecto (recomendada a largo plazo):**
1. Sube este proyecto a un repositorio (GitHub, GitLab o Bitbucket) —
   opcional, no es obligatorio para el sitio funcione.
2. En Netlify, "Add new site" → "Import an existing project" → conecta
   el repositorio.
3. Netlify detectará automáticamente:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   (ya están configurados en `netlify.toml`, no necesitas escribirlos).

---

## 6. Dónde se configuran las variables de entorno en Netlify

1. En el panel de Netlify, entra a tu sitio → **Site configuration**
   → **Environment variables**.
2. Agrega cada variable de `.env.example` con su valor real:
   `OPENPAY_MERCHANT_ID`, `OPENPAY_PRIVATE_KEY`, `OPENPAY_PUBLIC_KEY`,
   `OPENPAY_PRODUCTION_MODE`.
3. Vuelve a publicar el sitio (Netlify → "Trigger deploy") para que los
   cambios tomen efecto.

**Nunca** pegues estas claves dentro de los archivos del proyecto —
solo van en el panel de Netlify.

---

## 7. Modo sandbox y producción de Openpay

- Mientras `OPENPAY_PRODUCTION_MODE=sandbox`, cualquier "pago" es de
  prueba y no mueve dinero real. Úsalo para probar todo el flujo de
  compra.
- Solo cambia `OPENPAY_PRODUCTION_MODE` a `production` cuando:
  1. Hayas completado la integración real en
     `netlify/functions/create-order.js` (ver sección 9), y
  2. Hayas probado pagos exitosos y fallidos en modo sandbox.

---

## 8. Qué partes son DEMO y deben configurarse antes de vender

- **Todos los productos** en `src/data/products.js` están marcados como
  demo (`MSK-DEMO-00X`) con precio en `0`. Debes reemplazarlos por tu
  catálogo real.
- **El pago** está en modo demo: el checkout funciona de principio a
  fin, pero ningún cargo real se procesa todavía (ver sección 9).
- **El costo de envío** no está definido (`flatRate: null`).
- **La política de cambios** tiene un texto de marcador de posición.
- **El inventario** se administra a mano en `products.js` (ver la nota
  en la sección "Actualizar el inventario" arriba).

---

## 9. Cómo funciona hoy el pago, y qué falta para activarlo

El checkout de Maskaritas ya recopila los datos del cliente, la
dirección de entrega y muestra el resumen del pedido. Al enviar el
formulario, llama a una función segura en el servidor
(`netlify/functions/create-order.js`) en vez de manejar cualquier dato
de pago directamente en el navegador — así se evita exponer claves
secretas.

Ahora mismo esa función está en **modo demo**: confirma el pedido sin
cobrar nada real. Dentro del archivo hay una lista numerada de los
pasos exactos (`TODO`) para conectar Openpay de verdad: leer las
credenciales desde las variables de entorno, crear el cargo con la
API de Openpay, y devolver el resultado real al checkout. No se
inventó ninguna integración falsa — se dejó claramente marcada para
que un desarrollador la complete cuando tengan las credenciales.

Como alternativa temporal mientras tanto, pueden usar un **Payment
Link** hospedado por Openpay (un enlace de pago que ustedes generan
desde su panel de Openpay) y compartirlo por WhatsApp o correo para
los primeros pedidos, sin necesidad de terminar la integración técnica.

---

## 10. Números de pedido

El número de pedido (formato `MSK-2026-0001`) se genera actualmente en
el navegador del cliente, solo para mostrarlo en la pantalla de
confirmación. **No es un sistema de numeración confiable a largo
plazo** — dos personas podrían recibir números parecidos o repetidos.
Cuando conecten un backend o base de datos real (ver limitaciones de
inventario arriba), ese sistema debería generar el número de pedido
oficial.

---

## 11. Carrito

El carrito (bolsa) se guarda en el navegador del cliente
(`localStorage`) para que no se pierda si recarga la página. Solo
guarda producto, talla y cantidad — nunca información de pago.

---

## 12. Checklist antes de aceptar pedidos reales

- [ ] Reemplazar los productos demo por el catálogo real
- [ ] Subir fotografía real de producto
- [ ] Ingresar precios reales
- [ ] Ingresar inventario real
- [ ] Confirmar información de tallas
- [ ] Configurar el envío (`shippingConfig` en `siteConfig.js`)
- [ ] Agregar la política de cambios (`exchangePolicy`)
- [ ] Agregar política de privacidad
- [ ] Agregar términos y condiciones
- [ ] Configurar Openpay (variables de entorno + completar
      `netlify/functions/create-order.js`)
- [ ] Probar el pago en sandbox
- [ ] Probar pagos fallidos
- [ ] Probar el checkout en celular
- [ ] Probar el botón de WhatsApp
- [ ] Probar la confirmación de pedido
- [ ] Revisar el inventario mostrado
- [ ] Configurar el dominio de producción en Netlify
- [ ] Verificar los metadatos de SEO (títulos y descripciones)

---

¿Dudas sobre este proyecto? Todo el contenido editable vive en dos
archivos: `src/data/siteConfig.js` y `src/data/products.js`. Para casi
cualquier cambio del día a día, empieza ahí.

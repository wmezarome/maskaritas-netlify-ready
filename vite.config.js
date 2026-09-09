import { defineConfig } from 'vite';
import { resolve } from 'path';

// Maskaritas is a static multi-page site (no framework) so it stays
// simple to understand, fast to load, and easy to deploy to Netlify.
// Each real HTML file below becomes one page of the site. Two pages —
// collection.html and product.html — are reused for many URLs via the
// redirects in netlify.toml (e.g. /colecciones/halloween all load
// collection.html, which then reads the URL to know what to show).
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        ninos: resolve(__dirname, 'ninos.html'),
        adultos: resolve(__dirname, 'adultos.html'),
        accesorios: resolve(__dirname, 'accesorios.html'),
        pelucas: resolve(__dirname, 'pelucas.html'),
        maquillajeFx: resolve(__dirname, 'maquillaje-fx.html'),
        calzado: resolve(__dirname, 'calzado.html'),
        collection: resolve(__dirname, 'collection.html'),
        product: resolve(__dirname, 'product.html'),
        pedidoEspecial: resolve(__dirname, 'pedido-especial.html'),
        envios: resolve(__dirname, 'envios.html'),
        faq: resolve(__dirname, 'faq.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        confirmacion: resolve(__dirname, 'confirmacion.html'),
      },
    },
  },
});

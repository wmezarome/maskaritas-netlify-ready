import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByCategory } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByCategory('maquillaje-fx'),
  title: 'MAQUILLAJE + FX',
  subtitle: 'Efectos y maquillaje de temporada.',
  showAudienceFilter: true,
});

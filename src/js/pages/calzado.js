import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByCategory } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByCategory('calzado'),
  title: 'CALZADO / CHEMISES',
  subtitle: 'Zapato básico para disfraz, bailable y evento escolar.',
  showAudienceFilter: true,
});

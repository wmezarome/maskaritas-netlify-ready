import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByAudience } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByAudience('ninos'),
  title: 'NIÑOS',
  subtitle: 'Disfraces infantiles en tallas 4 a 12.',
  showAudienceFilter: false,
});

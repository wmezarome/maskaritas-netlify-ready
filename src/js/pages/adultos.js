import { mountChrome } from '../chrome.js';
import { initCatalogPage } from './catalog.js';
import { getProductsByAudience } from '../../data/products.js';

mountChrome();

initCatalogPage({
  mountId: 'catalog-root',
  baseList: getProductsByAudience('adultos'),
  title: 'ADULTOS',
  subtitle: 'Disfraces para adultos en tallas CH, M y G.',
  showAudienceFilter: false,
});

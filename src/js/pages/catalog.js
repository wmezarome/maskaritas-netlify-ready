// MASKARITAS — Shared catalog / listing logic
// ---------------------------------------------------------------
// Every listing page (Shop, Niños, Adultos, Accesorios, Pelucas,
// Maquillaje + FX, Calzado, and each Colección) renders through this
// one module, so filtering, search and empty states behave the same
// way everywhere. A page just tells it which base list of products
// to start from.

import { products, isSoldOut } from '../../data/products.js';
import { productGridHtml } from '../product-card.js';
import { escapeHtml } from '../format.js';

function uniqueSizes(list) {
  const set = new Set();
  list.forEach((p) => p.sizes.forEach((s) => set.add(s)));
  // Keep a sensible order: numeric kids sizes first, then letter sizes.
  return Array.from(set).sort((a, b) => {
    const an = Number(a), bn = Number(b);
    if (!isNaN(an) && !isNaN(bn)) return an - bn;
    if (!isNaN(an)) return -1;
    if (!isNaN(bn)) return 1;
    return a.localeCompare(b);
  });
}

function readParams() {
  return new URLSearchParams(window.location.search);
}

export function initCatalogPage({ mountId, baseList, title, subtitle, showAudienceFilter = true }) {
  const root = document.getElementById(mountId);
  if (!root) return;

  const params = readParams();
  const searchQuery = params.get('q') || '';

  let workingList = searchQuery
    ? products.filter((p) => {
        const haystack = [p.name, p.shortName, p.description, ...(p.tags || [])].join(' ').toLowerCase();
        return haystack.includes(searchQuery.toLowerCase());
      })
    : baseList;

  const sizes = uniqueSizes(workingList);

  const state = {
    audience: params.get('audience') || '',
    size: params.get('talla') || '',
    availability: params.get('disponibilidad') || '',
    sort: params.get('orden') || '',
  };

  if (params.get('filter') === 'nuevo') {
    workingList = workingList.filter((p) => p.newArrival);
  }

  function applyFilters() {
    let list = workingList;
    if (state.audience) list = list.filter((p) => p.audience === state.audience);
    if (state.size) list = list.filter((p) => p.sizes.includes(state.size));
    if (state.availability === 'disponible') list = list.filter((p) => !isSoldOut(p));
    if (state.sort === 'precio-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === 'precio-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function renderGrid() {
    root.querySelector('#catalog-grid').innerHTML = productGridHtml(applyFilters());
    root.querySelector('#catalog-count').textContent = `${applyFilters().length} producto${applyFilters().length === 1 ? '' : 's'}`;
  }

  root.innerHTML = `
    <div class="wrap">
      <div class="catalog-head">
        <p class="section-label">${searchQuery ? 'RESULTADOS DE BÚSQUEDA' : 'CATÁLOGO'}</p>
        <h1 class="display" style="font-size: var(--step-2xl);">${escapeHtml(searchQuery ? `“${searchQuery}”` : title)}</h1>
        ${subtitle ? `<p style="margin-top:var(--space-xs); color: var(--ink-70); max-width:50ch;">${escapeHtml(subtitle)}</p>` : ''}
      </div>

      <div class="catalog-toolbar">
        <button id="filter-toggle" class="btn btn-secondary">FILTROS</button>
        <span id="catalog-count" class="catalog-count"></span>
        <select id="sort-select" aria-label="Ordenar por">
          <option value="">ORDENAR</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div class="catalog-layout">
        <aside class="catalog-filters" id="catalog-filters">
          ${
            showAudienceFilter
              ? `<fieldset>
                  <legend>Niño / Adulto</legend>
                  <label><input type="radio" name="audience" value="" ${!state.audience ? 'checked' : ''}/> Todos</label>
                  <label><input type="radio" name="audience" value="ninos" ${state.audience === 'ninos' ? 'checked' : ''}/> Niños</label>
                  <label><input type="radio" name="audience" value="adultos" ${state.audience === 'adultos' ? 'checked' : ''}/> Adultos</label>
                </fieldset>`
              : ''
          }
          <fieldset>
            <legend>Talla</legend>
            <label><input type="radio" name="size" value="" ${!state.size ? 'checked' : ''}/> Todas</label>
            ${sizes.map((s) => `<label><input type="radio" name="size" value="${escapeHtml(s)}" ${state.size === s ? 'checked' : ''}/> ${escapeHtml(s)}</label>`).join('')}
          </fieldset>
          <fieldset>
            <legend>Disponibilidad</legend>
            <label><input type="radio" name="availability" value="" ${!state.availability ? 'checked' : ''}/> Todos</label>
            <label><input type="radio" name="availability" value="disponible" ${state.availability === 'disponible' ? 'checked' : ''}/> Disponibles</label>
          </fieldset>
        </aside>

        <div class="catalog-results">
          <div class="product-grid" id="catalog-grid"></div>
        </div>
      </div>
    </div>
  `;

  renderGrid();

  root.querySelectorAll('input[name="audience"]').forEach((el) =>
    el.addEventListener('change', (e) => { state.audience = e.target.value; renderGrid(); })
  );
  root.querySelectorAll('input[name="size"]').forEach((el) =>
    el.addEventListener('change', (e) => { state.size = e.target.value; renderGrid(); })
  );
  root.querySelectorAll('input[name="availability"]').forEach((el) =>
    el.addEventListener('change', (e) => { state.availability = e.target.value; renderGrid(); })
  );
  root.querySelector('#sort-select').value = state.sort;
  root.querySelector('#sort-select').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
  root.querySelector('#filter-toggle').addEventListener('click', () => {
    root.querySelector('#catalog-filters').classList.toggle('is-open');
  });
}

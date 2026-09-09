import { mountChrome } from '../chrome.js';
import { whatsappNumber } from '../../data/siteConfig.js';

mountChrome();

const root = document.getElementById('request-root');

root.innerHTML = `
  <div style="max-width: 640px; margin-inline: auto; padding-block: var(--space-lg) var(--space-2xl);">
    <p class="section-label">¿NO LO ENCONTRASTE?</p>
    <h1 class="display" style="font-size: var(--step-2xl);">CAN'T FIND IT?<br>WE'LL TRY TO FIND IT FOR YOU.</h1>
    <p style="margin-top: var(--space-sm); color: var(--ink-70);">
      ¿Buscas un personaje, talla o disfraz que no aparece en nuestro catálogo? Cuéntanos qué necesitas
      y trataremos de conseguirlo especialmente para ti. Los pedidos especiales están sujetos a
      disponibilidad. Recomendamos solicitarlos con al menos 2 semanas de anticipación.
    </p>

    <form id="request-form" class="stack" style="margin-top: var(--space-lg);">
      <div class="field"><label for="rname">Nombre</label><input id="rname" name="rname" required /></div>
      <div class="field"><label for="rphone">WhatsApp</label><input id="rphone" name="rphone" type="tel" required /></div>
      <div class="field"><label for="rwhat">¿Qué disfraz buscas?</label><input id="rwhat" name="rwhat" required /></div>
      <div class="field"><label for="rcharacter">Personaje / descripción</label><textarea id="rcharacter" name="rcharacter" rows="3"></textarea></div>
      <div class="field-row">
        <div class="field">
          <label for="raudience">Niño / Adulto</label>
          <select id="raudience" name="raudience">
            <option value="Niño">Niño</option>
            <option value="Adulto">Adulto</option>
          </select>
        </div>
        <div class="field"><label for="rsize">Talla</label><input id="rsize" name="rsize" /></div>
      </div>
      <div class="field"><label for="rdate">Fecha en que lo necesitas</label><input id="rdate" name="rdate" type="date" /></div>
      <div class="field"><label for="rcomments">Comentarios</label><textarea id="rcomments" name="rcomments" rows="3"></textarea></div>
      <div class="field">
        <label for="rimage">Imagen de referencia (opcional)</label>
        <input id="rimage" name="rimage" type="file" accept="image/*" />
        <span style="font-size: var(--step-2xs); color: var(--ink-70);">La imagen no se sube automáticamente — WhatsApp te permitirá adjuntarla al enviar el mensaje.</span>
      </div>
      <button type="submit" class="btn btn-primary btn-block">SOLICITAR DISFRAZ</button>
    </form>
  </div>
`;

document.getElementById('request-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  const message = [
    'Hola Maskaritas.',
    'Quiero solicitar un disfraz especial.',
    '',
    `Nombre: ${d.rname}`,
    `Tipo: ${d.rwhat}`,
    `Personaje: ${d.rcharacter || '-'}`,
    `Niño/Adulto: ${d.raudience}`,
    `Talla: ${d.rsize || '-'}`,
    `Fecha: ${d.rdate || '-'}`,
    `Comentarios: ${d.rcomments || '-'}`,
  ].join('\n');
  const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});

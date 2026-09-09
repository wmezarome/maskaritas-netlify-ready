// MASKARITAS — netlify/functions/create-order.js
// ---------------------------------------------------------------
// This function runs on Netlify's servers, NOT in the browser — it
// is the only safe place for real Openpay credentials to live
// (as Netlify Environment Variables, never in this file). See
// README.md → "Configurar Openpay" before enabling real payments.
//
// Current behaviour: DEMO MODE. It validates the order shape and
// returns a demo confirmation without charging any card. It does
// NOT read OPENPAY_PRIVATE_KEY yet — that wiring is intentionally
// left as a clearly marked TODO so no half-configured payment path
// can accidentally go live.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { orderId, customer, lines, total } = payload;
  if (!orderId || !customer || !Array.isArray(lines) || typeof total !== 'number') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing order fields' }) };
  }

  const productionMode = process.env.OPENPAY_PRODUCTION_MODE === 'production';
  const hasCredentials = Boolean(
    process.env.OPENPAY_MERCHANT_ID && process.env.OPENPAY_PRIVATE_KEY
  );

  if (!hasCredentials) {
    // Safe default: no credentials configured yet, so no real charge
    // is attempted. The order is still recorded as a DEMO order.
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'demo',
        message: 'Openpay no está configurado todavía. Pedido registrado en modo demo, sin cargo real.',
        orderId,
      }),
    };
  }

  // ---------------------------------------------------------------
  // TODO (before accepting real payments):
  // 1. Read process.env.OPENPAY_MERCHANT_ID / OPENPAY_PRIVATE_KEY here.
  // 2. Call the Openpay API (https://<region>.openpay.mx/v1/<merchant_id>/charges)
  //    to create a charge for `total` MXN using the token sent from
  //    the frontend's Openpay.js integration (not built yet — the
  //    frontend currently only sends order details, no card data).
  // 3. On success, persist the order somewhere durable (a database —
  //    this project ships without one, see README.md limitations)
  //    and return the real Openpay transaction id.
  // 4. On failure, return a 402 with a clear error the checkout page
  //    can show ("tarjeta rechazada", "fondos insuficientes", etc).
  // 5. Only set OPENPAY_PRODUCTION_MODE=production once steps 1–4
  //    are implemented and tested in the Openpay sandbox.
  // ---------------------------------------------------------------

  return {
    statusCode: 501,
    body: JSON.stringify({
      status: 'not_implemented',
      message: productionMode
        ? 'Credenciales de producción detectadas, pero la integración con Openpay aún no está implementada en este archivo.'
        : 'Credenciales de sandbox detectadas, pero la integración con Openpay aún no está implementada en este archivo.',
      orderId,
    }),
  };
};

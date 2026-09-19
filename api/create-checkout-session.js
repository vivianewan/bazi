/**
 * Stripe Checkout Session (Vercel serverless)
 *
 * Env vars on Vercel:
 *   STRIPE_SECRET_KEY=sk_test_... or sk_live_...
 *
 * Optional:
 *   SITE_URL=https://vivianewan.github.io/bazi
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({
      error: 'STRIPE_SECRET_KEY is not set on the server'
    });
  }

  try {
    const { items, successUrl, cancelUrl } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const origin = req.headers.origin || process.env.SITE_URL || 'http://localhost:8765';
    const success = successUrl || `${origin}/success.html`;
    const cancel = cancelUrl || origin;

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', `${success}?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', cancel);
    params.append('billing_address_collection', 'required');
    params.append('shipping_address_collection[allowed_countries][0]', 'US');
    params.append('shipping_address_collection[allowed_countries][1]', 'CA');
    params.append('shipping_address_collection[allowed_countries][2]', 'GB');
    params.append('shipping_address_collection[allowed_countries][3]', 'AU');
    params.append('shipping_address_collection[allowed_countries][4]', 'SG');
    params.append('shipping_address_collection[allowed_countries][5]', 'HK');
    params.append('shipping_address_collection[allowed_countries][6]', 'CN');
    params.append('shipping_address_collection[allowed_countries][7]', 'JP');

    items.forEach((item, i) => {
      const name = String(item.name || 'Bracelet material').slice(0, 120);
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const unitAmount = Math.round(Number(item.price) * 100);
      if (!Number.isFinite(unitAmount) || unitAmount < 50) {
        throw new Error(`Invalid price for ${name}`);
      }
      params.append(`line_items[${i}][quantity]`, String(quantity));
      params.append(`line_items[${i}][price_data][currency]`, 'usd');
      params.append(`line_items[${i}][price_data][unit_amount]`, String(unitAmount));
      params.append(`line_items[${i}][price_data][product_data][name]`, name);
      if (item.image && String(item.image).startsWith('http')) {
        params.append(`line_items[${i}][price_data][product_data][images][0]`, String(item.image));
      }
    });

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error('Stripe error', data);
      return res.status(502).json({
        error: data.error?.message || 'Stripe checkout failed'
      });
    }

    return res.status(200).json({ id: data.id, url: data.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Checkout error' });
  }
}

'use strict';

const { fetchProducts } = require('../lib/product-service');

module.exports = async function catalog(request, response) {
  if (request.method && request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const products = await fetchProducts();
    response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, must-revalidate');
    response.status(200).json({
      success: true,
      currency: 'PHP',
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Unable to load catalog price list:', error);
    response.setHeader('Cache-Control', 'no-store');
    response.status(502).json({
      success: false,
      message: 'The catalog is temporarily unavailable. Please try again shortly.',
    });
  }
};

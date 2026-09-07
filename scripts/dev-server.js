'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const START_PORT = Number(process.env.PORT) || 8000;
const apiRoutes = new Map([
  ['/api/catalog', require('../api/catalog')],
  ['/api/product', require('../api/product')],
  ['/collection', require('../api/product')],
  ['/share', require('../api/share')],
]);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function enhanceResponse(response) {
  response.status = code => { response.statusCode = code; return response; };
  response.json = body => {
    if (!response.headersSent) response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(body));
  };
  response.send = body => response.end(body);
  return response;
}

async function routeApi(handler, url, request, response) {
  request.query = Object.fromEntries(url.searchParams.entries());
  try {
    await handler(request, enhanceResponse(response));
  } catch (error) {
    console.error(error);
    if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Local server error.');
  }
}

function staticPath(pathname) {
  let relative = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!relative) relative = 'index.html';
  if (relative.endsWith('/')) relative += 'index.html';
  const target = path.resolve(ROOT, relative);
  if (!target.startsWith(ROOT)) return null;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  if (!path.extname(target) && fs.existsSync(`${target}.html`)) return `${target}.html`;
  return null;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const route = url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : url.pathname;
  const handler = apiRoutes.get(route);
  if (handler) {
    routeApi(handler, url, request, response);
    return;
  }

  const target = staticPath(url.pathname);
  if (!target) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = path.extname(target).toLowerCase();
  const headers = { 'Content-Type': mimeTypes[extension] || 'application/octet-stream' };
  if (['.png', '.svg', '.webp', '.ico'].includes(extension)) {
    headers['Cache-Control'] = 'public, max-age=86400, must-revalidate';
  }
  response.writeHead(200, headers);
  fs.createReadStream(target).pipe(response);
});

function listen(port) {
  server.once('error', error => {
    if (['EADDRINUSE', 'EACCES'].includes(error.code) && port < START_PORT + 20) {
      listen(port + 1);
      return;
    }
    throw error;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Pangasinan Blades local server: http://localhost:${port}`);
  });
}

listen(START_PORT);

const http2 = require('http2');
const { parse } = require('url');
const fs = require('fs');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Init the Next app:
const app = next({ dev });
const handle = app.getRequestHandler();

// Create the secure HTTPS server:
// Don't forget to create the keys for your development
const server = http2.createSecureServer({
  key: fs.readFileSync('./certificates/localhost-private-key.pem'),
  cert: fs.readFileSync('./certificates/localhost-cert.pem')
});

app.prepare().then(() => {
  server.on('error', err => console.error(err));

  server.on('request', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port);

  console.log(`Listening on HTTPS port ${port}`);
});

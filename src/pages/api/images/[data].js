export default function handler(req, res) {
  // Mock Cloudfront Image Handler
  const { key } = JSON.parse(Buffer.from(req.query.data, 'base64').toString());
  res.status(200).redirect(301, `/${key}`);
}

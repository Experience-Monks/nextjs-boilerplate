export default function StrictCSP() {
  let csp = `default-src 'self'; script-src 'self';`;
  if (process.env.NODE_ENV !== 'production') {
    csp = `
      default-src 'self';
      manifest-src 'self';
      base-uri 'self';
      form-action 'self';
      font-src 'self' data: 'unsafe-inline';
      object-src 'none';
      media-src 'self';
      img-src 'self' blob: data:;
      connect-src 'self' www.google-analytics.com;
      prefetch-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com www.google-analytics.com www.google.com www.gstatic.com;
      style-src-elem 'self' blob: data: 'unsafe-inline';
      style-src 'self' blob: data: 'unsafe-inline';
    `;
  }

  return <meta httpEquiv="Content-Security-Policy" content={csp} />;
}

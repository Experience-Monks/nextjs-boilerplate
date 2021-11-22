/**
 * NOTE:
 * This ContentSecurityPolicy allows frontend developers to experience with Jam3 CSP rules in local environment.
 * The benefit is that frontend developer can identify what CSP problems will occur in the live environment in advance.
 * When modifying CSP content below, please tell TA or Devops developer in the project to update the Security Header lambda@Edge function.
 */
export default function ContentSecurityPolicy() {
  const content = `
    default-src
      'self';
    manifest-src
      'self';
    base-uri
      'self';
    form-action
      'self';
    font-src
      'self'
      data:
      'unsafe-inline';
    object-src
      'none';
    media-src
      'self';
    img-src
      'self'
      blob:
      data:;
    connect-src
      'self'
      www.google-analytics.com;
    prefetch-src
      'self';
    script-src
      'self'
      'unsafe-eval'
      'unsafe-inline'
      www.googletagmanager.com
      www.google-analytics.com
      www.google.com www.gstatic.com;
    style-src-elem
      'self'
      blob:
      data:
      'unsafe-inline';
    style-src
      'self'
      blob:
      data:
      'unsafe-inline';
  `.replace(/(\r\n|\n|\r)/gm, '');

  return <meta httpEquiv="Content-Security-Policy" content={content} />;
}

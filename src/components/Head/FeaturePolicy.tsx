/**
 * NOTE:
 * Jam3 Security Header Lambda@Edge function includes the same Feature Policy content below.
 * The benefit of having this rules in local environment is that frontend developer can identify what problems will occur in the live environment in advance.
 * When modifying Feature Policy content below, please tell TA or Devops developer in the project to update the Security Header lambda@Edge function.
 */
export default function FeaturePolicy() {
  const content = `
    sync-xhr
      'none';
    geolocation
      'none';
    midi
      'none';
    payment
      'none';
    camera
      'none';
    usb
      'none';
    fullscreen
      'none';
    magnetometer
      'none';
    picture-in-picture
      'none';
    accelerometer
      'none';
    autoplay
      'none';
    document-domain
      'none';
    encrypted-media
      'none';
    gyroscope
      'none';
    xr-spatial-tracking
      'none';
    microphone
      'none';
  `.replace(/(\r\n|\n|\r)/gm, '');

  return <meta httpEquiv="Feature-Policy" content={content} />;
}

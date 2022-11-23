import React from 'react';
import { device } from '@jam3/detect';

if (process.env.NODE_ENV === 'development' && device.browser) {
  // Dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  // Call WDYR
  whyDidYouRender(React, { trackAllPureComponents: true, exclude: [/^AppAdmin/] });
}

import React from 'react';
import { device } from '@jam3/detect';

import { isDev } from '@/data/settings';

if (isDev && device.browser) {
  // Dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  // Call WDYR
  whyDidYouRender(React, { trackAllPureComponents: true });
}

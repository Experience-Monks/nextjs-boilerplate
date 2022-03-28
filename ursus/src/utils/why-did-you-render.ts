import React from 'react';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  // Call WDYR
  whyDidYouRender(React, { trackAllPureComponents: true });
}

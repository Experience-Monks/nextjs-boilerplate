/// <reference types="next" />
/// <reference types="next/types/global" />

// next-optimized-images
// all extensions in `handleImages` of the `next.config.js` file
declare module '*.jpeg' {
  const url: string;
  export default url;
}
declare module '*.png' {
  const url: string;
  export default url;
}
declare module '*.webp' {
  const url: string;
  export default url;
}
declare module '*.gif' {
  const url: string;
  export default url;
}

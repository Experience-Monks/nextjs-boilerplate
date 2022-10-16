export type OptmizedImageEdits = {
  // https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/welcome.html
  smartCrop?: boolean | { faceIndex?: number; padding?: number };
  roundCrop?: boolean | { rx?: number; ry?: number; top?: number; left?: number };
  contentModeration?: boolean | { minConfidence?: number; blur?: number; moderationLabels?: string[] };
  // https://sharp.pixelplumbing.com/api-operation
  resize?: {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    kernel?: 'nearest' | 'cubic' | 'mitchell' | 'lanczos2' | 'lanczos3';
    gravity?: 'north' | 'northeast' | 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'center';
    position?: 'top' | 'right top' | 'right' | 'right bottom' | 'bottom' | 'left bottom' | 'left' | 'left top';
    strategy?: 'entropy' | 'attention';
  };
  rotate?: number;
  flip?: boolean;
  flop?: boolean;
  sharpen?: number | { sigma: number; m1?: number; m2?: number; x1?: number; y2?: number; y3?: number };
  median?: number;
  blur?: number;
  flatten?: { background: string | { r: number; g: number; b: number } };
  gamma?: number;
  negate?: boolean;
  normalise?: boolean;
  normalize?: boolean;
  clahe?: { width?: number; height?: number; maxSlope?: number };
  convolve?: { width?: number; height?: number; kernel?: number[]; scale?: number; offset?: number };
  threshold?: number;
  recomb?: number[][];
  modulate?: { brightness?: number; saturation?: number; hue?: number; lightness?: number };
  tint?: string | { r: number; g: number; b: number };
  grayscale?: boolean;
  greyscale?: boolean;
  pipelineColorspace?: string;
  toColourspace?: string;
  toColorspace?: string;
  removeAlpha?: boolean;
  ensureAlpha?: number;
  extractChannel?: 'red' | 'green' | 'blue' | 'alpha';
  bandbool?: 'and' | 'or' | 'eor';
};

function getOptimizedImageURL(src: string, edits?: OptmizedImageEdits) {
  if (
    process.env.STORYBOOK ||
    !src.startsWith('/') ||
    // https://github.com/aws-solutions/serverless-image-handler/issues/340#issuecomment-1047953569
    src.toLowerCase().endsWith('.gif')
  ) {
    return src;
  }

  let settings = JSON.stringify({ key: `${src.replace(/\//, '')}`, edits });

  // https://stackoverflow.com/a/36941639
  // Base64 will add a / if we have a question mark in a position divisible by three.
  // This would break the generated route. So we add a space after the first "{" so the question mark shifts one position.
  if (settings.indexOf('?') % 3 === 2) settings = settings.replace('{', '{ ');

  const settingsBase64 = Buffer.from(settings, 'utf8').toString('base64');
  const prefix = process.env.NODE_ENV === 'development' ? '/api/images/' : '/images/';
  return prefix + settingsBase64;
}

export default getOptimizedImageURL;

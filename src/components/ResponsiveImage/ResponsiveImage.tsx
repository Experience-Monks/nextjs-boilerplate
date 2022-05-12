import { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import classnames from 'classnames';

import styles from './ResponsiveImage.module.scss';

export enum SrcOptionsFitment {
  COVER = 'cover',
  CONTAIN = 'contain',
  FILL = 'fill',
  INSIDE = 'inside',
  OUTSIDE = 'outside'
}

export type SrcOptions = {
  width?: number;
  height?: number;
  fit?: SrcOptionsFitment;
};

export type Props = {
  className?: string;
  src: string;
  srcOptions?: SrcOptions;
  srcSetOptions?: [SrcOptions];
  sizes?: string;
  alt?: string;
};

export function getOptimizedImageURL(localSrc: string, options?: SrcOptions) {
  if (
    // required env variables are missing, fallback to local src
    !process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_BUCKET ||
    !process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_CDN ||
    // responsive options are missing, fallback to local src
    !options
  ) {
    return localSrc;
  }

  // API expects no leading slash
  const localSrcNoLeadingSlash = localSrc.replace(/\//, '');

  // build the API string
  const apiImgStr = JSON.stringify({
    bucket: process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_BUCKET,
    key: localSrcNoLeadingSlash,
    edits: {
      resize: options
        ? {
            width: options.width,
            height: options.height,
            fit: options.fit
          }
        : {}
    }
  });

  // encode the API string into base 64
  const base64ApiStr = Buffer.from(apiImgStr, 'utf8').toString('base64');

  // append the encoded string to the domain for final image API URL
  const apiSrc = process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_CDN + base64ApiStr;

  return apiSrc;
}

const ResponsiveImage = (
  { className, src, srcOptions, srcSetOptions, sizes, alt }: Props,
  ref: ForwardedRef<HTMLImageElement>
) => {
  const finalSrc = useMemo(() => getOptimizedImageURL(src, srcOptions), [src, srcOptions]);

  const finalSrcSet = useMemo(() => {
    if (
      // required env variables are missing, fallback to disabling srcset and sizes
      !process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_BUCKET ||
      !process.env.NEXT_PUBLIC_SERVERLESS_IMAGE_HANDLER_CDN ||
      // options for serverless image handler not specified, fallback to disabling srcset and sizes
      !srcSetOptions
    ) {
      return undefined;
    }

    const srcSet = srcSetOptions.reduce(
      (srcset, option) => `${srcset} ${getOptimizedImageURL(src, option)} ${option.width}w, `,
      ''
    );
    // remove leading/trailing space and comma
    return srcSet.trim().replace(/[,]$/g, '');
  }, [src, srcSetOptions]);

  return (
    <img
      className={classnames(styles.ResponsiveImage, className)}
      src={finalSrc}
      srcSet={finalSrcSet}
      sizes={sizes}
      alt={alt}
      ref={ref}
    />
  );
};

export default memo(forwardRef(ResponsiveImage));

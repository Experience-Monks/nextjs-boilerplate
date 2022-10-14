import { forwardRef, ImgHTMLAttributes, memo, useEffect, useMemo, useRef, useState } from 'react';
import { StaticImageData } from 'next/image';
import classNames from 'classnames';
import noop from 'no-op';

import css from './BaseImage.module.scss';

import useCombinedRefs from '@/hooks/use-combined-refs';
import getOptimizedImageURL, { OptmizedImageEdits } from '@/utils/get-optimized-image-url';

export interface BaseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  // supports both src (for public images) or data (for imported images)
  src?: string;
  data?: StaticImageData;
  // ---
  options?: OptmizedImageEdits;
  srcWidths?: number[];
  fetchpriority?: 'high' | 'low' | 'auto';
  skipOptimization?: boolean;
  onLoad?: () => void;
}

const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
  (
    {
      src,
      data,
      style,
      options,
      className,
      alt = '',
      decoding = 'async',
      srcWidths,
      skipOptimization = false,
      onLoad = noop,
      ...props
    },
    ref
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const [size, setSize] = useState('1px');
    const [loaded, setLoaded] = useState(false);

    const rootRef = useRef<HTMLImageElement>(null);
    const combinedRef = useCombinedRefs(ref, rootRef);

    const imgSrc = useMemo(() => (data?.src || src)!, [data, src]);

    const shouldGetOptimizedUrl = useMemo(
      () => !skipOptimization && imgSrc.startsWith('/') && !imgSrc.toLowerCase().endsWith('gif'),
      [imgSrc, skipOptimization]
    );

    const optimizedSrc = useMemo(() => {
      return shouldGetOptimizedUrl ? getOptimizedImageURL(imgSrc, options) : imgSrc;
    }, [imgSrc, shouldGetOptimizedUrl, options]);

    const imgSrcWidths = useMemo(() => {
      if (!imgSrc) return [];
      if (data?.width) {
        if (srcWidths) return srcWidths?.filter((w) => w <= data.width);
        const base = 320;
        if (data.width < base) return [];
        const hops = Math.floor(data.width / base);
        const sizes = [...Array(hops)].map((_, i) => (i + 1) * base);
        return Array.from(new Set([data.width, ...sizes])).sort((a, b) => (a > b ? 1 : -1));
      }
      return srcWidths || [320, 640, 960, 1280, 1600, 1920];
    }, [imgSrc, data, srcWidths]);

    const optimizedSrcSet = useMemo(() => {
      if (!shouldGetOptimizedUrl || !imgSrcWidths.length || options?.resize) return undefined;
      const opt = options || {};
      return imgSrcWidths
        .map((w) => {
          const o = { ...opt, resize: { ...opt.resize, width: w } };
          const url = getOptimizedImageURL(imgSrc, o);
          return `${url} ${w}w`;
        })
        .join(', ');
    }, [shouldGetOptimizedUrl, imgSrcWidths, options, imgSrc]);

    useEffect(() => {
      const root = rootRef.current!;
      let observer: ResizeObserver;
      if (imgSrcWidths.length && window.ResizeObserver) {
        observer = new ResizeObserver(() => {
          const matchedWidth = imgSrcWidths.find((s) => s >= root.clientWidth);
          if (matchedWidth) setSize(`${matchedWidth}px`);
        });
        observer.observe(root);
      }
      return () => {
        observer?.unobserve(root);
      };
    }, [imgSrcWidths]);

    useEffect(() => {
      const img = rootRef.current!;
      const handleLoad = () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('loadedmetadata', handleLoad);
        setLoaded(true);
        onLoad();
      };
      if (!loaded && optimizedSrc) {
        const loaded = Boolean(img.complete);
        if (loaded) {
          setLoaded(true);
          onLoad();
        } else {
          img.addEventListener('load', handleLoad);
          img.addEventListener('loadedmetadata', handleLoad);
        }
      }
      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('loadedmetadata', handleLoad);
      };
    }, [optimizedSrc, loaded, onLoad]);

    return (
      <img
        className={classNames('BaseImage', css.root, className)}
        decoding={decoding}
        srcSet={optimizedSrcSet}
        style={style}
        src={optimizedSrc}
        ref={combinedRef}
        alt={alt}
        sizes={size}
        {...(data ? { width: `${data.width}px`, height: `${data.height}px` } : {})}
        {...props}
      />
    );
  }
);

BaseImage.displayName = 'BaseImage';

export default memo(BaseImage);

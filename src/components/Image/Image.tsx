import { memo, forwardRef, useMemo, ForwardedRef } from 'react';
import classnames from 'classnames';

import styles from './Image.module.scss';
import sassVars from '../../styles/export-vars.module.scss';

import { Breakpoints } from '../../utils/layout';
import { useAppSelector } from '../../redux';

type Props = {
  className?: string;
  imageObj: { file: string; alt: string };
  loadingType?: 'lazy' | 'eager' | undefined;
  sizes?: Partial<Breakpoints>;
};

const DEFAULT_SIZES = {
  desktopLg: '100vw',
  desktopMd: '100vw',
  desktopSm: '100vw',
  tablet: '100vw',
  mobile: '100vw'
};

const Image = forwardRef(
  ({ className, imageObj, loadingType = 'lazy', sizes = {} }: Props, ref: ForwardedRef<HTMLImageElement>) => {
    const { file, alt } = imageObj;
    const isWebpSupported = useAppSelector((state) => state.isWebpSupported);

    const { src, srcSet } = useMemo(() => {
      const extension = file.split('.').pop();

      // optimizes using regular next-optimized-images plugins
      const src = require(`../../assets/images/${file}`);

      // `responsive-loader` sizes does not support gifs
      if (extension === 'gif') {
        return { src };
      }

      // optimizes/resizes using `responsive-loader` plugin because of sizes attribute
      const multipleWebp = require(`../../assets/images/${file}?{sizes:[320,640,960,1280,1600,1920,2240,2560,2880,3200,3520,3840], format: 'webp'}`);
      const multipleOrig = require(`../../assets/images/${file}?{sizes:[320,640,960,1280,1600,1920,2240,2560,2880,3200,3520,3840]}`);

      const srcSet = isWebpSupported ? multipleWebp.srcSet : multipleOrig.srcSet;

      return { src, srcSet };
    }, [isWebpSupported, file]);

    const { desktopLg, desktopMd, desktopSm, tablet, mobile } = { ...DEFAULT_SIZES, ...sizes };

    return (
      <img
        className={classnames(styles.Image, className)}
        ref={ref}
        srcSet={srcSet}
        src={src}
        alt={alt}
        decoding="async"
        loading={loadingType}
        sizes={
          srcSet &&
          `(min-width: ${sassVars.layoutDesktopLg}) ${desktopLg}, (min-width: ${sassVars.layoutDesktopMd}) ${desktopMd}, (min-width: ${sassVars.layoutDesktopSm}) ${desktopSm}, (min-width: ${sassVars.layoutTablet}) ${tablet}, ${mobile}`
        }
      />
    );
  }
);

export default memo(Image);

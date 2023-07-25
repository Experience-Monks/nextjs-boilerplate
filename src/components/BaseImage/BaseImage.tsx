import { forwardRef, ImgHTMLAttributes, memo, useEffect, useMemo, useRef, useState } from 'react'
import { StaticImageData } from 'next/image'
import classNames from 'classnames'

import css from './BaseImage.module.scss'

import { noop } from '@/utils/basic-functions'
import getOptimizedImageURL, { OptmizedImageEdits } from '@/utils/get-optimized-image-url'

import useCombinedRefs from '@/hooks/use-combined-refs'

import assetImports from '#/asset-imports'
import publicImageSizes from '#/public-image-sizes.json'

export interface BaseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  data?: StaticImageData
  options?: OptmizedImageEdits
  srcWidths?: number[]
  fetchpriority?: 'high' | 'low' | 'auto'
  skipOptimization?: boolean
  onLoad?: () => void
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
  ) => {
    const [size, setSize] = useState('1px')
    const [loaded, setLoaded] = useState(false)

    const rootRef = useRef<HTMLImageElement>(null)
    const combinedRef = useCombinedRefs(ref, rootRef)

    const imgData = useMemo<StaticImageData | undefined>(() => {
      if (data) return data
      if (src) {
        if (assetImports[src]) return assetImports[src] as unknown as StaticImageData
        const s = src.split('?')[0].split('#')[0]
        const p = publicImageSizes as { [key: string]: { width: number; height: number } | undefined }
        const publicSize = p[src] || p[s]
        if (publicSize) return { src, ...publicSize }
      }
      return undefined
    }, [data, src])

    const imgSrc = useMemo(() => (imgData?.src || src)!, [imgData, src])

    const optimize = useMemo(
      () => !skipOptimization && imgSrc.startsWith('/') && !imgSrc.toLowerCase().endsWith('gif'),
      [imgSrc, skipOptimization]
    )

    const optimizedSrc = useMemo(() => {
      return optimize ? getOptimizedImageURL(imgSrc, options) : imgSrc
    }, [imgSrc, optimize, options])

    const imgSrcWidths = useMemo(() => {
      if (!imgSrc) return []
      if (imgData?.width) {
        if (srcWidths) return srcWidths?.filter((w) => w <= imgData.width)
        const base = 320
        if (imgData.width < base) return []
        const hops = Math.floor(imgData.width / base)
        const sizes = [...Array(hops)].map((_, i) => (i + 1) * base)
        return Array.from(new Set([imgData.width, ...sizes])).sort((a, b) => (a > b ? 1 : -1))
      }
      return srcWidths || [320, 640, 960, 1280, 1600, 1920]
    }, [imgSrc, imgData, srcWidths])

    const optimizedSrcSet = useMemo(() => {
      if (!optimize || !imgSrcWidths.length || options?.resize) return undefined
      const opt = options || {}
      return imgSrcWidths
        .map((w) => {
          const o = { ...opt, resize: { ...opt.resize, width: w } }
          const url = getOptimizedImageURL(imgSrc, o)
          return `${url} ${w}w`
        })
        .join(', ')
    }, [optimize, imgSrcWidths, options, imgSrc])

    useEffect(() => {
      const root = rootRef.current!
      let observer: ResizeObserver
      if (imgSrcWidths.length && window.ResizeObserver) {
        observer = new ResizeObserver(() => {
          const elSize = root.clientWidth
          const curSize = imgSrcWidths.find((s) => s >= elSize)
          if (curSize) setSize(`${curSize}px`)
        })
        observer.observe(root)
      }
      return () => {
        observer?.unobserve(root)
      }
    }, [imgSrcWidths])

    useEffect(() => {
      const img = rootRef.current!
      const handleLoad = () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('loadedmetadata', handleLoad)
        setLoaded(true)
        onLoad()
      }
      if (!loaded && optimizedSrc) {
        const loaded = Boolean(img.complete)
        if (loaded) {
          setLoaded(true)
          onLoad()
        } else {
          img.addEventListener('load', handleLoad)
          img.addEventListener('loadedmetadata', handleLoad)
        }
      }
      return () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('loadedmetadata', handleLoad)
      }
    }, [optimizedSrc, loaded, onLoad])

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
        {...(imgData ? { width: `${imgData.width}px`, height: `${imgData.height}px` } : {})}
        {...props}
      />
    )
  }
)

BaseImage.displayName = 'BaseImage'

export default memo(BaseImage)

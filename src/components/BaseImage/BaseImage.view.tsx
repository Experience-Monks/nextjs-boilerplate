import type { StaticImageData } from 'next/image'
import type { ControllerProps } from './BaseImage.controller'

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import css from './BaseImage.module.scss'

import { noop } from '@/utils/basic-functions'
import getOptimizedImageURL from '@/utils/get-optimized-image-url'

import useCombinedRefs from '@/hooks/use-combined-refs'

import imageImports from '#/image-imports'
import publicImageSizes from '#/public-image-sizes.json'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View = forwardRef<HTMLImageElement, ViewProps>(
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
      allowRetina = true,
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
        if (imageImports[src]) return imageImports[src] as unknown as StaticImageData
        const s = src.split('?')[0].split('#')[0]
        const p = publicImageSizes as { [key: string]: { width: number; height: number } | undefined }
        const publicSize = p[src] || p[s]
        if (publicSize) return { src, ...publicSize }
      }
      return
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
        if (imgData.width < 32) return []
        const base = imgData.width > 320 ? 320 : 32
        const hops = Math.floor(imgData.width / base)
        const sizes = Array.from({ length: hops }).map((_, i) => (i + 1) * base)
        return [...new Set([imgData.width, ...sizes])].sort((a, b) => (a > b ? 1 : -1))
      }
      return srcWidths || [64, 128, 320, 640, 960, 1280, 1600, 1920]
    }, [imgSrc, imgData, srcWidths])

    const optimizedSrcSet = useMemo(() => {
      if (!optimize || imgSrcWidths.length === 0 || options?.resize) return
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
      if (imgSrcWidths.length > 0 && window.ResizeObserver) {
        observer = new ResizeObserver(() => {
          const elSize = root.clientWidth
          const curSize = imgSrcWidths.find((s) => s >= elSize) || elSize
          if (curSize) setSize(`${curSize / (allowRetina ? 1 : window.devicePixelRatio || 1)}px`)
        })
        observer.observe(root)
      } else if (imgSrc) {
        setSize('2px')
      }
      return () => {
        observer?.unobserve(root)
      }
    }, [allowRetina, imgSrc, imgSrcWidths])

    useEffect(() => {
      const img = rootRef.current!
      const handleLoad = () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('loadedmetadata', handleLoad)
        setLoaded(true)
        onLoad()
      }
      if (!loaded && optimizedSrc && size !== '1px') {
        const imgLoaded = Boolean(img.complete)
        if (imgLoaded) {
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
    }, [optimizedSrc, loaded, onLoad, size])

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

View.displayName = 'BaseImage_View'

import { sass } from '@/utils/sass'

export const ssrLayout = {
  mobile: false,
  tablet: false,
  desktop: true
}

export function getLayout() {
  if (typeof document !== 'undefined') {
    const matchTablet = window.matchMedia(`(min-width: ${sass['breakpoint-tablet']}px)`)
    const matchDesktop = window.matchMedia(`(min-width: ${sass['breakpoint-desktop']}px)`)

    const desktop = matchDesktop.matches
    const tablet = matchTablet.matches && !desktop
    const mobile = !tablet && !desktop

    return {
      mobile,
      tablet,
      desktop
    }
  }
  return ssrLayout
}

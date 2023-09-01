/* Instructions
1. the name will be added to gsap CustomEase
   // GSAP
   gsap.to('.my-element', { duration: 1, ease: 'name' })

2. description is just for storybook
3. update the vars.scss file if you need these eases for css animations
*/

interface CustomEase {
  name: string // name that will work with gsap CustomEase
  ease: string // '0.81, 0, 0, 0.91'
  description?: string // 'For opacity' helpful description for storybook or keep empty
}

export const customEases = [
  {
    name: 'translateIn',
    ease: '0.55, 0.055, 0.675, 0.19',
    description: 'For translate In'
  },
  {
    name: 'translateOut',
    ease: '0.25, 0.46, 0.45, 0.94',
    description: 'For translate Out'
  },
  {
    name: 'opacityIn',
    ease: '0.47, 0, 0.745, 0.715',
    description: 'For opacity In'
  },
  {
    name: 'opacityOut',
    ease: '0.19, 1, 0.22, 1',
    description: 'For opacity Out'
  },
  {
    name: 'swipeIn',
    ease: '0.895, 0.03, 0.685, 0.22',
    description: 'For swipe / clip-path In'
  },
  {
    name: 'swipeOut',
    ease: '0.19, 1, 0.22, 1',
    description: 'For swipe / clip-path Out'
  }
] as CustomEase[]

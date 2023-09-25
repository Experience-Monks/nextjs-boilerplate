/* Instructions
1. the name will be added to gsap CustomEase
   // GSAP
   gsap.to('.my-element', { duration: 1, ease: 'name' })
2. description is just for storybook
3. update the vars.scss file if you need these eases for css animations
*/

export interface EaseDeclaration {
  name: string // name that will work with gsap CustomEase
  ease: string // '0.81, 0, 0, 0.91'
  description?: string // 'For opacity' helpful description for storybook or keep empty
}

export const defaultEases: EaseDeclaration[] = [
  // Linear
  { name: 'none', ease: 'none', description: '' },
  // Sine
  { name: 'sine.in', ease: 'sine.in', description: '' },
  { name: 'sine.out', ease: 'sine.out', description: '' },
  { name: 'sine.inOut', ease: 'sine.inOut', description: '' },
  // Quad
  { name: 'power1.in', ease: 'power1.in', description: '' },
  { name: 'power1.out', ease: 'power1.out', description: '' },
  { name: 'power1.inOut', ease: 'power1.inOut', description: '' },
  // Cubic
  { name: 'power2.in', ease: 'power2.in', description: '' },
  { name: 'power2.out', ease: 'power2.out', description: '' },
  { name: 'power2.inOut', ease: 'power2.inOut', description: '' },
  // Quart
  { name: 'power3.in', ease: 'power3.in', description: '' },
  { name: 'power3.out', ease: 'power3.out', description: '' },
  { name: 'power3.inOut', ease: 'power3.inOut', description: '' },
  // Quint / Strong
  { name: 'power4.in', ease: 'power4.in', description: '' },
  { name: 'power4.out', ease: 'power4.out', description: '' },
  { name: 'power4.inOut', ease: 'power4.inOut', description: '' },
  // Expo
  { name: 'expo.in', ease: 'expo.in', description: '' },
  { name: 'expo.out', ease: 'expo.out', description: '' },
  { name: 'expo.inOut', ease: 'expo.inOut', description: '' },
  // Circ
  { name: 'circ.in', ease: 'circ.in', description: '' },
  { name: 'circ.out', ease: 'circ.out', description: '' },
  { name: 'circ.inOut', ease: 'circ.inOut', description: '' },
  // Back
  { name: 'back.in', ease: 'back.in', description: '' },
  { name: 'back.out', ease: 'back.out', description: '' },
  { name: 'back.inOut', ease: 'back.inOut', description: '' },
  // Elastic
  { name: 'elastic.in', ease: 'elastic.in', description: '' },
  { name: 'elastic.out', ease: 'elastic.out', description: '' },
  { name: 'elastic.inOut', ease: 'elastic.inOut', description: '' },
  // Bounce
  { name: 'bounce.in', ease: 'bounce.in', description: '' },
  { name: 'bounce.out', ease: 'bounce.out', description: '' },
  { name: 'bounce.inOut', ease: 'bounce.inOut', description: '' }
]

export const customEases: EaseDeclaration[] = [
  { name: 'ease1', ease: '0.32, 0.83, 0.6, 1', description: '' },
  { name: 'ease2', ease: '0.32, 0.94, 0.6, 1', description: '' },
  { name: 'ease3', ease: '0.26, 1, 0.48, 1', description: '' },
  { name: 'ease4', ease: '0.17, 0.89, 0.32, 1.27', description: '' },
  { name: 'ease5', ease: '0.9, 0, 0.1, 1', description: '' },
  { name: 'ease6', ease: '0.54, 0, 1, 0.44', description: '' },
  { name: 'ease7', ease: '0.66, 0, 0.34, 1', description: '' },
  { name: 'ease8', ease: '0.64, 0, 0.78, 0', description: '' }
]

export const eases: EaseDeclaration[] = [...customEases, ...defaultEases]

export default eases

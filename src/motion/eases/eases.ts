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
  bezier?: [number, number, number, number] // an approximation curve to be used when only beziers are supported
  description?: string // 'For opacity' helpful description for storybook or keep empty
}

export const standardEases = {
  // Linear
  none: { name: 'none', ease: 'none', description: '' },
  // Sine
  sineIn: { name: 'sine.in', ease: 'sine.in', bezier: [0.12, 0, 0.39, 0], description: '' },
  sineOut: { name: 'sine.out', ease: 'sine.out', bezier: [0.61, 1, 0.88, 1], description: '' },
  sineInOut: { name: 'sine.inOut', ease: 'sine.inOut', bezier: [0.37, 0, 0.63, 1], description: '' },
  // ?
  power1In: { name: 'power1.in', ease: 'power1.in', bezier: [0.426, -0.015, 0.75, 0.529], description: '' },
  power1Out: { name: 'power1.out', ease: 'power1.out', bezier: [0.356, 0.716, 0.693, 0.99], description: '' },
  power1InOut: { name: 'power1.inOut', ease: 'power1.inOut', bezier: [0.459, 0.013, 0.536, 0.973], description: '' },
  // Cubic
  power2In: { name: 'power2.in', ease: 'power2.in', bezier: [0.32, 0, 0.67, 0], description: '' },
  power2Out: { name: 'power2.out', ease: 'power2.out', bezier: [0.33, 1, 0.68, 1], description: '' },
  power2InOut: { name: 'power2.inOut', ease: 'power2.inOut', bezier: [0.65, 0, 0.35, 1], description: '' },
  // Quad
  power3In: { name: 'power3.in', ease: 'power3.in', bezier: [0.5, 0, 0.75, 0], description: '' },
  power3Out: { name: 'power3.out', ease: 'power3.out', bezier: [0.25, 1, 0.5, 1], description: '' },
  power3InOut: { name: 'power3.inOut', ease: 'power3.inOut', bezier: [0.76, 0, 0.24, 1], description: '' },
  // Quint / Strong
  power4In: { name: 'power4.in', ease: 'power4.in', bezier: [0.64, 0, 0.78, 0], description: '' },
  power4Out: { name: 'power4.out', ease: 'power4.out', bezier: [0.22, 1, 0.36, 1], description: '' },
  power4InOut: { name: 'power4.inOut', ease: 'power4.inOut', bezier: [0.83, 0, 0.17, 1], description: '' },
  // Expo
  expoIn: { name: 'expo.in', ease: 'expo.in', bezier: [0.7, 0, 0.84, 0], description: '' },
  expoOut: { name: 'expo.out', ease: 'expo.out', bezier: [0.16, 1, 0.3, 1], description: '' },
  expoInOut: { name: 'expo.inOut', ease: 'expo.inOut', bezier: [0.87, 0, 0.13, 1], description: '' },
  // Circ
  circIn: { name: 'circ.in', ease: 'circ.in', bezier: [0.55, 0, 1, 0.45], description: '' },
  circOut: { name: 'circ.out', ease: 'circ.out', bezier: [0, 0.55, 0.45, 1], description: '' },
  circInOut: { name: 'circ.inOut', ease: 'circ.inOut', bezier: [0.85, 0, 0.15, 1], description: '' },
  // Back
  backIn: { name: 'back.in', ease: 'back.in', bezier: [0.36, 0, 0.66, -0.56], description: '' },
  backOut: { name: 'back.out', ease: 'back.out', bezier: [0.34, 1.56, 0.64, 1], description: '' },
  backInOut: { name: 'back.inOut', ease: 'back.inOut', bezier: [0.68, -0.4, 0.32, 1.4], description: '' },
  // Elastic
  elasticIn: { name: 'elastic.in', ease: 'elastic.in', bezier: [1, -0.1, 0.896, -0.147], description: '' },
  elasticOut: { name: 'elastic.out', ease: 'elastic.out', bezier: [0, 1.25, 0.103, 1.073], description: '' },
  elasticInOut: { name: 'elastic.inOut', ease: 'elastic.inOut', bezier: [0.973, -0.25, 0.025, 1.25], description: '' },
  // Bounce
  bounceIn: { name: 'bounce.in', ease: 'bounce.in', bezier: [1, 0, 0.6, 0.8], description: '' },
  bounceOut: { name: 'bounce.out', ease: 'bounce.out', bezier: [0.28, 0.02, 0, 1], description: '' },
  bounceInOut: { name: 'bounce.inOut', ease: 'bounce.inOut', bezier: [0.78, 0, 0.2, 1], description: '' }
} satisfies { [key: string]: EaseDeclaration }

export const favouriteEases = {
  // Imported from https://codepen.io/jorisvanr/pen/rNKpPPm
  vinnieInOut: {
    name: 'vinnieInOut',
    ease: 'M0,0 C0.2,0 0,1 1,1',
    bezier: [0.2, 0, 0, 1],
    description: 'Really quick ease in, and Slow ease Out'
  },
  jorisSpecialIn: {
    name: 'jorisSpecialIn',
    ease: 'M0,0 C0.3,0 0.405,0 0.618,0.118 0.8,0.22 0.95,0.624 1,1',
    bezier: [0.689, 0, 0.837, 0.167],
    description: 'Very slow in, quick out'
  },
  jorisSpecialOut: {
    name: 'jorisSpecialOut',
    ease: 'M0,0 C0,0 0.07149,0.2195 0.1225,0.36041 0.15604,0.45308 0.17507,0.50463 0.21472,0.59314 0.24643,0.66392 0.26689,0.7067 0.30646,0.77106 0.33557,0.81841 0.35864,0.85087 0.396,0.888 0.42157,0.91342 0.44669,0.92894 0.48008,0.94364 0.52344,0.96274 0.55723,0.97125 0.60578,0.9804 0.66503,0.99157 0.70278,0.99421 0.76472,0.99728 0.8559,1.00182 1,1 1,1',
    bezier: [0.343, 1, 0.333, 1],
    description: 'Based on legacy Joris ease'
  },
  jorisSpecialInOut: {
    name: 'jorisSpecialInOut',
    ease: 'M0,0 C0,0 0.06321,0.00831 0.09183,0.02187 0.11202,0.03143 0.12423,0.04818 0.14098,0.06678 0.15886,0.08663 0.17048,0.10044 0.18352,0.12369 0.20977,0.17049 0.22333,0.20101 0.24527,0.25272 0.32396,0.43819 0.36063,0.55081 0.43973,0.72753 0.45725,0.76667 0.47533,0.78789 0.50071,0.82341 0.52028,0.85079 0.53323,0.86772 0.55648,0.89095 0.579,0.91344 0.5957,0.92861 0.62212,0.94469 0.64852,0.96077 0.66996,0.97071 0.69997,0.97831 0.74143,0.98882 0.77084,0.99058 0.8161,0.99386 0.88718,0.99899 1,1 1,1',
    bezier: [0.402, -0.004, 0.179, 1.113],
    description: 'Based on legacy Joris ease'
  },
  jorisOut: {
    name: 'jorisOut',
    ease: 'M0,0 C0.1,0.495 0.105,0.715 0.25,0.845 0.405,0.978 0.505,1 1,1',
    bezier: [0.169, 0.846, 0.066, 1],
    description: 'Super Heavy easeOut'
  },
  jorisInOut: {
    name: 'jorisInOut',
    ease: 'M0,0 C0.3,0 0.25,1 1,1',
    bezier: [0.298, 0.002, 0.236, 1],
    description: 'Quick ease in (more than vinnieInOut) and slow ease out (less then vinnieInOut)'
  },
  smoothInSoftLanding: {
    name: 'smoothInSoftLanding',
    ease: 'M0,0 C0.204,0 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1',
    bezier: [0.35, -0.015, -0.15, 1.15],
    description: 'Small in, smooth out'
  },
  softEaseIn: {
    name: 'softEaseIn',
    ease: 'M0,0 C0.8,0 0.8,1 1,1',
    bezier: [0.803, 0.023, 0.806, 1.012],
    description: 'Natural in,quick out'
  },
  slowStart: {
    name: 'slowStart',
    ease: 'M0,0 C0.46,0 0.482,0.024 0.592,0.114 0.734,0.23 0.8,1 1,1',
    bezier: [1.1, -0.1, 0.56, 0.9],
    description: 'Slow in, quick out'
  },
  softElastic: {
    name: 'softElastic',
    ease: 'M0,0 C0.05556,0 0.10833,1.08929 0.27778,1.08929 0.38667,1.08929 0.43593,0.97619 0.53704,0.97619 0.628,0.97619 0.67231,1.00893 0.77027,1.00893 0.86676,1.00893 0.88973,1 1,1',
    bezier: [0.216, 1.243, 0.041, 1.087],
    description: 'bounce'
  }
} satisfies { [key: string]: EaseDeclaration }

export const customEases = {
  ease1: { name: 'ease1', ease: '0.32, 0.83, 0.6, 1', description: '' },
  ease2: { name: 'ease2', ease: '0.32, 0.94, 0.6, 1', description: '' },
  ease3: { name: 'ease3', ease: '0.40, 0, 0.68, 0.09', description: '' },
  ease4: { name: 'ease4', ease: '0.66, 0, 0.34, 1', description: '' },
  ease5: { name: 'ease5', ease: '0.40, 0, 0.10, 1', description: '' },
  ease6: { name: 'ease6', ease: '0.58, -0.21, 0.73, 0.04', description: '' },
  ease7: { name: 'ease7', ease: '0 0 0 1.00', description: '' },
  ease8: { name: 'ease8', ease: '0.58, -0.21, 0.73, 0.04', description: '' },
  ease9: { name: 'ease9', ease: '0.65, 0, 0.20, 1', description: '' }
} satisfies { [key: string]: EaseDeclaration }

export const allEases = { ...favouriteEases, ...standardEases, ...customEases }

export const eases = Object.keys(allEases).reduce(
  (acc, key) => {
    acc[key as EaseId] = allEases[key as EaseId].ease
    return acc
  },
  {} as { [key in EaseId]: EaseDeclaration['ease'] }
)
export const e = eases // just an alias

export const easeNames = Object.values(allEases).map((ease) => ease.name)

export type EaseId = keyof typeof allEases

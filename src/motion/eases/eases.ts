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

export const standardEases: EaseDeclaration[] = [
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

export const favouriteEases: EaseDeclaration[] = [
  // Imported from https://codepen.io/jorisvanr/pen/rNKpPPm
  {
    name: 'jorisSpecialIn',
    ease: 'M0,0 C0.3,0 0.405,0 0.618,0.118 0.8,0.22 0.95,0.624 1,1',
    description: 'Very slow in, quick out'
  },
  {
    name: 'customPower1',
    ease: 'M0,0 C0.8,0 1,1 1,1',
    description: 'Steep in, hard out'
  },
  {
    name: 'softEaseIn',
    ease: 'M0,0 C0.8,0 0.8,1 1,1',
    description: 'Natural in,quick out'
  },
  {
    name: 'slowStart',
    ease: 'M0,0 C0.46,0 0.482,0.024 0.592,0.114 0.734,0.23 0.8,1 1,1',
    description: 'Slow in, quick out'
  },
  {
    name: 'customPower1',
    ease: 'M0,0 C0,0 0.08953,0.09186 0.14318,0.154 0.1946,0.21355 0.22492,0.24708 0.26892,0.31148 0.3883,0.48619 0.44663,0.59687 0.56489,0.77115 0.59601,0.81701 0.61881,0.84436 0.65625,0.88229 0.68038,0.90672 0.70059,0.9205 0.73002,0.93842 0.7558,0.95411 0.77503,0.96241 0.80387,0.97216 0.83527,0.98279 0.85672,0.9878 0.8899,0.99251 0.93132,0.99839 1,1 1,1',
    description: 'Based on Power1.Out'
  },
  {
    name: 'customPower2',
    ease: 'M0,0 C0,0 0.06638,0.07111 0.10213,0.11932 0.13775,0.16735 0.1573,0.19859 0.18629,0.25122 0.21694,0.30686 0.23254,0.34101 0.25713,0.40071 0.30901,0.52666 0.33101,0.60364 0.3821,0.72658 0.39412,0.7555 0.40473,0.7727 0.42231,0.79816 0.44056,0.82458 0.45368,0.84228 0.47679,0.86369 0.50465,0.8895 0.52618,0.90726 0.55919,0.92498 0.59672,0.94512 0.6259,0.95538 0.6683,0.96648 0.72174,0.98047 0.75707,0.98582 0.81329,0.9915 0.8847,0.99872 1,1 1,1',
    description: 'Based on Power2.Out'
  },
  {
    name: 'customPower3',
    ease: 'M0,0 C0,0 0.06725,0.07151 0.10126,0.11992 0.13401,0.16653 0.15245,0.19921 0.1764,0.25106 0.20075,0.30378 0.21238,0.3384 0.22861,0.39561 0.26361,0.51897 0.27349,0.598 0.30866,0.7172 0.31853,0.75067 0.33034,0.77188 0.34832,0.80138 0.36467,0.8282 0.37787,0.84698 0.40054,0.86793 0.43159,0.89661 0.45685,0.9169 0.49418,0.93613 0.53502,0.95715 0.56773,0.96746 0.61385,0.97777 0.66837,0.98996 0.7047,0.99279 0.76248,0.99611 0.85413,1.00139 1,1 1,1',
    description: 'Based on Power3.Out'
  },
  {
    name: 'jorisSpecialOut',
    ease: 'M0,0 C0,0 0.07149,0.2195 0.1225,0.36041 0.15604,0.45308 0.17507,0.50463 0.21472,0.59314 0.24643,0.66392 0.26689,0.7067 0.30646,0.77106 0.33557,0.81841 0.35864,0.85087 0.396,0.888 0.42157,0.91342 0.44669,0.92894 0.48008,0.94364 0.52344,0.96274 0.55723,0.97125 0.60578,0.9804 0.66503,0.99157 0.70278,0.99421 0.76472,0.99728 0.8559,1.00182 1,1 1,1',
    description: 'Based on legacy Joris ease'
  },
  {
    name: 'jorisOut',
    ease: 'M0,0 C0.1,0.495 0.105,0.715 0.25,0.845 0.405,0.978 0.505,1 1,1',
    description: 'Super Heavy easeOut'
  },
  {
    name: 'smoothInSoftLanding',
    ease: 'M0,0 C0.204,0 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1',
    description: 'Small in, smooth out'
  },
  {
    name: 'vinnieInOut',
    ease: 'M0,0 C0.2,0 0,1 1,1',
    description: 'Really quick ease in, and Slow ease Out'
  },
  {
    name: 'jorisInOut',
    ease: 'M0,0 C0.3,0 0.25,1 1,1',
    description: 'Quick ease in (more than vinnieInOut) and slow ease out (less then vinnieInOut)'
  },
  {
    name: 'jorisSpecialInOut',
    ease: 'M0,0 C0,0 0.06321,0.00831 0.09183,0.02187 0.11202,0.03143 0.12423,0.04818 0.14098,0.06678 0.15886,0.08663 0.17048,0.10044 0.18352,0.12369 0.20977,0.17049 0.22333,0.20101 0.24527,0.25272 0.32396,0.43819 0.36063,0.55081 0.43973,0.72753 0.45725,0.76667 0.47533,0.78789 0.50071,0.82341 0.52028,0.85079 0.53323,0.86772 0.55648,0.89095 0.579,0.91344 0.5957,0.92861 0.62212,0.94469 0.64852,0.96077 0.66996,0.97071 0.69997,0.97831 0.74143,0.98882 0.77084,0.99058 0.8161,0.99386 0.88718,0.99899 1,1 1,1',
    description: 'Based on legacy Joris ease'
  },
  {
    name: 'softElastic',
    ease: 'M0,0 C0.05556,0 0.10833,1.08929 0.27778,1.08929 0.38667,1.08929 0.43593,0.97619 0.53704,0.97619 0.628,0.97619 0.67231,1.00893 0.77027,1.00893 0.86676,1.00893 0.88973,1 1,1',
    description: 'bounce'
  }
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

export const eases: EaseDeclaration[] = [...customEases, ...favouriteEases, ...standardEases]

export default eases

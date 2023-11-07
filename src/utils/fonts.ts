import { Work_Sans } from 'next/font/google'

// Documentation
// https:nextjs.org/docs/app/building-your-application/optimizing/fonts

// Google fonts imports
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-work-sans'
})

// import localFont from 'next/font/local'

// Local font import example
// const localFontExample = localFont({
//   src: '../assets/fonts/LocalFont/LocalFont-Regular.woff2',
//   weight: '400',
//   style: 'normal',
//   display: 'swap',
//   variable: '--font-local'
// })

const fonts = [workSans]
export const fontVariables = fonts.map((font) => font.variable).join(' ')

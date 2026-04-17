import localFont from 'next/font/local'

export const roboto = localFont({
  src: [
    {
      path: './Roboto-Regular.woff2',
      weight: '400'
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700'
    },
  ],
  variable: '--font-roboto',
  display: 'swap'
})

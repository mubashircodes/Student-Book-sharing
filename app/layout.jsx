import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eco Connect',
  description: '',
}

export default function RootLayout(props) { // props.signOut, props.user
  return (
    <html lang="en">
      <body className={inter.className}>{props.children}</body>
    </html>
  )
}

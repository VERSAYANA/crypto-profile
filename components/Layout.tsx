import Navbar from './Navbar'
import React, { ReactNode } from 'react'
import Footer from './Footer'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </>
  )
}

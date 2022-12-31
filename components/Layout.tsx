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
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  )
}

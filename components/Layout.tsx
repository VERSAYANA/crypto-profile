import React, { ReactNode } from 'react'

import Footer from './Footer'
import Navbar from './Navbar'

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

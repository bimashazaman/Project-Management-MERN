import React from 'react'
import Footer from '../partials/Footer'
import Header from '../partials/Header'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

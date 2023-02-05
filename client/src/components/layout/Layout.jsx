import React from 'react'
import Footer from '../partials/Footer'
import Header from '../partials/Header'

const Layout = ({ child }) => {
  return (
    <div>
      <Header />
      {child}
      <Footer />
    </div>
  )
}

export default Layout

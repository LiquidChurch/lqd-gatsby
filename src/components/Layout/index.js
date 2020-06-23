import React from "react"
import Container from 'react-bootstrap/Container'

import Meta from "../Meta"
import Footer from "../Footer"
import Header from "../Header"
import "./styles.css"

export default ({ location, children }) => {
  
  var mainMinHeight = 400;

 

  
  return (
    <div>
    <Container fluid>
      <Meta />
      <Header home={"/" === location.pathname} location={location} />
      <main id='main' className={`layout__content`} style={{minHeight: mainMinHeight + 'px'}}>{children}</main>
      <Footer />
    </Container>
    </div>
  )
}

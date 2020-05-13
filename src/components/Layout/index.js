import React from "react"
import Container from 'react-bootstrap/Container'

import Meta from "../Meta"
import Footer from "../Footer"
import Header from "../Header"
import "./styles.css"

export default ({ location, children }) => {
  return (
    <div>
    <Container fluid>
      <Meta />
      <Header home={"/" === location.pathname} location={location} />
      <main className={`layout__content`}>{children}</main>
      <Footer />
    </Container>
    </div>
  )
}

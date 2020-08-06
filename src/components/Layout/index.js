import React from "react"
import Container from 'react-bootstrap/Container'
import { Link } from "gatsby"
import Search from "./search"

import Meta from "../Meta"
import Footer from "../Footer"
import Header from "../Header"
import "./styles.css"

const searchIndices = [{ name: `Messages`, title: `Messages` }]

export default ({ location, children }) => {
  
  var mainMinHeight = 400;

 

  
  return (
    <div>
    <Container fluid>
      <Meta />
      <Header home={"/" === location.pathname} location={location} />
      <Search indicates={searchIndices} />
      <main id='main' className={`layout__content`} style={{minHeight: mainMinHeight + 'px'}}>{children}</main>
      <Footer />
    </Container>
    </div>
  )
}

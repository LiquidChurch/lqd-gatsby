import React from "react"
import Container from 'react-bootstrap/Container'

import Meta from "../Meta"
import Footer from "../Footer"
import Header from "../Header"
import "./styles.css"
import useWindowDimensions from "./windowDimension.js"

export default ({ location, children }) => {
  var { width, height } = useWindowDimensions();

  //const clientHeight = window.innerHeight;
  //const headerHeight = document.getElementById('header').clientHeight
  //const footerHeight = document.getElementById('footer').clientHeight
    
  console.log("layout init", height)
  //console.log("header height", headerHeight)  
  //console.log("footer height", footerHeight)
  console.log("width", width)
  
  var mainMinHeight = 0;
  
  if ( width > 576 ) {
    mainMinHeight = (height - 206);  
  } else {
    mainMinHeight = (height - 244);
  }
 

  
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

import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HomeLink from "./homeLink"

import "./styles.css"

export default ({ page_slug_list, background_color }) => {
  //const nodes = useFeaturedImage("liquid-lunch")

  //console.log(nodes)
  var obj_page_slug_list = JSON.parse(page_slug_list)
  var strap_color = "#121212"
  //console.log(obj_page_slug_list)
  //const listItems = obj_page_slug_list.rows.map((item) => {
  //  return item.page_slug
  //})
  
  //const test = listItems[0]
  //console.log(test)

  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: background_color}} >
  <Container>
    <Row>
        {obj_page_slug_list.rows.map(item => {
          return (
            <Col xs={12} md={6} className="home-tile">
              <HomeLink
                page_slug={item.page_slug}>
              </HomeLink>
            </Col>
          )
        })}
    </Row>
  </Container>
  </section>
  </>
  )
}

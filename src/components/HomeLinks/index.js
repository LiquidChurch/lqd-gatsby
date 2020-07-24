import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HomeLink from "./homeLink"

import "./styles.css"

/** 
 * Home Link Block Component
 */
export default ({ page_list, background_color }) => {
  var obj_page_slug_list = JSON.parse(page_list)

  console.log(obj_page_slug_list)
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: background_color}} >
  <Container>
    <Row>
        {obj_page_slug_list.rows.map(item => {
          return (
            <Col key={"home-tile-" + item.page_slug} xs={12} md={6} className="home-tile">
              <HomeLink
                page_slug_id={item.page_slug.id}>
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

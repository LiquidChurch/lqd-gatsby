import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
              <HomeLink
                page_slug_id={item.page_slug.id} key={item.page_slug.id} cta_text={item.cta_text}>
              </HomeLink>
          )
        })}
    </Row>
  </Container>
  </section>
  </>
  )
}

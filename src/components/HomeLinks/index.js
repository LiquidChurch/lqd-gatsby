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

  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: background_color}} >
  <Container>
    <Row>
        {obj_page_slug_list.rows.map((item, index) => {
          console.log(item)
          return (
            <HomeLink
              page_slug_id={item.page_slug.id} 
              key={item.page_slug.id + '-' + index} 
              alt_image={item.alt_image} 
              cta_text={item.cta_text} 
              url_append={item.url_append}
              heading={item.heading}
              subheading={item.subheading} 
            />
          )
        })}
    </Row>
  </Container>
  </section>
  </>
  )
}

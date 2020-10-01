import React from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'

import { useImageById } from "../../../data/useImage"
//import { PageModalContext } from '../../PageModal/context'

import "./styles.css"

function StrapImage(props) {
  const image_info = useImageById(props.strap_image_id)
  
  if (image_info !== undefined) {
    var imgUrl = image_info.mediaItemUrl.split("/")
    return (
      <Col xs={4} className="page-strap-image-col">
        <Imgix 
          src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?fit=fillmax&w=" + props.max_width}
          className="page-strap-image"
          size="100vw"
          />
      </Col>
    )
  }  
  return null
}


/**
 * Page Strap Block Component
 */
export default ({
  statement,
  font_color,
  all_caps,
  sidekick,
  cta,
  bg_color,
  padding,
  spacing,
  width,
  alignment,
  size,
  color,
  image_id,
}) => {
  var hasImage = false
  if (image_id !== null && image_id !== undefined && image_id !== 0) { hasImage = true }

  console.log(hasImage)
  
  console.log('pageStrap font color', font_color)
  
  let xsWidth = 12
  let xsOffset = 0
  let smWidth = (width + 4)
  if (smWidth > 12) {smWidth = 12}
  let smOffset = (12 - smWidth)/2
  let mdWidth = (width + 2)
  if (mdWidth > 12) {mdWidth = 12}
  let mdOffset = (12 - mdWidth)/2
  let lgWidth = width
  let lgOffset = ((12 - lgWidth)/2 ) 
  let maxWidth = width * 25
  
  let textAreaWidth = 12
  if (hasImage === true) { textAreaWidth = 8 }
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
  <Container>
    <Row>
      <Col flex xs={{span: xsWidth, offset: xsOffset}}
           sm={{span: smWidth, offset: smOffset}}
           md={{span: mdWidth, offset: mdOffset}}
           lg={{span: lgWidth, offset: lgOffset}}
           className="page-strap">
        <StrapImage strap_image_id={image_id} max_width={maxWidth}/>
        <Col xs={12} md={textAreaWidth} className={"page-strap-col vertical-center"}>
          <TextArea 
            statement={statement}
            font_color={font_color}
            all_caps={all_caps}
            sidekick={sidekick}
            cta={cta}
            alignment={alignment}
            size={size}
            spacing={spacing}
            theme={color}
          />
        </Col>
      </Col>
    </Row>
  </Container>
  </section>
  </>
  )
}
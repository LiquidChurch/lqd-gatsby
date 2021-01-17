import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'
import { useLocation } from '@reach/router';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'

import { useImageById } from "../../../data/useImage"
import { getDate, mediaUrlConverter } from '../../../helpers/functions'
//import { PageModalContext } from '../../PageModal/context'

import "./styles.css"

function StrapImage(props) {
  console.log('strapimage', props)
  const image_info = useImageById(props.strap_image_id)
  
  if (image_info !== undefined) {
    var imageUrl = mediaUrlConverter(image_info.mediaItemUrl)
    return (
      <Col xs={12} sm={props.strap_image_size * 2} md={props.strap_image_size} className="page-strap-image-col">
        <div style={{maxWidth: props.max_width, margin: '0 auto'}}>
        <Imgix 
          src={imageUrl + "?fit=clamp"}
          width={props.max_width}
          className="page-strap-image"
          />
        </div>
      </Col>
    )
  }  
  return null
}

/**
 * Page Strap Block Component
 */
export default ({
  keyValue,
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
  image_size,
  block_on,
  block_off,
}) => {
  const currentDate = getDate(useLocation().search)
  const [isPublished, setIsPublished] = useState(false)
  const [checkedPublished, setCheckPublished] = useState(false)
  
  var hasImage = false
  if (image_id !== null && image_id !== undefined && image_id !== 0) { hasImage = true }

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
  if (hasImage === true) { textAreaWidth = 12 - image_size }
  
  useEffect(
    () => {
      if (!checkedPublished) {
        if (((block_on === null || block_on.trim() === "") || currentDate >= Date.parse(block_on)) &&
            ((block_off === null || block_off.trim() === "") || currentDate < Date.parse(block_off))) {
          setIsPublished(true)
        }
          setCheckPublished(true)
      }
  },[checkedPublished, setCheckPublished, setIsPublished, block_off, block_on, currentDate])
  
  
  return (
  <>
    <section className={isPublished ? 'site-section ' + padding : 'site-section ' + padding + ' no-display'} 
            style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        <Col xs={{span: xsWidth, offset: xsOffset}}
             sm={{span: smWidth, offset: smOffset}}
             md={{span: mdWidth, offset: mdOffset}}
             lg={{span: lgWidth, offset: lgOffset}}
             className="page-strap">
          <StrapImage strap_image_id={image_id} strap_image_size={image_size} max_width={maxWidth}/>
          <Col md={12} lg={textAreaWidth} className={"page-strap-col vertical-center"}>
            <TextArea
              keyValue={keyValue + '-page-strap'}
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
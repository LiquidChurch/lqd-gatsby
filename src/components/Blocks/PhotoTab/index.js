import React, { useState } from 'react'
import Imgix from 'react-imgix'
import { useLocation } from '@reach/router';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'
import Heading from "../../Blocks/Heading"
import CallToAction from '../../Commons/CallToAction'
import GoogleMapComponentWithMarker from "../../Commons/GoogleMapWithMarker"
import { useCampusById } from "../../../data/useCampus"
import { usePageById } from '../../../data/usePage'

import { useImageById } from "../../../data/useImage"
import { ClassicTextHelper, getDate, mediaUrlConverter } from "../../../helpers/functions.js"

import "./photoTab.css"

/**
 * PhotoTab Block Component
 */
export default ({
  keyValue,
  location,
  image_id,
  header,
  text_block,
  cta,
  header_secondary,
  text_block_secondary,
  cta_secondary,
  color,
  bg_color,
  padding,
  spacing,
  alignment,
  header_size,
  size,
  block_on,
  block_off,
  google_map,
  map_toggle,
}) => {
  const currentDate = getDate(useLocation().search)
  
  const [isPublished, setIsPublished] = useState(false)
  const [checkedPublished, setCheckPublished] = useState(false)
  
  if (!checkedPublished) {
    if (((block_on === null || block_on.trim() === "") || currentDate >= Date.parse(block_on)) &&
        ((block_off === null || block_off.trim() === "") || currentDate < Date.parse(block_off))) {
      setIsPublished(true)
    }
      setCheckPublished(true)
  }
  
  let ctaObject = JSON.parse(cta)
  let hasCTA = false
  if (ctaObject !== null && ctaObject.rows.length !== 0) {
    if (typeof ctaObject.rows[0].style !== 'undefined') {
      hasCTA = true
      let ctaObjectLength = ctaObject.rows.length
      ctaObject.rows.forEach((cta, i) => {
        if (i === (ctaObjectLength - 1) ) {
          ctaObject.rows[i].lastItem = true
        } else {
          ctaObject.rows[i].lastItem = false
        }
      })
    }
  }
  
  let usePhoto = true
  if (map_toggle !== undefined && map_toggle === true) {
    usePhoto = false
    var mapObj = JSON.parse(google_map)
    
    let pageInfo = {}
    if (mapObj.rows[0].cta_link.id !== undefined) {
      pageInfo = usePageById(mapObj.rows[0].cta_link.id)
    } 

    var campusList = []
    let campusInfo = useCampusById(mapObj.rows[0].campus.id)

    if (mapObj.rows[0].campus.label_left) {
      campusInfo.anchor = campusInfo.googleMap.anchorLeft      
    } else {
      campusInfo.anchor = -24
    }
    
    campusInfo.icon_style = mapObj.rows[0].icon_style
    campusInfo.index = 1
    campusInfo.cta_label=mapObj.rows[0].cta_label
    campusInfo.cta_link=pageInfo.uri
    campusList.push(campusInfo)
  } else {
    var imageInfo = useImageById(image_id) 
    if (imageInfo === undefined) {
      return(<></>)
    } else {
      var imageUrl = mediaUrlConverter(imageInfo.mediaItemUrl)
    }
  }
  
  let isAlternative = false
  let altTopPadding = "top"
  let headerColor = "#009DD1"
  if (location.substr(location.length - 3) === 'alt') {
    isAlternative = true
    if (padding === "none" || padding === "bottom") {
      altTopPadding = "none"
    }
    
    if (color === "dark") {
      headerColor = "#FFF"
    }
    
    if (color === "family") {
      headerColor = "#E16D00"
    }
    if (padding === "top" || padding === "none") {
      padding = "none"    
    } else {
      padding = "bottom"
    }
  }
  
  let imgOrder = 1
  let textOrder = 2
  if (location.slice(0,3) === "rig") {
    imgOrder = 2
    textOrder = 1
  }
  
  if (text_block !== "<p></p>" || text_block !== null) { 
    var textBlock = ClassicTextHelper(text_block)
  }

  let hasSecondary = false
  if (text_block_secondary !== "<p></p>" && text_block_secondary !== null) { 
    var textBlockSecondary = ClassicTextHelper(text_block_secondary)
    hasSecondary = true
  }
  if (header_secondary !== null) {
    hasSecondary = true
  }
  
  return (
  <>
  {isPublished &&
   <>
    {isAlternative &&
      <Heading
        text={header}
        alignment="center"
        size={header_size}
        all_caps={false}
        add_padding={true}
        font_color={headerColor}
        padding={altTopPadding}
        bg_color={bg_color}
      />
    }
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <Container>
      <Row className="photo-tab-row">
        <Col xs={{span: 12, order: 1}} md={{span: 6, order: imgOrder}} 
            className={(imgOrder === 1) ? "photo-tab-image-col photo-tab-left" : "photo-tab-image-col"}>
          {usePhoto ? 
            <Imgix 
              src={imageUrl + "?ar=1:1&fit=crop&h=525"}
              className="photo-tab-image"
              height={525}
              /> :
            <div className="photo-tab-map">
            <GoogleMapComponentWithMarker
              googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + process.env.GOOGLE_API_KEY}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markerObj={campusList}
              latitude={mapObj.rows[0].latitude}
              longitude={mapObj.rows[0].longitude}
              zoom={mapObj.rows[0].zoom}
            />
            </div>
           }
        </Col>    
        <Col  xs={{span: 12, order: 2}} md={{span: 6, order: textOrder}} className="photo-tab-body-col" id={"photo-tab-body-" + image_id}>
          <TextArea
            keyValue={keyValue + '-ta-pri'}
            statement={isAlternative ? null : header}
            sidekick={textBlock}
            cta={isAlternative ? null : cta}
            alignment={alignment}
            headerSize={header_size}
            size={size}
            spacing={spacing}
            theme={color}
            noMargin={true}
          />
          <div className={hasSecondary ? "half-top-padding" : ''}></div>
          <TextArea 
            keyValue={keyValue + '-ta-sec'}
            statement={header_secondary}
            sidekick={textBlockSecondary}
            cta={cta_secondary}
            alignment={alignment}
            headerSize={header_size}
            size={size}
            spacing={spacing}
            theme={color}
            noMargin={true}
          />    
        </Col>
      </Row>
      <Row>
        {isAlternative &&
        <Col className={'cta ' + header_size + ' half-top-padding'}>
          {hasCTA ? 
            ctaObject.rows.map((cta, index)=> {
              return (
                <CallToAction cta={cta} alignment="center" spacing="tall" theme={color} key={keyValue + '-alt-cta-' + index}/>
              )
            }) : ''
          }
          </Col>
        }
      </Row>
    </Container>
    </section>
  </>
  }
  </>
  )
}

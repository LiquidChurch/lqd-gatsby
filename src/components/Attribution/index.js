import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SectionHeader from '../SectionHeader'
import Imgix from 'react-imgix'

import { useAttributionById } from "../../data/useAttribution"
import './styles.css'

export default ({
  title,
  bg_color,
  attribution_list,
}) => {
  const attributionObject = JSON.parse(attribution_list)
  let attributionInfo = []
  attributionObject.rows.forEach(item => {
    attributionInfo.push(useAttributionById(item.attribution.id))
  })
  
  if (attributionInfo.length  === 0) {
    return (
    <>
    </>
    )
  }
  
  let imageUrl = attributionInfo[0].profileImage.image.mediaItemUrl.split("/")

  return (
  <>
    <section className="fullwidth-section" style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        <SectionHeader label={title} offset={0} showHR={true}/>
        <Col className="attribution-profile-primary">
           <Imgix 
            src={"https://liquidchurch.imgix.net/" + imageUrl[4] + "/" + imageUrl[5] + "?mask=ellipse&w=240&h=240"}
            className={'attribution-profile-image'}
           />
           <div className={'attribution-profile-information'}> 
            <div className={'font-h1'}>{attributionInfo[0].name}</div>
            <div className={'attribution-profile-role font-h2'}>{attributionInfo[0].profileImage.role}</div>
            <div className={'attribution-profile-description font-regular'}>{attributionInfo[0].description}</div>
           </div>
        </Col>
      </Row>
    </Container>
    </section>
  </>
  )
}
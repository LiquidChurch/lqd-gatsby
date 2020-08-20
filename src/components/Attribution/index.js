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

  var subAttribution = []
  
  if (attributionInfo.length > 1) {
    for (var i = 1; i < attributionInfo.length; i++ ) {
      subAttribution.push(attributionInfo[i])
      subAttribution[i-1].imageUrl = attributionInfo[i].profileImage.image.mediaItemUrl.split("/")
    }
  }

  console.log(subAttribution)
  
  return (
  <>
    <section className="fullwidth-section" style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        <SectionHeader label={title} offset={0} showHR={true}/>
        <Col xs={12} className="attribution-profile">
            <div>
              <Imgix 
                src={"https://liquidchurch.imgix.net/" + imageUrl[4] + "/" + imageUrl[5] + "?mask=ellipse&w=240&h=240"}
                className={'attribution-profile-image'}
             />
              <div className={'attribution-profile-blurb bottom font-small'}><p>{attributionInfo[0].profileImage.blurb}</p></div>
            </div>
            <div className={'attribution-profile-information'}> 
              <div className={'font-h1'}>{attributionInfo[0].name}</div>
              <div className={'attribution-profile-role font-h2'}>{attributionInfo[0].profileImage.role}</div>
              <a href={'mailto:'+ attributionInfo[0].profileImage.email}>
                <div className={'attribution-profile-email font-h2'}>{attributionInfo[0].profileImage.email}</div>
              </a>
            <div className={'attribution-profile-description font-regular'}>{attributionInfo[0].description}</div>
           </div>
        </Col>
        { subAttribution.map(attribution => {
          return (
            <Col sm={12} md={6} lg={4} className="attribution-secondary-profile">
              <div> 
                <Imgix 
                  src={"https://liquidchurch.imgix.net/" + attribution.imageUrl[4] + "/" + attribution.imageUrl[5] + "?mask=ellipse&w=137&h=137"}
                  className={'attribution-secondary-profile-image'}
                />
                <div className={'attribution-profile-blurb top font-small'}><p>{attribution.profileImage.blurb}</p></div>              
              </div>
              <div className={'attribution-secondary-profile-information'}>
                <div className={'font-h2'}>{attribution.name}</div>
                <div className={'attribution-profile-role font-h3'}>{attribution.profileImage.role}</div>
                <a href={'mailto:'+ attribution.profileImage.email}>
                  <div className={'attribution-profile-email font-regular'}>{attribution.profileImage.email}</div>
                </a>
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
    </section>
  </>
  )
}
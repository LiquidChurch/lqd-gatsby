import React from 'react'
import "./styles.css"

import Container from 'react-bootstrap/Container'

import GoogleMapComponentWithMarker from "../Commons/GoogleMapWithMarker"
import { useCampusById } from "../../data/useCampus"

export default ({
  campuses,
  latitude,
  longitude,
  zoom}) => {
  const campusesObj = JSON.parse(campuses)
  const googleKey = process.env.GOOGLE_API_KEY
  let campusList = []
  campusesObj.rows.forEach((campus,i) => {
    let campusInfo = useCampusById(campus.campus.id)

    if (campus.label_left) {
      campusInfo.anchor = campusInfo.googleMap.anchorLeft      
    } else {
      campusInfo.anchor = -24
    }
    
    campusInfo.icon_style = campus.icon_style
    campusInfo.index = campusesObj.rows.length - i
    campusList.push(campusInfo)
  })
  
  return (
      <section className={'site-section bottom'} id="locations-hero">
        <Container fluid className='hero-image-container-filled map-hero-filled'>
          <div className='hero-image-filled' style={{height:'100vh', paddingBottom:'25px'}}>
            <GoogleMapComponentWithMarker
              googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + googleKey}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markerObj={campusList}
              latitude={latitude}
              longitude={longitude}
              zoom={zoom}
            />
          </div>
        </Container>
      </section>
    )
}
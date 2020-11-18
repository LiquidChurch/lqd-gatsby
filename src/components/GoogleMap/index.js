import React, { useContext } from 'react'
import "./styles.css"
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'

import Container from 'react-bootstrap/Container'
import Parse from "react-html-parser"

import PageModal from "../PageModal"
import { PageModalContext } from '../PageModal/context'
import { useCampusById } from "../../data/useCampus"

const styles = require('./GoogleMapStyles.json')
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

function MapMarker(props) {
  const ctx = useContext(PageModalContext)
  
  var labelLocation = "right"
  if (props.anchor > 0) {
    labelLocation = "left"
  }
  var mapIcon = require('./map-marker.svg')
  
  if (props.iconStyle === "grey") {
    mapIcon = require('./map-marker-grey.svg')
  }
  
  return (
    <>
   <MarkerWithLabel
        icon={{
          url: mapIcon,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: props.lat, // latitude to position the marker
          lng: props.lng // longitude to position the marker
        }}
        labelAnchor={{x:props.anchor, y:70}}
        labelClass={'map-label ' + labelLocation}
        onClick={() => ctx.setShowModalId(props.slug)}
        zIndex={props.index}
      >
     <div id={'marker-element-' + props.slug}><span className={'circle ' + labelLocation}></span>{Parse(props.label)}</div>
   </MarkerWithLabel>
        <PageModal 
          modal_title={props.title}
          modal_text={Parse(props.text)}
          modal_id={props.slug}
        />
      </>
  )
}

const GoogleMapComponentWithMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={props.zoom / 10}
      defaultCenter={{
        lat: props.latitude / 1000, // latitude for the center of the map
        lng: props.longitude / 1000 // longitude for the center of the map
      }}
      defaultOptions={{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        zoomControl: true,
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: false, // allow scroll wheel
        styles: styles // change default map styles
      }}
    >
    {
      props.markerObj.map(campus => {
          return (
            <MapMarker
              key={'map-marker-' + campus.slug}
              lat={campus.googleMap.lat}
              lng={campus.googleMap.lng}
              label={campus.googleMap.label}
              slug={campus.slug}
              title={campus.name}
              text={campus.description}
              anchor={campus.anchor}
              iconStyle={campus.icon_style}
              index={campus.index}
            />
          )
        }
      )
    }
    </GoogleMap>
  ))
)

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
import React, { useContext } from 'react'
import "./styles.css"
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'

import Container from 'react-bootstrap/Container'
import Parse from "react-html-parser"

import PageModal from "../PageModal"
import { PageModalContext } from '../PageModal/context'
import { useCampusById } from "../../data/useCampus"

const styles = require('./GoogleMapStyles.json')
const mapMarker = require('./map-marker.svg')
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

const googleKey = process.env.GOOGLE_API_KEY

function MapMarker(props) {
  const ctx = useContext(PageModalContext)
 
  return (
    <>
   <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: props.lat, // latitude to position the marker
          lng: props.lng // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}      
        onClick={() => ctx.setShowModalId(props.slug)}
      >
         <div><span className='circle'></span>{Parse(props.label)}</div>

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
      defaultZoom={9}
      defaultCenter={{
        lat: 40.677, // latitude for the center of the map
        lng: -74.204 // longitude for the center of the map
      }}
      defaultOptions={{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
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
            />
          )
        }
      )
    }
    </GoogleMap>
  ))
)

export default ({campuses}) => {
  const campusesObj = JSON.parse(campuses)
  
  let campusList = []
  
  campusesObj.rows.forEach(campus => {
    campusList.push(useCampusById(campus.campus.id))
  })
  
  return (
      <section id="locations-hero">
        <Container fluid className='hero-image-container-filled'>
          <div className='hero-image-filled' style={{width:'100%', height:'795px'}}>
            <GoogleMapComponentWithMarker
              googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + googleKey}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markerObj={campusList}
            />
          </div>
        </Container>

      </section>
    )
  
}
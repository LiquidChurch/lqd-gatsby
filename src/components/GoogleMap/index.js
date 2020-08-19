import React from 'react'
import "./styles.css"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Parse from "react-html-parser"

import PageModal from "../PageModal"
const styles = require('./GoogleMapStyles.json')
const mapMarker = require('./map-marker.svg')
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

const googleKey = process.env.GOOGLE_API_KEY

const ClickTest = () => {
  console.log('clicked')
}

function MapMarker(props) {
  console.log('map marker', props)
  
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
      >
         <div><span className='circle'></span>{Parse(props.label)}</div>

      </MarkerWithLabel>
                   <PageModal 
          modal_title='Test Modal'
          modal_text='Test Text'
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
      <MapMarker
        lat= {40.855952}
        lng={-74.416534}
        label='Morris<br/>County'
      />
      <MapMarker
        lat= {40.818734}
        lng={-74.160756}
        label='Essex<br/>County'
      / >
      <MapMarker
        lat= {40.650183}
        lng={-74.324379}
        label='Union County<br/>Garwood'
      / >
      <MapMarker
        lat= {40.680272}
        lng={-74.346357}
        label='Union County<br/>Mountainside'
      / >
      <MapMarker
        lat= {40.578621}
        lng={-74.611487}
        label='Somerset<br/>County'
      / >
      <MapMarker
        lat= {40.463566}
        lng={-74.315636}
        label='Middlesex<br/>County'
      / >
      <MapMarker
        lat= {40.267373}
        lng={-74.030067}
        label='Monmouth<br/>County'
      / >
      <MapMarker
        lat= {40.947944}
        lng={-74.216374}
        label='Passac<br/>County'
      / >
    </GoogleMap>
  ))
)

export default ({}) => {
  console.log('google map component')
  
  return (
      <section id="locations-hero">
        <Container fluid className='hero-image-container-filled'>
          <div className='hero-image-filled' style={{width:'100%', height:'795px'}}>
                <GoogleMapComponentWithMarker
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + googleKey}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
          </div>
        </Container>

      </section>
    )
  
}
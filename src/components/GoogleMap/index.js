import React from 'react'
import "./styles.css"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const styles = require('./GoogleMapStyles.json')
const mapMarker = require('./map-marker.svg')
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

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
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.660718, // latitude to position the marker
          lng: -74.222921 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}        
      >
         <div><span className='circle'></span>Morris<br/>County</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.81873, // latitude to position the marker
          lng: -74.160756 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Essex<br/>County</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.650183, // latitude to position the marker
          lng: -74.324379 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Union County<br/>Garwood</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.680272, // latitude to position the marker
          lng: -74.346357 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Union County<br/>Mountainside</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.578621, // latitude to position the marker
          lng: -74.611487 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Somerset<br/>County</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.463566, // latitude to position the marker
          lng: -74.315636 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Middlesex<br/>County</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.267373, // latitude to position the marker
          lng: -74.030067 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Monmouth<br/>County</div>
      </MarkerWithLabel>
      <MarkerWithLabel
        icon={{
          url: mapMarker,
          anchor: new window.google.maps.Point(25,70),
        }}
        position={{
          lat: 40.947944, // latitude to position the marker
          lng: -74.216374 // longitude to position the marker
        }}
        labelAnchor={new window.google.maps.Point(0,70)}
        labelClass={'map-label'}
      >
         <div><span className='circle'></span>Passaic<br/>County</div>
      </MarkerWithLabel>
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
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEyjZGdaropm46X5em_GY9p6VXM6PYNSQ&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
          </div>
        </Container>
      </section>
    )
  
}
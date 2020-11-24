import React, { useContext } from 'react'
import "./styles.css"
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'

import Parse from "react-html-parser"

import PageModal from "../../PageModal"
import { PageModalContext } from '../../PageModal/context'

const styles = require('./GoogleMapStyles.json')
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

/**
 * Google Map with Marker Component
 */
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
          modal_text={props.text}
          modal_id={props.slug}
          modal_link={props.slug}
        />
      </>
  )
}


export default GoogleMapComponentWithMarker
import React from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Parse from "react-html-parser"

function ShowTitle(props) {
  if (props.showBlurb) {
    return (
      <ListGroup.Item>
          <div className="media-card-title font-h2">{props.title}</div>
          <div className="media-card-blurb font-small">{Parse(props.blurb)}</div>
      </ListGroup.Item>
    )
  }
  return (
    <ListGroup.Item>
      <div className="media-card-title font-h2">{props.title}</div>
    </ListGroup.Item>
  )
}

function ShowSeries(props) {
  if (props.showSeries && props.seriesTitle !== "") {
    let part = ""
    
    if (props.seriesPart !== "" && props.seriesPart !== null) {
      part = " • Part " + props.seriesPart
    }
    
    return (
    <>
      <ListGroup.Item className="media-card-series font-h3">
        <div className="media-card-series-title">{props.seriesTitle}</div>
        <div className="media-card-series-part">{part}</div>
      </ListGroup.Item>
    </>
    )
  }
  return null  
}

function ShowAttribution(props) {
  
  let date = props.date.toUpperCase()
  
  if (props.showAttribution) {
    let profileImgUrl = []
    if (props.profileImage !== undefined) {
      profileImgUrl = props.profileImage.split("/")
    }
    return (
    <>
      <ListGroup.Item className="media-card-attribution font-h3">
        <Imgix
          src={process.env.IMGIX_URL + profileImgUrl[4] + "/" + profileImgUrl[5] + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50"}
          className="media-card-profile-image"
        />
        <div className="media-card-attribution-info">
          <div className="media-card-name">{props.attributionName}</div>
          <div className={"media-card-icon " + props.category + "-icon"}></div>
          <div className="media-card-date">{date}</div>
        </div>
      </ListGroup.Item>
      
    </>
    )
  }
  return null  
}

export default (props) => {
  var imgUrl = props.mediaItem.image.split("/")
  return (
  <>
    <Link
      to={"/" + props.mediaItem.category + "/" + props.mediaItem.slug}
      className="media-card-link"
    >
    <Card className="media-card">
      <Imgix
        className="card-img-top"
        src={process.env.IMGIX_URL + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&w=262"}
        width={262}
      />
      <ListGroup variant="flush" >
        <ShowTitle
          title={props.mediaItem.title}
          showBlurb={props.mediaItem.showBlurb}
          blurb={props.mediaItem.blurb}
        />
        <ShowSeries 
          showSeries={props.mediaItem.showSeries}
          seriesTitle={props.mediaItem.seriesTitle}
          seriesPart={props.mediaItem.seriesPart}
        />
        <ShowAttribution
          showAttribution={props.mediaItem.showAttribution}
          attributionName={props.mediaItem.attributionName}
          profileImage={props.mediaItem.profileImage}
          date={props.mediaItem.date}
          category="messages"
        />
      </ListGroup>
    </Card>
    </Link>
  </>
  )  
}


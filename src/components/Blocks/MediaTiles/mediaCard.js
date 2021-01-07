import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Parse from "react-html-parser"

import { mediaUrlConverter } from '../../../helpers/functions'

function ShowTitle(props) {
  if (props.showBlurb) {
    return (
      <ListGroup.Item className="media-card-message">
          <div className="media-card-title font-h2">{props.title}</div>
          <div className="media-card-blurb font-small">{Parse(props.blurb)}</div>
      </ListGroup.Item>
    )
  }
  return (
    <ListGroup.Item className="media-card-message">
      <div className="media-card-title font-h2">{props.title}</div>
    </ListGroup.Item>
  )
}

function ShowSeries(props) {
  if (props.showSeries && props.seriesTitle !== "") {
    let part = ""
    
    if (props.seriesPart !== "" && props.seriesPart !== null) {
      part = "Part " + props.seriesPart
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
  let icon=''
  switch(props.category) {
    case 'messages':
      icon='messages-icon'
      break;
    default:
      icon='blogs-icon'
  }
  
  if (props.showAttribution) {
    let date = props.date.toUpperCase()
    return (
    <>
      <ListGroup.Item className="media-card-attribution font-h3">
        <Imgix
          src={props.profileImage}
          className="media-card-profile-image"
        />
        <div className="media-card-attribution-info">
          <div className="media-card-name">{props.attributionName}</div>
          <div className={"media-card-icon " + icon}></div>
          <div className="media-card-date">{date}</div>
        </div>
      </ListGroup.Item>
    </>
    )
  }
  return null  
}

export default (props) => {
  if (props.mediaItem.image === undefined || props.mediaItem.image === null) {
    return (<></>)
  } 
            
  const [imgUrl, setImgUrl] = useState("")
  const [profileImgUrl, setProfileImgUrl] = useState("")
  const [imgLoaded, setImgLoaded] = useState(false)
  
  let linkUrl = ""
  if (props.mediaItem.category === "pages") {
    linkUrl = props.mediaItem.slug
  } else {
    linkUrl = "/" + props.mediaItem.category + "/" + props.mediaItem.slug
  }
  
  useEffect(() => {
    if (!imgLoaded) {
      let imageUrl = mediaUrlConverter(props.mediaItem.image)
      setImgUrl(imageUrl + "?ar=16:9&fit=crop&h=296")
      if (props.mediaItem.profileImage !== undefined) {
        let profileImageUrl = mediaUrlConverter(props.mediaItem.profileImage)
        setProfileImgUrl(profileImageUrl + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50")
      }
      if (!props.mediaItem.isDynamic) {
        setImgLoaded(true)
      }
    }
    }, [imgLoaded, props.mediaItem])
    
  return (
  <>
    <Link
      to={linkUrl}
      className="media-card-link"
    >
    <Card className="media-card">
      {(imgLoaded || props.mediaItem.isDynamic) &&
        <Imgix
          className="card-img-top"
          src={imgUrl}
          width={262}
        />
      }
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
      {(imgLoaded || props.mediaItem.isDynamic) &&
        <ShowAttribution
          showAttribution={props.mediaItem.showAttribution}
          attributionName={props.mediaItem.attributionName}
          profileImage={profileImgUrl}
          date={props.mediaItem.date}
          category={props.mediaItem.category}
        />
      }
      </ListGroup>
    </Card>
    </Link>
  </>
  )  
}


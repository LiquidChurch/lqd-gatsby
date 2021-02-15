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
          <div className="media-card-title font-h2">{Parse(props.title)}</div>
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
    let partClass = 'media-card-series-part'
    let seriesClass = 'media-card-series font-h3'
    if (props.seriesPart !== "" && props.seriesPart !== null) {
      part = "Part " + props.seriesPart
    }
    
    if (props.seriesPart === "hide") {
      partClass = 'no-display'
      seriesClass = 'media-card-series short font-h3'
    }
    
    
    return (
    <>
      <ListGroup.Item className={seriesClass}>
        <div className="media-card-series-title">{props.seriesTitle}</div>
        <div className={partClass}>{part}</div>
      </ListGroup.Item>
    </>
    )
  }
  return null  
}

function ShowAttribution(props) {
  let iconClass=''
  switch(props.category) {
    case 'messages':
      iconClass='media-card-icon messages-icon'
      break;
    case 'blogs':
      iconClass='media-card-icon blogs-icon'
      break;
    default:
      iconClass='no-display'
  }
  
  let imageClass='media-card-profile-image'
  let cardClass='media-card-attribution font-h3'
     
  if (props.profileImage === '') {
    imageClass='no-display'
    cardClass='media-card-attribution short font-h3'
  }
  
  if (props.showAttribution) {
    let date = props.date.toUpperCase()
    return (
    <>
      <ListGroup.Item className={cardClass}>
        <Imgix
          src={props.profileImage}
          className={imageClass}
        />
        <div className="media-card-attribution-info">
          <div className="media-card-name">{props.attributionName}</div>
          <div className={iconClass}></div>
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
    linkUrl = "/" + props.mediaItem.slug
  } else {
    linkUrl = "/" + props.mediaItem.category + "/" + props.mediaItem.slug
  }
  
  useEffect(() => {
    if (!imgLoaded) {
      let imageUrl = mediaUrlConverter(props.mediaItem.image)
      if (props.mediaItem.imageScaling) {        
        setImgUrl(imageUrl + "?ar=16:9&fit=crop&h=296")      
      } else {
        setImgUrl(imageUrl + "?h=296")      
      }
      if (props.mediaItem.profileImage !== undefined) {
        if (props.mediaItem.profileImage === "") {
        } else {
          let profileImageUrl = mediaUrlConverter(props.mediaItem.profileImage)
          setProfileImgUrl(profileImageUrl + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50")
        }
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


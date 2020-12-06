import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Parse from "react-html-parser"

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
    let profileImgUrl = []
    if (props.profileImage !== undefined) {
      profileImgUrl = props.profileImage.split("/")
    }
    return (
    <>
      <ListGroup.Item className="media-card-attribution font-h3">
        <Imgix
          src={process.env.IMGIX_URL + profileImgUrl[process.env.IMG_DIR_INDEX] + "/" + profileImgUrl[process.env.IMG_FILE_INDEX] + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50"}
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
    //var imgUrl = process.env.LOGO_IMG.split('/')
    return (<></>)
  } 
            
  const [imgUrl, setImgUrl] = useState("")
//  const [profileImgUrl, setProfileImgUrl]
  const [imgLoaded, setImgLoaded] = useState(false)
  
  
  let linkUrl = ""
  if (props.mediaItem.category === "pages") {
    linkUrl = props.mediaItem.slug
  } else {
    linkUrl = "/" + props.mediaItem.category + "/" + props.mediaItem.slug
  }
  
  useEffect(() => {
    if (!imgLoaded) {
      let imgArray = props.mediaItem.image.split("/")
      setImgUrl(process.env.IMGIX_URL + imgArray[process.env.IMG_DIR_INDEX] + "/" + imgArray[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=296")
  //    let profileImgArray = mediaItem.profileImage.split("/")
  //    setProfileImgUrl(process.env.IMGIX_URL + profileImgArray[process.env.IMG_DIR_INDEX] + "/" + profileImgArray[process.env.IMG_FILE_INDEX] + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50")
      setImgLoaded(true)
    }
  }, [imgLoaded, props.mediaItem.image])
    
  return (
  <>
    <Link
      to={linkUrl}
      className="media-card-link"
    >
    <Card className="media-card">
      {imgLoaded &&
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
        <ShowAttribution
          showAttribution={props.mediaItem.showAttribution}
          attributionName={props.mediaItem.attributionName}
          profileImage={props.mediaItem.profileImage}
          date={props.mediaItem.date}
          category={props.mediaItem.category}
        />
      </ListGroup>
    </Card>
    </Link>
  </>
  )  
}


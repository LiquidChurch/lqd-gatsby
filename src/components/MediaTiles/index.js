import React, { useContext } from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'
import { GlobalContext } from '../GlobalContext/context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import SectionHeader from '../SectionHeader'
import Parse from "react-html-parser"
//import ComponentSlider from '../ComponentSlider'
import WideSlider from '../WideSlider'
import { useRecentMessages } from '../../data/useRecentMessages'
import { useMessage } from '../../data/useMessage'
import { useRecentBlogs } from '../../data/useRecentBlogs'
import { useBlog } from '../../data/useBlog'

import './styles.css'

function ShowTitle(props) {
  if (props.showBlurb) {
    return (
      <ListGroup.Item className="media-card-title">
          <div className="font-h2">{props.title}</div>
          <div className="font-small">{Parse(props.blurb)}</div>
      </ListGroup.Item>
    )
  }
  return (
   <ListGroup.Item className="media-card-title font-h2">{props.title}</ListGroup.Item>
  )
}

function ShowSeries(props) {
  if (props.showSeries && props.seriesTitle !== null) {
    let part = ""
    
    if (props.seriesPart !== null) {
      part = " • Part " + props.seriesPart
    }
    
    return (
    <>
      <ListGroup.Item className="media-card-series font-h3"><strong>{props.seriesTitle}</strong>{part}</ListGroup.Item>
    </>
    )
  }
  return null  
}

function ShowAttribution(props) {
  if (props.showAttribution) {
    let profileImgUrl = []
    if (props.profileImage !== undefined) {
      profileImgUrl = props.profileImage.split("/")
    }
    return (
    <>
      <ListGroup.Item className="media-card-attribution font-h3">
        <Imgix
          src={"https://liquidchurch.imgix.net/" + profileImgUrl[4] + "/" + profileImgUrl[5] + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50"}
          className="media-card-profile-image"
        />
        <div className="media-card-attribution-info">
          <div className="media-card-name">{props.attributionName}</div>
          <div className={"media-card-icon " + props.category + "-icon"}></div>
          <div className="media-card-date">{props.date}</div>
        </div>
      </ListGroup.Item>
      
    </>
    )
  }
  return null  
}

function MediaCard(props) {
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
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&w=262"}
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

function UseSlider(props) {
  const randomId = Math.random().toString().substr(2, 5)
  if (props.useSlider) {
    return (
      <WideSlider sliderId={randomId} touchEnabled={props.touchEnabled}>
        {props.mediaLists.map(item => {
          return (
              <MediaCard mediaItem={item} key={'Media-lists-' + item.id} />
          )
        })}
      </WideSlider>
    )
  } else {
    return (
      <Row>
        <Col className="media-card-wrap">
        {props.mediaLists.map(item => {
          return (
              <MediaCard mediaItem={item} key={'Media-lists-' + item.id} />
          )
        })}
        </Col>
      </Row>
    )
  }
}

function MediaDataTransformer(props) {
  let lists = []

  console.log('media data transformer entered')
  props.rawItems.map(item => {
    console.log(item)
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
    let formattedDate =  formatter.format(new Date(item.date));

    let attributions = ""

    item.attributions.nodes.forEach(item => {
      if (attributions === "") {
        attributions = item.name 
      } else {
        attributions = attributions + ", " + item.name
      }
    })
    
    let seriesTitle = ""
    if (item.seriesList.nodes.length !== 0) {
      seriesTitle = item.seriesList.nodes[0].name
    }
    
    let seriesPart = ""
    if (item.seriesPart !== undefined ) {
      seriesPart = item.seriesPart.part
    }
    
    lists.push( {
      "category": item.category,
      "title": item.title,
      "image": item.featuredImage.node.sourceUrl,
      "id": item.id,
      "slug": item.slug,
      "showBlurb": props.showBlurb,
      "blurb": item.content,
      "showSeries": props.showSeries,
      "seriesTitle": seriesTitle,
      "seriesPart": seriesPart,
      "showAttribution": props.showAttribution,
      "attributionName": attributions,
      "profileImage": item.attributions.nodes[0].profileImage.image.sourceUrl,
      "date": formattedDate,
    })
    return null
  })
  return lists
}

/** 
 * MediaTiles
 */
export default ({
    show_attribution,
    background_color,
    label,
    media_list,
    num_items,
    show_blurb,
    show_series,
    type,
    display_type,
  }) => {
  const ctx = useContext(GlobalContext)
  let mediaLists = []
  
  let useSlider = false
  if (display_type === "slider") {
    useSlider = true
  }
  
  if (type.toLowerCase() === "recent messages") {
    let tempItems = useRecentMessages(num_items)
    mediaLists = MediaDataTransformer({
      "rawItems":tempItems,
      "showBlurb":show_blurb,
      "showSeries":show_series,
      "showAttribution":show_attribution,
    })
  }
  
  if (type.toLowerCase() === "recent blogs") {
    let tempItems = useRecentBlogs(num_items)
     mediaLists = MediaDataTransformer({
      "rawItems":tempItems,
      "showBlurb":show_blurb,
      "showSeries":show_series,
      "showAttribution":show_attribution,
    })
  }
  
  if (type.toLowerCase() === "specify list") {
    let rawMediaList = JSON.parse(media_list)
    let tempItems = []
    rawMediaList.rows.forEach(item => {
      if (item.message !== undefined) {
        tempItems.push(useMessage(item.message.id))
      }
      if (item.blog !== undefined) {
        tempItems.push(useBlog(item.blog.id))
      }
    })
    mediaLists = MediaDataTransformer({
      "rawItems":tempItems,
      "showBlurb":show_blurb,
      "showSeries":show_series,
      "showAttribution":show_attribution,
    })
  }
  
  if (type === "") {
    mediaLists = media_list
  }
  
  if (mediaLists === undefined) {
    return (
    <>
    </>
    )
  } 
        
  return (
  <>
    <section className="fullwidth-section media-cards" style={{backgroundColor: background_color}} >
      <Container>
        <Row>
        <SectionHeader label={label} offset={0}/>
        </Row>
          <UseSlider 
            touchEnabled = {ctx.touchEnabled}
            useSlider = {useSlider}
            mediaLists = {mediaLists}
          />
      </Container>
    </section>
  </>
  )
}
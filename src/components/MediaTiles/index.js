import React, { useContext } from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'
import { GlobalContext } from '../GlobalContext/context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SectionHeader from '../SectionHeader'
//import ComponentSlider from '../ComponentSlider'
import WideSlider from '../WideSlider'
import { useRecentMessages } from '../../data/recentMessages'
import { useRecentPosts } from '../../data/recentPosts'

import './styles.css'

function MediaCard(props) {
  var imgUrl = props.mediaItem.image.split("/")
  return (
  <>
    <Link
      to={"/" + props.mediaItem.category + "/" + props.mediaItem.slug}>
    <Card className="media-card">
      <Imgix
        className="card-img-top"
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&w=262"}
        width={262}
      />
      <Card.Title className="media-card-title font-h2">{props.mediaItem.title}</Card.Title>
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
  return null
}


/** 
 * MediaTiles
 */
export default ({
    label,
    background_color,
    type,
    media_list,
  }) => {
  const ctx = useContext(GlobalContext)

  let mediaLists = []
  let useSlider = false

  if (type.toLowerCase() === "recent messages") {
    let tempItems = useRecentMessages(5)
    useSlider = true
    tempItems.map(item => {
      mediaLists.push( {
        "category": "message",
        "title": item.title,
        "image": item.featuredImage.node.sourceUrl,
        "id": item.id,
        "slug": item.slug,
      })
      return null
    })
  }
  
  if (type.toLowerCase() === "recent blogs") {
    useSlider = true
    let tempItems = useRecentPosts("blog")
    tempItems.map(item => {
      mediaLists.push( {
        "category": "blog",
        "title": item.title,
        "image": item.featuredImage.node.mediaItemUrl,
        "id": item.id,
        "slug": item.slug,
      })
      return null
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
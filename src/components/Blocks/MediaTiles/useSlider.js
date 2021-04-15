import React, { useContext, useState, useEffect } from 'react'
import MediaCard from './mediaCard'
import MediaFeatured from './mediaFeatured'
import WideSlider from '../../Commons/WideSlider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GlobalContext } from '../../GlobalContext/context'

import { useScrollPosition } from "../../../helpers/useScrollPosition"

export const UseSlider = (props) => {
  const perPageNum = 12
  const ctx = useContext(GlobalContext)
  
  // Get More code
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loadNext, setLoadNext] = useState(true)
  const [scrollTop, setScrollTop] = useState(0)
  const [updateScroll, setUpdateScroll] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [displayType, setDisplayType] = useState('grid')
  
  const loadMore = () => {
    if (!loadNext) {
      return
    }
    for (let i=0; i < perPageNum; i++) {
      let counter = (currentPage * perPageNum) + i
      if (counter < props.mediaLists.length) {
        setItems(items => [...items,  props.mediaLists[(currentPage * perPageNum) + i]])
      } else {
        setHasMore(false)
      }
    }
    setCurrentPage(currentPage + 1)
    setLoadNext(false)
    setUpdateScroll(true)
  }

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setScrollTop(-currPos.y)
      if ((currPos.th - currPos.h + currPos.y) <= currPos.h) {
        setLoadNext(true)
      }   
    },
    null,
    false,
    false,
    300
  )
  
  useEffect(() => {
      if (updateScroll) {
        window.scrollTo(0,scrollTop)
        setUpdateScroll(false)
      }
    
      if (props.displayType === "hybrid") {
        if (ctx.isMobile) {
          setDisplayType("slider")
        } else {
          setDisplayType("grid")
        }
      } else {
        setDisplayType(props.displayType)
      }
      
  },[updateScroll, scrollTop])
  
  if (hasMore) {
    loadMore()
  }
  
  // check for null item
  if (displayType === "slider") {
    return (
      <WideSlider sliderId={'slider-' + props.keyValue} touchEnabled={props.touchEnabled}>
        {props.mediaLists[0].map((item, index) => {
          return (
              <MediaCard mediaItem={item} key={'media-lists-' + props.keyValue + '-' + index} />
          )
        })}
      </WideSlider>
    )
  } 
  if (displayType === "grid") {
    return (
      <>
      <Row>
        <Col className="media-card-wrap">
        {props.mediaLists[0].map((item, index) => {
          return (
              <MediaCard mediaItem={item} key={'media-lists-' + props.keyValue + '-' + index} />
          )
        })}
        </Col>
      </Row>
      {hasMore &&
        <button className="cta-button" style={{float:'right'}} onClick={() => setLoadNext(true)}>
          Load More
        </button> 
      }
      </>
    )
  }
  
  if (displayType === "featured") {
    return (
    <>
      <MediaFeatured mediaItem={props.mediaLists[0][0]} />
    </>
    )
  }
  return null
}
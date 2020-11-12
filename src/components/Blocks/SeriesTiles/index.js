import React, { useState, useEffect, useRef } from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'
// import InfiniteScroll from "react-infinite-scroll-component"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { useRecentSeries } from "../../../data/useRecentSeries"
import { useScrollPosition } from "../../../helpers/useScrollPosition"

import "./styles.css"

function SeriesCard(props) {  
  let imgUrl = props.mediaItem.SeriesImage.image.sourceUrl.split("/")
  return (
  <>
    <Link
      to={"/" + props.mediaItem.category + "/" + props.mediaItem.slug}
      className="media-card-link"
    >
    <Card className="series-card">
      <Imgix
        className="rounded"
        src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop"}
        width={600}
      />
    </Card>
    </Link>
  </>
  ) 
}

/**
 * Series Tiles Block Component
 */
export default ({
  keyValue,
  type,
  num_items,
  exclude_id,
  layout,
  series_list,
  bg_color,
  padding,
}) => {
  const perPageNum = 12
  let tempItems = useRecentSeries(num_items, exclude_id)
  const [series, setSeries] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loadNext, setLoadNext] = useState(true)
  const [scrollTop, setScrollTop] = useState(0)
  const [updateScroll, setUpdateScroll] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  const loadMore = () => {
    if (!loadNext) {
      return
    }
    for (let i=0; i < perPageNum; i++) {
      let counter = (currentPage * perPageNum) + i
      if (counter < tempItems.length) {
        setSeries(series => [...series, tempItems[(currentPage * perPageNum) + i]])
      } else {
        setHasMore(false)
      }
    }
    setCurrentPage(currentPage + 1)
    setLoadNext(false)
    setUpdateScroll(true)
  }
  
  if (hasMore) {
    loadMore()
  } 
  const divRef = useRef(null);
  
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
  
  useEffect(
    () => {
      if (updateScroll) {
        window.scrollTo(0,scrollTop)
        setUpdateScroll(false)
      }
    },[updateScroll, scrollTop])
  
  return (
  <>
    <section className={'site-section media-cards ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
    <Container key={'container-' + keyValue}>
      <Row>
        <Col ref={divRef} className="series-card-wrap">
        {series.map((item, index) => {
            return (
              <SeriesCard mediaItem={item} key={'series-lists-' + item.id + '-' + index} />
            )
          })}
        </Col>
      </Row>
      {hasMore &&
        <button className="cta-button" style={{float:'right'}} onClick={() => setLoadNext(true)}>
          Load More
        </button> 
      }
  </Container>

</section>
  </>
  )
}
import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from '@reach/router';
import { GlobalContext } from '../../GlobalContext/context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import WideSlider from '../../Commons/WideSlider'

import { useRecentMessages } from '../../../data/useRecentMessages'
import { useMessageById } from '../../../data/useMessage'
import { useRecentBlogs } from '../../../data/useRecentBlogs'
import { useRecentPosts } from '../../../data/useRecentPosts'
import { useBlog } from '../../../data/useBlog'
import { getDate } from '../../../helpers/functions'
import { useScrollPosition } from "../../../helpers/useScrollPosition"

import MediaCard from './mediaCard'
import MediaFeatured from './mediaFeatured'
import './styles.css'

function UseSlider(props) {
  const perPageNum = 12
  
  // Get More code
  const [items, setItems] = useState([])
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
  
  useEffect(
    () => {
      if (updateScroll) {
        window.scrollTo(0,scrollTop)
        setUpdateScroll(false)
      }
  },[updateScroll, scrollTop])
  
  if (hasMore) {
    loadMore()
  }
  
  // check for null item
  if (props.displayType === "slider") {
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
  if (props.displayType === "grid") {
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
  
  if (props.displayType === "featured") {
    return (
    <>
      <MediaFeatured mediaItem={props.mediaLists[0][0]} />
    </>
    )
  }
  return null
}

function MediaDataTransformer(props) {
  let lists = []
  props.rawItems.map(item => {
    if (item === null) {
      return null
    }
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
    
    let formattedDate = ""

    if (item.publication.publishDate !== null) {
      formattedDate = formatter.format(new Date(item.publication.publishDate.replace(/\s/g, 'T'))).toUpperCase();    
    } else {
      formattedDate = formatter.format(new Date(item.date)).toUpperCase();          
    }
    
    let attributions = "Liquid Church"

    item.attributions.nodes.forEach(item => {
      if (attributions === "Liquid Church") {
        attributions = item.name 
      } else {
        attributions = attributions + ", " + item.name
      }
    })
    
    let profileImgSrc = process.env.LOGO_IMG
    if (item.attributions.nodes.length !== 0 && item.attributions.nodes[0].profileImage.image !== null) {
      profileImgSrc = item.attributions.nodes[0].profileImage.image.sourceUrl
    }
    
    let blurb = "" 
    if (item.category === "messages") {
      blurb = item.content  
    } else {
      blurb = item.mediaBlurb.blurb
    }
    
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
      "blurb": blurb,
      "showSeries": props.showSeries,
      "seriesTitle": seriesTitle,
      "seriesPart": seriesPart,
      "showAttribution": props.showAttribution,
      "attributionName": attributions,
      "profileImage": profileImgSrc,
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
    keyValue,
    show_attribution,
    media_list,
    num_items,
    show_blurb,
    show_series,
    type,
    category,
    display_type,
    bg_color,
    padding,
  }) => {
  const ctx = useContext(GlobalContext)
  const [mediaLists, setMediaLists] = useState([])
  const [mediaLoaded, setMediaLoaded] = useState(false)

  if (display_type === undefined) {
    display_type = "grid"
  }
          
  if (!mediaLoaded) {  
    if (type === "internal") {
      setMediaLists([...mediaLists, media_list])
      setMediaLoaded(true)
    }
    
    if (type === "messages") {
      let tempItems = useRecentMessages(num_items, getDate(useLocation().search))
      setMediaLists([...mediaLists, MediaDataTransformer({
        "rawItems":tempItems,
        "showBlurb":show_blurb,
        "showSeries":show_series,
        "showAttribution":show_attribution,
        })
      ])
      setMediaLoaded(true)
    }

    if (type === "blogs") {
      let tempItems = useRecentBlogs(num_items, getDate(useLocation().search))
      setMediaLists([...mediaLists, MediaDataTransformer({
        "rawItems":tempItems,
        "showBlurb":show_blurb,
        "showSeries":show_series,
        "showAttribution":show_attribution,
        })
      ])
      setMediaLoaded(true)
    }

    if (type === "posts") {
      let categoryObject = JSON.parse(category)
      let tempItems = useRecentPosts(num_items, categoryObject.id, getDate(useLocation().search))
      setMediaLists([...mediaLists, MediaDataTransformer({
        "rawItems":tempItems,
        "showBlurb":show_blurb,
        "showSeries":show_series,
        "showAttribution":show_attribution,
        })
      ])
      setMediaLoaded(true)
    }

    if (type === "custom") {
      let rawMediaList = JSON.parse(media_list)
      let tempItems = []
      rawMediaList.rows.forEach(item => {
        if (item.message !== undefined) {
          tempItems.push(useMessageById(item.message.id, getDate(useLocation().search)))
        }
        if (item.blog !== undefined) {
          tempItems.push(useBlog(item.blog.id))
        }
      })
      setMediaLists([...mediaLists, MediaDataTransformer({
        "rawItems":tempItems,
        "showBlurb":show_blurb,
        "showSeries":show_series,
        "showAttribution":show_attribution,
        })
      ])
      setMediaLoaded(true)
    }  
  }
  
  if (mediaLists.length === 0) {
    return (<></>)
  }
  
  return (
  <>
    {mediaLoaded &&
    <section className={'site-section media-cards ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
      <Container key={'container-' + keyValue}>
        <UseSlider
          touchEnabled = {ctx.touchEnabled}
          displayType = {display_type}
          mediaLists = {mediaLists}
          keyValue = {keyValue}
        />
      </Container>
    </section>
    }
  </>
  )
}
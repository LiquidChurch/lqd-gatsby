import React, { useContext, useState } from 'react'
// import { useLocation } from '@reach/router';
import { GlobalContext } from '../../GlobalContext/context'

import Container from 'react-bootstrap/Container'

import { usePageById } from '../../../data/usePage'
import { useEventById } from '../../../data/useEvent'
import { useEventsByCategory } from '../../../data/useEventsCategory'
// import { getDate } from '../../../helpers/functions'

import { UseSlider } from "../MediaTiles/useSlider"

import '../MediaTiles/styles.css'

function PageDataTransformer(props) {
  let lists = []
  props.rawItems.forEach((item, index) => {
    if (item === null) {
      return null
    }
    switch(item.type) {
      case 'pages':
        lists.push({
          "category": item.type,
          "title": item.featuredImage.node.caption,
          "image": item.featuredImage.node.mediaItemUrl,
          "imageScaling": false,
          "id": item.id,
          "slug": item.slug,
          "showBlurb": props.showBlurb,
          "blurb": item.featuredImage.node.description,
          "showSeries": props.showSeries,
          "seriesTitle": item.seriesText,
          "seriesPart": "hide",
          "showAttribution": props.showAttribution,
          "attributionName": item.attributionText,
          "profileImage": "",
          "date": "",
        })
        break;
      case 'events':
        lists.push({
          "category": item.type,
          "title": item.title,
          "image": item.featuredImage.node.mediaItemUrl,
          "imageScaling": false,
          "id": item.id,
          "slug": item.EventInfo.active ? item.slug : '',
          "showBlurb": props.showBlurb,
          "blurb": item.mediaBlurb.blurb,
          "showSeries": props.showSeries,
          "seriesTitle": item.seriesText,
          "seriesPart": "hide",
          "showAttribution": props.showAttribution,
          "attributionName": item.attributionText,
          "profileImage": "",
          "date": "",
        })
        break;
      default:
        break;
    }
  })
  return lists
}

/** 
 * PageTiles
 */
export default ({
    keyValue,
    page_list,
    show_blurb,
    show_series,
    show_attribution,
    display_type,
    bg_color,
    padding,
  }) => {
  const ctx = useContext(GlobalContext)
  const [pageLists, setPageLists] = useState([])
  const [pageLoaded, setPageLoaded] = useState(false)
  // const currentDate = getDate(useLocation().search)
  
  if (display_type === undefined) {
    display_type = "grid"
  }
          
  if (!pageLoaded) {  
      let rawPageList = JSON.parse(page_list)
      let tempItems = []
      rawPageList.rows.forEach(item => {
        let tempItem = {}
        if (item.page) {
          tempItem = usePageById(item.page.id)
          tempItem.type = 'pages'
          tempItem.seriesText = item.series_text
          tempItem.attributionText = item.attribution_text
          tempItems.push(tempItem)
        } else if (item.event) {
          tempItem = useEventById(item.event.id)
          tempItem.type = 'events'
          tempItem.seriesText = item.EventInfo.date
          tempItem.attributionText = item.EventInfo.audience
          tempItems.push(tempItem)
        } else {
          let items = useEventsByCategory(item.event_category.id)
          items.forEach(item => {
            item.type = 'events'
            item.seriesText = item.EventInfo.date
            item.attributionText = item.EventInfo.audience
            tempItems.push(item)
          })
        }
      })
      setPageLists([...pageLists, PageDataTransformer({
        "rawItems":tempItems,
        "showBlurb":show_blurb,
        "showSeries":show_series,
        "showAttribution":show_attribution,
        })
      ])
      setPageLoaded(true)
  }
  
  if (pageLists.length === 0) {
    return (<></>)
  }
      
  return (
  <>
    {pageLoaded &&
    <section className={'site-section media-cards ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
      <Container key={'container-' + keyValue}>
        <UseSlider
          touchEnabled = {ctx.touchEnabled}
          displayType = {display_type}
          mediaLists = {pageLists}
          keyValue = {keyValue}
        />
      </Container>
    </section>
    }
  </>
  )
}
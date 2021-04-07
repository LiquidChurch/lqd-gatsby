import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Heading from '../Blocks/Heading'

import MediaCard from '../Blocks/MediaTiles/mediaCard'

import algoliasearch from 'algoliasearch/lite';
import { getDate } from '../../helpers/functions'
import { InstantSearch, connectHits, SearchBox} from 'react-instantsearch-dom'
import './styles.css'
const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchIndex = process.env.GATSBY_ALGOLIA_INDEX_NAME
const searchClient = algoliasearch(appId, searchKey)

export default(location) => {
  useEffect(() => {
    let searchBoxElement = document.getElementsByClassName('ais-SearchBox-input')
    searchBoxElement[0].focus()
  })
  
  const [hasSearch, setHasSearch] = useState(false)
  return (
    <>
      <Heading
          text="Search"
          alignment="left"
          size="large"
          all_caps={false}
          add_padding={true}
          font_color="#009DD1"
          padding="top"
          bg_color="#FFF"
      />
      <InstantSearch 
        searchClient={searchClient} 
        indexName={searchIndex}
        onSearchStateChange={searchState => {
          if (searchState.query !== "") {
            setHasSearch(true)
          } else {
            setHasSearch(false)
          }
        }}
      > 
        <section className="site-section none">
          <Container>
            <Row>
              <SearchBox
                  className="searchbox "
                  translations={{
                      placeholder: 'Type something',
                  }}
              />
            </Row>
          </Container>
        </section>
        {hasSearch &&
          <CustomHits />
        }
      </InstantSearch>
    </>
  );
}

const HitsTest = (props) => {
  let pageItems = []
  let messageItems = []
  let blogItems = []
  
  props.hits.map(hit => {
   let isValid=false
   if ((hit.publishDate === null || getDate('') >= Date.parse(hit.publishDate.replace(/\s/g, 'T'))) &&
     (hit.unpublishDate === null || getDate('') < Date.parse(hit.unpublishDate.replace(/\s/g, 'T')))) {
       isValid=true
    }

    if (hit.index !== "index") {
      isValid=false
    }
    
    if (isValid) {
      const mediaItem = {
        category: hit.pageType,
        slug: hit.slug,
        image: hit.imageUrl,
        imageScaling: true,
        title: hit.title,
        blurb: hit.blurb,
        showBlurb: true,
        showSeries: false,
        showAttribution: false,
        isDynamic: true,
      }
      
      switch(hit.pageType) {
        case "pages": pageItems.push(mediaItem); break;
        case "messages": messageItems.push(mediaItem); break;
        case "blogs": blogItems.push(mediaItem); break;
        default:
      }
    }
    return null
  })
  
  return (
  <>
    <SearchListings type="Pages" listings={pageItems} />
    <SearchListings type="Messages" listings={messageItems} />
    <SearchListings type="Blogs" listings={blogItems} />
  </>
  )
}

const CustomHits = connectHits(HitsTest)

function SearchListings({type, listings}) {
  if (listings.length === 0) {return (<></>)}

  return (
    <>
      <Heading
          text={type}
          alignment="left"
          size="medium"
          all_caps={false}
          add_padding={true}
          font_color="#009DD1"
          padding="none"
          bg_color="#FFF"
      />
      <section className="site-section bottom" style={{backgroundColor: '#FFF'}} >
        <Container>
          <Row>
            <Col className="media-card-wrap">
            {listings.map((item, index) => {
              return(
              <MediaCard
                mediaItem={item} key={item.slug + '-' + index}
              />
              )
          })}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

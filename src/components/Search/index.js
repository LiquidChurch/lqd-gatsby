import React, { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Heading from '../Blocks/Heading'

import MediaCard from '../Blocks/MediaTiles/mediaCard'

import algoliasearch from 'algoliasearch/lite';
import { getDate } from '../../helpers/functions'
import { InstantSearch, connectHits, SearchBox, connectStateResults } from 'react-instantsearch-dom'
import './styles.css'
const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchIndex = process.env.GATSBY_ALGOLIA_INDEX_NAME
const searchClient = algoliasearch(appId, searchKey)

export default(location) => {
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
        <section className="site-section bottom">
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
        <section className="site-section bottom">
          <Container>
            <Row>
              <Col className="media-card-wrap">
                {hasSearch &&
                  <CustomHits />
                }
              </Col>
            </Row>
          </Container>
        </section>
      </InstantSearch>
    </>
  );
}

const HitsTest = (props) => {
  return (
  <>
    {props.hits.map(hit => {
     

     let isValid=false
     if ((hit.publishDate === null || getDate('') >= Date.parse(hit.publishDate.replace(/\s/g, 'T'))) &&
       (hit.unpublishDate === null || getDate('') < Date.parse(hit.unpublishDate.replace(/\s/g, 'T')))) {
         isValid=true
      }
     
      const mediaItem = {
        category: hit.pageType,
        slug: hit.slug,
        image: hit.imageUrl,
        title: hit.title,
        blurb: hit.blurb,
        showBlurb: true,
        showSeries: false,
        showAttribution: false,
        isDynamic: true,
    }
     return (
     <>
    {isValid &&
        <MediaCard
          mediaItem={mediaItem} key={'search-result-' + hit.slug}
        />
    }
     </>
     )
    })}
  </>
  )
}

const CustomHits = connectHits(HitsTest)

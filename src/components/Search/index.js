import React from 'react';
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Heading from '../Blocks/Heading'

import MediaCard from '../Blocks/MediaTiles/mediaCard'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, SearchBox } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import './styles.css'

const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchClient = algoliasearch(appId, searchKey)

export default(location) => {
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
        indexName="Development"
      > 
        <section className="site-section bottom">
          <Container>
            <Row>      
              <SearchBox
                  className="searchbox"
                  translations={{
                      placeholder: '',
                  }}
              />
            </Row>
          </Container>
        </section>
        <section className="site-section bottom">
          <Container>
            <Row>      
              <CustomHits />
            </Row>
          </Container>
        </section>
      </InstantSearch>
    </>
  );
}

const HitsTest = ({hits}) => {
  return (
  <>
    {hits.map(hit => {
      console.log(hit)
     
      const mediaItem = {
        category: hit.pageType,
        slug: hit.slug,
        image: hit.imageUrl,
        title: hit.title,
        blurb: hit.blurb,
        showBlurb: true,
        showSeries: false,
        showAttribution: false
    }
     console.log(mediaItem)
     return (
     <>
        <MediaCard
          mediaItem={mediaItem}
        />
     </>
     )
     
    })}
  </>
  )
}

const CustomHits = connectHits(HitsTest)


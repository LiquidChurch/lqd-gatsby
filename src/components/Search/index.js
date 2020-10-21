import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SectionHeader from '../SectionHeader'
import Heading from '../Blocks/Heading'

import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Index,
    Configure,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    connectStateResults,
} from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import './styles.css'

const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchClient = algoliasearch(appId, searchKey)

const IndexResults = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>
        No results have been found for {searchState.query} and index{' '}
        {searchResults ? searchResults.index : ''}
      </div>
    )
);

const AllResults = connectStateResults(({ allSearchResults, children }) => {
  const hasResults =
    allSearchResults &&
    Object.values(allSearchResults).some(results => results.nbHits > 0);
    
    return !hasResults ? (
      <div>
        <div>No results in category, products or brand</div>
        <Index indexName="Pages" />
        <Index indexName="Messages" />
      </div>
    ) : (
      children
    );
});

export default(location) => {
  
    return (
      <>
        <Heading text="Search" alignment="left" size="H1" background_color="#FFF"/>
        <section className="fullwidth-section">
          <Container>
            <Row>      
              <InstantSearch 
                  searchClient={searchClient} 
                  indexName="Development"
              > 
                <SearchBox
                    className="searchbox"
                    translations={{
                        placeholder: '',
                    }}
                />
                
                  <Hits hitComponent={Hit} />
              
                </InstantSearch>
              </Row>
            <Row>

            </Row>
          </Container>
        </section>
      </>
    );
}

function Hit(props) {
    return (
      <article style="background_color:white;">
        <h1>
            <a href={"/" + props.hit.pageType + "/" + props.hit.slug}>
                <Highlight attribute="title" hit={props.hit} />
                {props.hit.type}
            </a>
        </h1>
      </article>
    );
  }

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
};
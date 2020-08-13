import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SectionHeader from '../SectionHeader'
import Heading from '../Heading'

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
  console.log('all search results', allSearchResults)
  

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

const TestState = ({
  searchState,
  searchResults,
}) => {
  console.log('searchState', searchState)
  console.log('searchResults', searchResults)
}

const TestResults = ({ searchState }) => (
  console.log('testResults searchState', searchState)
)

const CustomStateResults = connectStateResults(TestResults)

export default(location) => {
    return (
      <>
        <Heading text="Search" alignment="left" size="H1" background_color="#FFF"/>
        <section className="fullwidth-section">
          <Container>
            <Row>      
              <InstantSearch 
                  searchClient={searchClient} 
                  indexName="Combined"
              > 
                <div className="search-panel__filters">
                <Configure facetFilters={["pageType:message"]}
                   />
              </div>
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
      <article>
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
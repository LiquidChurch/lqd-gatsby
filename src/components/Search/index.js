import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Index,
    Configure,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
} from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import './styles.css'

const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchClient = algoliasearch(appId, searchKey)

export default(location) => {
    return (
        <div>
            <div className="search-container">
                <InstantSearch searchClient={searchClient} indexName="Pages">
                    <div className="search-panel">
                        <div className="search-panel__results">
                            <SearchBox
                                className="searchbox"
                                translations={{
                                    placeholder: '',
                                }}
                            />
      
                  <Index indexName="Pages">
                    <Hits hitComponent={Hit}/>
                  </Index>

                  <Index indexName="Messages">
                    <Hits hitComponent={Hit}/>
                  </Index>

      
      

                        <div className="search-pagination">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </InstantSearch>
        </div>
    </div>
    );
}



function Hit(props) {
    return (
      <article>
        <h1>
            <a href={props.hit.link}>
                <Highlight attribute="title" hit={props.hit} />
            </a>
        </h1>
      </article>
    );
  }

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
};
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
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
                <InstantSearch searchClient={searchClient} indexName="Messages">
                    <div className="search-panel">
                        <div className="search-panel__results">
                            <SearchBox
                                className="searchbox"
                                translations={{
                                    placeholder: '',
                                }}
                            />
                            <Hits hitComponent={Hit}/>
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
          <Highlight attribute="title" hit={props.hit} />
        </h1>
        <p>
          <Highlight attribute="contents" hit={props.hit} />
        </p>
      </article>
    );
  }

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
};
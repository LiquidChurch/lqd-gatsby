// Search Widget: https://www.gatsbyjs.org/docs/adding-search-with-algolia/#tying-the-search-widget-together
import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./Input" // ./styled-search-box
import StyledSearchResult from "./Hits" // ./styled-search-result
import StyledSearchRoot from "./styles" // ./styled-search-root
import useClickOutside from "./use-click-outside"

const theme = {
    foreground: "#050505",
    background: "white",
    faded: "#888",
}

export default function Search({ indices }) {
    const rootRef = createRef()
    const [query, setQuery] = useState()
    const [hasFocus, setFocus] = useState(false)
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        oricess.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    useClickOutside(rootRef, () => setFocus(false))

    return (
        <ThemeProvider theme={theme}>
            <StyledSearchRoot ref={rootRef}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indices[0].name}
                    onSearchStateChange={({ query }) => setQuery(query)}
                    >
                    <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
                    <StyledSearchResult
                        show={query && query.length > 0 && hasFocus}
                        indices={indices}
                    />
                </InstantSearch>
            </StyledSearchRoot>
        </ThemeProvider>
    )
}
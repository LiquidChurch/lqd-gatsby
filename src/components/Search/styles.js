// Support File: https://www.gatsbyjs.org/docs/adding-search-with-algolia/#supporting-files
import styled, { css } from "styled-components"
import SearchBox from "./Input" // ./search-box
import SearchResult from "./Hits" // ./search-result

export default styled.div`
    position: relative;
    margin: 0.6em 0;
`

const open = css`
    width: 10em;
    background: ${({ theme }) => theme.background};
    cursor: text;
    margin-left: -1.6em;
    padding-left: 1.6em;
`

const closed = css`
    width: 0;
    background: transparent;
    cursor: pointer;
    margin-left: -1em;
    padding-left: 1em;
`

export default styled(SearchBox)`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 0;

    .SearchInput {
        outline: none;
        border: ${({ hasFocus }) => (hasFocus ? "auto" : "none")};
        font-size: 1em;
        transition: 100ms;
        border-radious: 2px
        color: ${({ theme }) => theme.foreground};
        ::placeholder {
            color: ${({ theme }) => theme.faded};
        }
        ${({ hasFocus }) => (hasFocus ? open : closed )}
    }

    .SearchIcon {
        width: 1em;
        margin: 0.3em;
        color: ${({ theme }) => theme.foreground};
        pointer-events: none;
    }
`

const Popover = css`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1em;
  border-radius: 2px;
  background: ${({ theme }) => theme.background};
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }

    li.ais-Hits-item {
      margin-bottom: 1em;

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    font-size: 80%;

    svg {
      width: 70px;
    }
  }
`
const messageQuery = `
{
    allWpMessage {
        nodes {
          id
          title
          content
          date
          slug
          tags {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              caption
              altText
            }
          }
          seriesList {
            nodes {
              name
              id
              slug
            }
          }
        }
    }
}
`

const blogQuery = `
{
    allWpBlog {
        nodes {
          id
          title
          date
          slug
          mediaBlurb {
            blurb
          }
          tags {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              caption
              altText
            }
          }
        }
    }
}
`

const pageQuery = `
{
    allWpPage {
        nodes {
          id
          title
          slug
          content
          uri
          terms {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              caption
              altText
            }
          }
        }
      }
}
`

const grabText = rawText => {
  if (rawText === null || rawText === undefined) {
    return ""
  }
  return rawText.replace(/<[^>]*>?/gm, '')
}

const featuredImageUrl = featuredImage => {
  if (featuredImage === null) {
    return null
  } else {
    return featuredImage.node.sourceUrl
  }
}

const featuredImageDesc = featuredImage => {
  if (featuredImage === null) {
    return null
  } else {
    return grabText(featuredImage.node.description)
  }
}

const pageSearchTerms = terms => {
  if (terms === null) {
    return ""
  } else {
    return terms.nodes
  }
}
/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: messageQuery,
        transformer: ({ data }) => 
          data.allWpMessage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "messages",
            title: node.title,
            blurb: node.content.replace(/<[^>]*>?/gm, ''),
            date: node.date,
            slug: node.slug,
            terms: node.tags.nodes,
            imageUrl: node.featuredImage.node.sourceUrl,
            parentPage: node.seriesList.nodes[0].name
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
                    attributesForFaceting: ['pageType']},      
    },
    {
        query: blogQuery,
        transformer: ({ data }) => 
          data.allWpBlog.nodes.map((node) => ({
            objectID: node.id,
            pageType: "blogs",
            title: node.title,
            blurb: node.mediaBlurb.blurb,
            date: node.date,
            slug: node.slug,
            terms: node.tags.nodes,
            imageUrl: node.featuredImage.node.sourceUrl            
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
                    attributesForFaceting: ['pageType']},
    },
    {
        query: pageQuery,
        transformer: ({ data }) => 
          data.allWpPage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "pages",
            title: node.title,
            blurb: featuredImageDesc(node.featuredImage),
            slug: node.uri,
            terms: pageSearchTerms(node.terms),
            imageUrl: featuredImageUrl(node.featuredImage)
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:20`],
        searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
        attributesForFaceting: ['pageType']},
    },
]

module.exports = queries


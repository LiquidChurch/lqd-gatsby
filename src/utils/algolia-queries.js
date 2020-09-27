const messageQuery = `
{
    allWpMessage {
        nodes {
          id
          title
          content
          date
          slug
          terms {
            nodes {
              name
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
          terms {
            nodes {
              name
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
        }
    }
}
`

const messageIndexName = `Messages`;
const blogIndexName = `Blogs`;
const pageIndexName = `Pages`;
const mainIndexName = "Combined";

const grabText = rawText => {
  if (rawText === null) {
    return null
  }
  return rawText.replace(/<[^>]*>?/gm, '')
}
  
/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: messageQuery,
        transformer: ({ data }) => 
          data.allWpMessage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "message",
            title: node.title,
            blurb: node.content.replace(/<[^>]*>?/gm, ''),
            date: node.date,
            slug: node.slug,
            terms: node.terms.nodes
          })),
        indexName: mainIndexName,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
                    attributesForFaceting: ['pageType']},      
    },
    {
        query: blogQuery,
        transformer: ({ data }) => 
          data.allWpBlog.nodes.map((node) => ({
            objectID: node.id,
            pageType: "blog",
            title: node.title,
            blurb: node.mediaBlurb.blurb,
            date: node.date,
            slug: node.slug,
            terms: node.terms.nodes
          })),
        indexName: mainIndexName,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
                    attributesForFaceting: ['pageType']},
    },
    {
        query: pageQuery,
        transformer: ({ data }) => 
          data.allWpPage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "page",
            title: node.title,
            blurb: grabText(node.content),
            slug: node.slug
          })),
        indexName: mainIndexName,
        settings: { attributesToSnippet: [`blurb:20`],
        searchableAttributes: ['title', 'blurb', 'date', 'terms.name'],
        attributesForFaceting: ['pageType']},
    },
]

module.exports = queries


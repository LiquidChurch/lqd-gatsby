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
          content
          link
          title
        }
    }
}
`

const messageIndexName = `Messages`;
const blogIndexName = `Blogs`;
const pageIndexName = `Pages`;
const mainIndexName = "Combined";

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
        transformer: ({ data }) => data.allWpPage.nodes,
        indexName: pageIndexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]

module.exports = queries


const messageQuery = `
{
    allWpMessage {
        nodes {
          id
          content
          link
          scriptures {
            nodes {
              name
            }
          }
          title
        }
    }
}
`

const blogQuery = `
{
    allWpBlog {
        nodes {
          id
          content
          link
          title
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

/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: messageQuery,
        transformer: ({ data }) => data.allWpMessage.nodes,
        indexName: messageIndexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
    {
        query: blogQuery,
        transformer: ({ data }) => data.allWpBlog.nodes,
        indexName: blogIndexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
    {
        query: pageQuery,
        transformer: ({ data }) => data.allWpPage.nodes,
        indexName: pageIndexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]

module.exports = queries


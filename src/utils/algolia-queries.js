const algoliaQuery = `
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

const indexName = `Messages`;

/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: algoliaQuery,
        transformer: ({ data }) => data.allWpMessage.nodes,
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]

module.exports = queries


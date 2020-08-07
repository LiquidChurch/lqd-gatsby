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

/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: algoliaQuery,
        transformer: ({ data }) => data.allWpMessage.nodes,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]

module.exports = queries


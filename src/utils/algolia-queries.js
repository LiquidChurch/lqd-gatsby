const algoliaQuery = `
{
        allWpMessage {
            nodes {
                id
                title
                content
            }
        }
}
`

function messageToAlgoliaRecord({ nodes: { title, content } } ) {
    /** Fields to be indexed */
    return{
        title,
        content
    }
}


/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: algoliaQuery,
        transformer: ({ data }) => data.allWpMessage.nodes,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]

module.exports = queries


const { graphql } = require("gatsby");

// Code from: https://www.gatsbyjs.org/docs/adding-search-with-algolia/
const MessageQuery =
  `
    query {
      allWpLqdmMessage {
        nodes {
          title
        }
      }
    }
  `
const indexName = `Messages`
const settings = { 
  attributesToSnippet: ['excerpt:20'],
  
 };
const queries = [
  {
    query: MessageQuery,
    transformer: ({ data }) => (data.allWpLqdmMessage.nodes.title),
    indexName,
    settings,
  },
];

module.exports = queries


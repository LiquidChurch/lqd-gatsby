const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { slash } = require("gatsby-core-utils")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postResult = await graphql(
    `
      query {
          allWpPost {
            nodes {
              id
              slug
              title
              categories {
                nodes {
                  id
                  name
                  slug
                }
              }
            }
          }
      }
    `
  )
  
  if (postResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Post.`)
    return
  }

  if (postResult.data.allWpPost.nodes) {
    postResult.data.allWpPost.nodes.forEach(post => {
      createPage({
        path: `/${post.categories.nodes[0].slug}/${post.slug}`,
        component: slash(path.resolve(`./src/templates/post.js`)),
        context: {
          id: post.id,
        },
      })
    })
  }

  const pageResult = await graphql(
    `
      query {
          allWpPage {
            nodes {
              id
              slug
              title
              uri
            }
          }
        
      }
    `
  )
  
  if (pageResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Page.`)
    return
  }

  if (pageResult.data.allWpPage.nodes) {
    pageResult.data.allWpPage.nodes.forEach(page => {
      createPage({
        path: page.uri.slice(1,-1),
        component: slash(path.resolve(`./src/templates/page.js`)),
        context: {
          id: page.id,
        },
      })
    })
  }

  const messageResult = await graphql(
    `
      query {
          allWpMessage {
            nodes {
              id
              slug
              title
            }
          }
        
      }
    `
  )

  if (messageResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Messages.`)
    return
  }

  let endMessages = false
  
  do {
    if (messageResult.data.allWpMessage.nodes) {
      messageResult.data.allWpMessage.nodes.forEach(message => {
        createPage({
          path: `/message/${message.slug}`,
          component: slash(path.resolve(`./src/templates/message.js`)),
          context: {
            id: message.id,
          },
        })
      })
      endMessages = true;
    }
  }
  while(!endMessages)
  
  const seriesListResult = await graphql(
    `
      query {
        allWpSeries {
          nodes {
            id
            slug
            name
          }
        }
      }
    `
  )
  
  if (seriesListResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Series.`)
    return
  }
  
  
  if (seriesListResult.data.allWpSeries.nodes) {
    seriesListResult.data.allWpSeries.nodes.forEach(series=> {
      createPage({
        path: `/series/${series.slug}`,
        component: slash(path.resolve(`./src/templates/series.js`)),
        context: {
          id: series.id,
        },
      })
    })
  }
  
   
}

/**
 * Import featured images.
 */
exports.createResolvers = async ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const field = {
    localFile: {
      type: `File`,
      resolve: async source => {
        let sourceUrl = source.url || source.mediaItemUrl || source.sourceUrl

        return await createRemoteFileNode({
          url: encodeURI(sourceUrl),
          store,
          cache,
          createNode,
          createNodeId,
          reporter,
        })
      },
    },
  }

  await createResolvers({
    WPGraphQL_Avatar: field,
    WPGraphQL_CoreImageBlockAttributes: field,
    WPGraphQL_MediaItem: field,
    WPGraphQL_CoreImageBlock: field,
    WPGraphQL_User: field,
  })
}

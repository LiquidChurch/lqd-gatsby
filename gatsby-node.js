const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { slash } = require("gatsby-core-utils")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // CreatePage for Posts
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

  // CreatePage for Pages
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

  // CreatePage for Messages
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
  
  // CreatePage for Blog
  const blogResult = await graphql(
    `
      query {
        allWpBlog {
          nodes {
            id
            slug
            title
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Messages.`)
    return
  }

  let endBlog = false
  
  do {
    if (blogResult.data.allWpBlog.nodes) {
      blogResult.data.allWpBlog.nodes.forEach(blog => {
        createPage({
          path: `/blog/${blog.slug}`,
          component: slash(path.resolve(`./src/templates/blog.js`)),
          context: {
            id: blog.id,
          },
        })
      })
      endBlog = true;
    }
  }
  while(!endBlog)
    
  // CreatePage for Series
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
  
  
  /*
  // Query for Images
  const mediaItemResult = await graphql(
    `
      query {
        allWpMediaItem {
          nodes {
            id
            title
            altText
            caption
            description
            mediaItemUrl
            sourceUrl
            databaseId
          }
        }
      }
    `
  )
  
  if (mediaItemResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Media Items.`)
    return
  }
  
  if (mediaItemResult.data.allWpMediaItem.nodes) {
    mediaItemResult.data.allWpMediaItem.nodes.forEach(media => {
      console.log(media)
      createPage({
        path: `/mediaItem/${media.databaseId}`,
        component: slash(path.resolve(`./src/templates/media.js`)),
        context: {
          id: media.id,
        },
      })
    })
  }  
  
  */
  
  // CreatePage for Tags
  /*const tagsResult = await graphql(
    `
      query {
        allWpTag {
          nodes {
            id
            slug
            name
          }
        }
      }
    `
  )
  
  if (tagsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Tags.`)
    return
  }
  
  if (tagsResult.data.allWpTag.nodes) {
    tagsResult.data.allWpTag.nodes.forEach(tag=> {
      createPage({
        path: `/tags/${tag.slug}`,
        component: slash(path.resolve(`./src/templates/tag.js`)),
        context: {
          id: tag.id,
        },
      })
    })
  } */  
}

/**
 * Import featured images.
 
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
    WpAvatar: field,
    WpCoreImageBlockAttributes: field,
    WpMediaItem: field,
    WpCoreImageBlock: field,
    WpUser: field,
  })
}
*/

/*
exports.createResolvers = async (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions

  await createResolvers({
    WpMediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

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
    },
  })
}
*/
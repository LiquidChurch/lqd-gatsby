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
          path: `/messages/${message.slug}`,
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
          path: `/blogs/${blog.slug}`,
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
  
  
  // CreatePage for Blog
  const jobResult = await graphql(
    `
      query {
        allWpJob {
          nodes {
            id
            slug
            title
          }
        }
      }
    `
  )

  if (jobResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Messages.`)
    return
  }

  let endJob = false
  
  do {
    if (jobResult.data.allWpJob.nodes) {
      jobResult.data.allWpJob.nodes.forEach(job => {
        createPage({
          path: `/jobs/${job.slug}`,
          component: slash(path.resolve(`./src/templates/job.js`)),
          context: {
            id: job.id,
          },
        })
      })
      endJob = true;
    }
  }
  while(!endJob)   
}


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
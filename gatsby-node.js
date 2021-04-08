const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { slash } = require("gatsby-core-utils")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

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
      console.log('{"action":"redirect", "type":"post", name":"'+ post.title +  '", "from":"' + `/blog/uncategorized/${post.slug}` + '", "to":"' + `/${post.categories.nodes[0].slug}/${post.slug}`  + '"},')
      createRedirect({
        fromPath: `/blog/uncategorized/${post.slug}`,
        toPath: `/${post.categories.nodes[0].slug}/${post.slug}`,
        redirectInBrowser: true,
        isPermanent: true
      }) 
      console.log('{"action":"redirect", "type":"post", "name":"'+ post.title +  '", "from":"' + `/blog/${post.categories.nodes[0].slug}/${post.slug}` + '", "to":"' + `/${post.categories.nodes[0].slug}/${post.slug}`  + '"},')
      createRedirect({
        fromPath: `/blog/${post.categories.nodes[0].slug}/${post.slug}`,
        toPath: `/${post.categories.nodes[0].slug}/${post.slug}`,
        redirectInBrowser: true,
        isPermanent: true
      }) 
      
      console.log('{"action":"create", "type":"post", "name":"'+ post.title +  '", "to":"' + `/${post.categories.nodes[0].slug}/${post.slug}`  + '"},')
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
            publication {
              promoSlug
            }
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
      if (page.publication.promoSlug !== null) {
        let promoSlugList = page.publication.promoSlug.split(",")
        
        for (let j=0; j < promoSlugList.length; j++) {
          let promoPath = "/" + promoSlugList[j].trim().toLowerCase()
          console.log('{"action":"redirect", "type":"page", "name":"'+ page.title +  '", "from":"' + promoPath + '", "to":"' + page.uri.slice(0,-1) + '"},')
          createRedirect({
            fromPath: promoPath,
            toPath: page.uri.slice(0,-1),
            redirectInBrowser: true,
            isPermanent: true
          }) 
        }
      }
      
      console.log('{"action":"create", "type":"page", "name":"'+ page.title +  '", "to":"' + page.uri.slice(0,-1) + '"},')      
      createPage({
        path: page.uri.slice(0,-1),
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
            seriesList {
              nodes {
                slug
              }
            }
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
        console.log('{"action":"redirect", "type":"message", "name":"'+ message.title +  '", "from":"' + `/messages/${message.seriesList.nodes[0].slug}-series/${message.slug}` + '", "to":"' + `/messages/${message.slug}`  + '"},')
        createRedirect({
          fromPath: `/messages/${message.seriesList.nodes[0].slug}-series/${message.slug}`,
          toPath: `/messages/${message.slug}`,
          redirectInBrowser: true,
          isPermanent: true
        }) 
        
        console.log('{"action":"redirect", "type":"message", "name":"'+ message.title +  '", "to":"' + `/messages/${message.slug}` + '"},')              
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
        console.log('{"action":"redirect", "type":"blog", "name":"'+ blog.title +  '", "from":"' + `/blog/elixir/${blog.slug}` + '", "to":"' + `/blogs/${blog.slug}` + '"},')
        createRedirect({
          fromPath: `/blog/elixir/${blog.slug}`,
          toPath: `/blogs/${blog.slug}`,
          redirectInBrowser: true,
          isPermanent: true
        }) 
        
        console.log('{"action":"redirect", "type":"blog", "name":"'+ blog.title +  '", "from":"' + `/blog/uncategorized/${blog.slug}` + '", "to":"' + `/blogs/${blog.slug}` + '"},')
        createRedirect({
          fromPath: `/blog/uncategorized/${blog.slug}`,
          toPath: `/blogs/${blog.slug}`,
          redirectInBrowser: true,
          isPermanent: true
        }) 
        
        console.log('{"action":"create", "type":"blog", "name":"'+ blog.title +  '", "to":"' + `/blogs/${blog.slug}` + '"},')  
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
      
      console.log('{"action":"redirect", "type":"series", "name":"'+ series.name +  '", "from":"' + `/messages/${series.slug}-series` + '", "to":"' + `/series/${series.slug}` + '"},')
      createRedirect({
        fromPath: `/messages/${series.slug}-series`,
        toPath: `/series/${series.slug}`,
        redirectInBrowser: true,
        isPermanent: true
      }) 

      console.log('{"action":"create", "type":"series", "name":"'+ series.name +  '", "to":"' + `/series/${series.slug}` + '"},')  
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
  const eventResult = await graphql(
    `
      query {
        allWpEvent {
          nodes {
            id
            slug
            title
          }
        }
      }
    `
  )

  if (eventResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query on Event.`)
    return
  }

  let endEvent = false
  
  do {
    if (eventResult.data.allWpEvent.nodes) {
      eventResult.data.allWpEvent.nodes.forEach(event => {
        console.log('{"action":"create", "type":"event", "name":"'+ event.title +  '", "to":"' + `/events/${event.slug}` + '"},')  
        createPage({
          path: `/events/${event.slug}`,
          component: slash(path.resolve(`./src/templates/event.js`)),
          context: {
            id: event.id,
          },
        })
      })
      endEvent = true;
    }
  }
  while(!endEvent)   

  
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
        console.log('{"action":"create", "type":"job", "name":"'+ job.title +  '", "to":"' + `/jobs/${job.slug}` + '"},')  
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
          let mediaItemUrl = source.mediaItemUrl
          if (source.mediaItemUrl !== undefined) {
            mediaItemUrl = source.mediaItemUrl
          }
 
          return await createRemoteFileNode({
            url: encodeURI(mediaItemUrl),
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
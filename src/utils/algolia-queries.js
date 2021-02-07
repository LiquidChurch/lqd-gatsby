const messageQuery = `
{
    allWpMessage {
        nodes {
          id
          title
          content
          date
          modified
          slug
          seo {
            metaRobotsNoindex
          }
          tags {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              caption
              altText
            }
          }
          seriesList {
            nodes {
              name
              id
              slug
            }
          }
          publication {
            unpublishDate
            publishDate
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
          modified
          slug
          seo {
            metaRobotsNoindex
          }
          mediaBlurb {
            blurb
          }
          tags {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              caption
              altText
            }
          }
          publication {
            unpublishDate
            publishDate
          }
        }
    }
}
`

const postQuery = `
{
    allWpPost {
        nodes {
          id
          title
          date
          modified
          slug
          seo {
            metaRobotsNoindex
          }
          mediaBlurb {
            blurb
          }
          tags {
            nodes {
              name
            }
          }
          categories {
            nodes {
              databaseId
              slug
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              caption
              altText
            }
          }
          publication {
            unpublishDate
            publishDate
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
          title
          slug
          modified
          uri
          seo {
            metaRobotsNoindex
          }
          search_terms {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              caption
              altText
              description
            }
          }
          publication {
            unpublishDate
            publishDate
          }
        }
      }
}
`

const grabText = rawText => {
  if (rawText === null || rawText === undefined) {
    return ""
  }
  var stringLength = rawText.length
  var tempString = rawText.substring(3, stringLength-5)
  tempString = tempString.replace(/&lt;/g, '<')
  tempString = tempString.replace(/<\/?p[^>]*>/g, "")                      
  return tempString
}

const featuredImageUrl = featuredImage => {
  if (featuredImage === null) {
    return null
  } else {
    return featuredImage.node.mediaItemUrl
  }
}

const featuredImageDesc = featuredImage => {
  if (featuredImage === null) {
    return null
  } else {
    return grabText(featuredImage.node.description)
  }
}

const pageSearchTerms = terms => {
  if (terms === null) {
    return ""
  } else {
    return terms.nodes
  }
}
/** The transformer converts the GraphQL Query into a Algolia Record */
const queries = [
    {
        query: messageQuery,
        transformer: ({ data }) => 
          data.allWpMessage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "messages",
            title: node.title,
            blurb: node.content.replace(/<[^>]*>?/gm, ''),
            date: node.date,
            modified: node.modified,
            slug: node.slug.replace(/^\/?|\/?$/, ""),
            terms: node.tags.nodes,
            imageUrl: node.featuredImage.node.mediaItemUrl,
            parentPage: node.seriesList.nodes[0].name,
            publishDate: node.publication.publishDate,
            unpublishDate: node.publication.unpublishDate,
            index: node.seo.metaRobotsNoindex
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name', 'parentPage'],
                    attributesForFaceting: ['pageType']},      
    },
    {
        query: blogQuery,
        transformer: ({ data }) => 
          data.allWpBlog.nodes.map((node) => ({
            objectID: node.id,
            pageType: "blogs",
            title: node.title,
            blurb: node.mediaBlurb.blurb,
            date: node.date,
            modified: node.modified,
            slug: node.slug.replace(/^\/?|\/?$/, ""),
            terms: node.tags.nodes,
            imageUrl: node.featuredImage.node.mediaItemUrl,
            publishDate: node.publication.publishDate,
            unpublishDate: node.publication.unpublishDate,
            index: node.seo.metaRobotsNoindex
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name', 'parentPage'],
                    attributesForFaceting: ['pageType']},
    },
    {
        query: postQuery,
        transformer: ({ data }) => 
          data.allWpPost.nodes.map((node) => ({
            objectID: node.id,
            pageType: node.categories.nodes[0].slug,
            title: node.title,
            blurb: node.mediaBlurb.blurb,
            date: node.date,
            modified: node.modified,
            slug: node.slug.replace(/^\/?|\/?$/, ""),
            terms: node.tags.nodes,
            imageUrl: node.featuredImage.node.mediaItemUrl,
            publishDate: node.publication.publishDate,
            unpublishDate: node.publication.unpublishDate,
            index: node.seo.metaRobotsNoindex
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:40`],
                    searchableAttributes: ['title', 'blurb', 'date', 'terms.name', 'parentPage'],
                    attributesForFaceting: ['pageType']},
    },
    {
        query: pageQuery,
        transformer: ({ data }) => 
          data.allWpPage.nodes.map((node) => ({
            objectID: node.id,
            pageType: "pages",
            title: node.title,
            modified: node.modified,
            blurb: featuredImageDesc(node.featuredImage),
            slug: node.uri.replace(/^\/?|\/?$/, ""),
            terms: pageSearchTerms(node.search_terms),
            imageUrl: featuredImageUrl(node.featuredImage),
            publishDate: node.publication.publishDate,
            unpublishDate: node.publication.unpublishDate,
            index: node.seo.metaRobotsNoindex
          })),
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        enablePartialUpdates: true,
        settings: { attributesToSnippet: [`blurb:20`],
        searchableAttributes: ['title', 'blurb', 'date', 'terms.name', 'parentPage'],
        attributesForFaceting: ['pageType']},
    },
]

module.exports = queries


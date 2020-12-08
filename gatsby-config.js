// Read env variables for Algolia
require("dotenv").config({
  path: `./.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://dev2.liquidchurch.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -10,
      }
    },  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url: process.env.WORDPRESS_URL,
        excludeFieldNames: [`viewer`, `dynamicContent`, `originalContent`, `className`, `blocksJSON`],
        schema: {
          timeout: 120000,
          perPage: 4,
        },
        debug: {
          graphql: {
            writeQueriesToDisk:true,
            showQueryVarsOnError: true,
          }
        },
        html: {
          useGatsbyImage: false,
        },
        type: {
          MediaItem: {
            lazyNodes: false,
          },
          Page: {
            excludeFieldNames: [`author`, `authorDatabaseId`, `authorId`, `blocksJson`, `commentCount`, `commentStatus`, `content`, `comments`, `dateGmt`, `lastEditedBy`, `previewBlocks`, `previewBlockJSON`, `template`, `terms`, `className`, `dynamicContent`, `originalContent`]
          },
          Blog: {
            excludeFieldNames: [`author`, `authorDatabaseId`, `authorId`, `blocksJson`, `commentCount`, `commentStatus`, `comments`, `dateGmt`, `lastEditedBy`, `previewBlocks`, `previewBlockJSON`, `template`, `className`, `dynamicContent`, `originalContent`]
          },
          Post: {
            excludeFieldNames: [`author`, `authorDatabaseId`, `authorId`, `blocksJson`, `commentCount`, `commentStatus`, `comments`, `dateGmt`, `lastEditedBy`, `previewBlocks`, `previewBlockJSON`, `template`, `className`, `dynamicContent`, `originalContent`]
          },
          Podcast: {
            excludeFieldNames: [`author`, `authorDatabaseId`, `authorId`, `blocksJson`, `commentCount`, `commentStatus`, `comments`, `dateGmt`, `lastEditedBy`, `previewBlocks`, `previewBlockJSON`, `template`, `className`, `dynamicContent`, `originalContent`]
          },
          Template: {
            exclude: true
          },
          Author: {
            exclude: true
          },
          Comment: {
            exclude: true
          },
          NodeWithTemplate: {
            exclude: true
          },
          NodeWithAuthor: {
            exclude: true
          },
          NodeWithComments: {
            exclude: true
          },
          NodeWithContentEditor: {
            exclude: true
          },
        },    
        develop: {
          nodeUpdateInterval: 1000
        },
        verbose:true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/blogs",
          "**/media",
          "**/pages",
          "**/series",
          "**/tags",
          "**/taxonomies",
          "**/frontpage",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `liquid-church`,
        short_name: `lqd`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#14a7e0`,
        display: `minimal-ui`,
        icon: `src/assets/images/logo-liquid-transparent.png`,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
        chunkSize: 20,
        enablePartialUpdates: false,
        matchFields: ['slug', 'modified'],
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["IMGIX_URL", "IMG_DIR_INDEX", "IMG_FILE_INDEX", "GATSBY_ALGOLIA_INDEX_NAME", "LOGO_IMG", "GOOGLE_API_KEY"]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-153198283-1",
        head: true,
        respectDNT: true,
        pageTransitionDelay: 200,
        defer: false,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "244993876026990",
      },
    },
    `gatsby-plugin-meta-redirect`,
  ],
}
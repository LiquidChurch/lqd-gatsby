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
        schema: {
          timeout: 120000,
          perPage: 15,
        },
        debug: {
          graphql: {
            writeQueriesToDisk:false,
            showQueryVarsOnError: true,
          }
        },
        html: {
          useGatsbyImage: false
        },
        type: {
          MediaItem: {
            lazyNodes: false
          },
          Post: {
            limit:50
          }
        },    
        develop: {
          nodeUpdateInterval: 700
        },
        auth: {
          htaccess: {
            username: 'webmaster',
            password: 'jO0Ydhg@@NxdKwH(3oZseelb',
          }
        },
        verbose:true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/blogs",
          "**/pages",
          "**/media",
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
        chunksize: 10000
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["IMGIX_URL", "IMG_DIR_INDEX", "IMG_FILE_INDEX", "GATSBY_ALGOLIA_INDEX_NAME", "LOGO_IMG", "GOOGLE_API_KEY"]
      },
    },
  ],
}
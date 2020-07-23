module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
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
        url: `http://gatsby.liquidchurch.com/graphql`,
        debug: {
          graphql: {
            writeQueriesToDisk:true,
          }
        },
        html: {
          useGatsbyImage: false,
        },
        type: {
          MediaItem: {
            lazyNodes: false,
          }
        },
        verbose:true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
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
  ],
}

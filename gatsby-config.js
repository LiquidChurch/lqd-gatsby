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
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url: `http://gatsby.liquidchurch.com/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `wp-gatsby-starter`,
        short_name: `wgs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#14a7e0`,
        display: `minimal-ui`,
        icon: `src/assets/images/logo-liquid-transparent.png`,
      },
    },
  ],
}

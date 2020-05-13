# Liquid Gatsby's Theme

Liquid church's website theme built using Gatsby as the front end with a Wordpress back end. 

## Technology Stack

* Gatsby - [WP-Gastby-Starter](https://github.com/cjkoepke/wp-gatsby-starter)
* React Bootstrap - [Gatsby-React-Bootstrap-Starter](https://github.com/billyjacoby/gatsby-react-bootstrap-starter)
* Feather Icons - [React Feather](https://github.com/feathericons/react-feather)

## Quick start

1. Cloning the repository.

2. `npm run install`

3. `npm start` 
    
    The development server is currently set with host 0.0.0.0 and port 3000. This is due to the codeanywhere environment that is being used and can be changed by modifying package.json.


## Structure

Here is a top level overview of the files for Gastby

**`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser. This is also where CSS libraries are imported.

**`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail). This is also where the wordpress source is set.

**`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

**`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

**`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

**`/src/assets`**: This directory contains images and the base CSS file for your static build. This includes theme images, such as the site logo.

**`/src/components`**: This directory contains all the components throughout the starter project that can be used, including the main Layout component that wraps page content.

**`/src/data`**: This file includes helpful details like GraphQL fragments that are used throughout queries, as well as custom hooks for easily grabbing static data like Site Title and Description within a component.

**`/src/helpers`**: This includes helper functions used within components to determine things like whether or not a link is relative and should be converted to a local link, and any Higher-Order-Components that abstract this functionality away.

**`/src/pages`**: This includes the home page template for the static build, and the 404 template.

**`/src/templates`**: This is where you'll add template files that are used in gatsby-node.js when generating pages and posts from your WordPress install. Think of them like page templates.

## Release History

* 0.0.1 - Pre-Release

## License

Copyright (c) 2020 Liquid Church
Licensed under the MIT license
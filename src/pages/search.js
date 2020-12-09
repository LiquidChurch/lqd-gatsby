import React, { useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import Search from '../components/Search'
import { Helmet } from 'react-helmet';
import { isAppView } from '../helpers/functions'

export default ({ location }) => {
  const ctx = useContext(GlobalContext)
 
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  useEffect(() => {
    ctx.setTheme(theme)
  }, [ctx, theme])

  return (
    <Layout location={location}>
        <Helmet>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css" integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossorigin="anonymous" />
        </Helmet>
        <article className="Page">
          <Search />
        </article>
    </Layout>
  )
}
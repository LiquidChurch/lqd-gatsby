import React, { useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import Jobs from '../components/Jobs'
import { Helmet } from 'react-helmet';

export default ({ location }) => {
 const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("light")
  })

  return (
    <Layout location={location}>
        <Helmet>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css" integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossorigin="anonymous" />
        </Helmet>
        <article className="Page">
          <Jobs />
        </article>
    </Layout>
  )
}
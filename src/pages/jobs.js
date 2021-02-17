import React, { useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import Jobs from '../components/Jobs'
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
        </Helmet>
        <article className="Page">
          <Jobs location={location}/>
        </article>
    </Layout>
  )
}
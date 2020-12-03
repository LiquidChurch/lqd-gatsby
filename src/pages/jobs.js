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
        </Helmet>
        <article className="Page">
          <Jobs />
        </article>
    </Layout>
  )
}
import React, { useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import Search from '../components/Search'

export default ({ location }) => {
 const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("Dark")
  })

  return (
    <Layout location={location}>
        <article className="Page">
          <Search />
        </article>
    </Layout>
  )
}
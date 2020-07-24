import React from "react"
import Layout from "../components/Layout"
//import Button from "../components/Button"

export default ({ location }) => {
  return (
    <Layout location={location}>
      <div className="post">
        <h1>Whoops! This page doesn't exist.</h1>
      </div>
    </Layout>
  )
}

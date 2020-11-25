import React, { useEffect, useContext } from "react"
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import Heading from "../components/Blocks/Heading"

export default ({
  location,
}) => {
  
  const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("light")
  })
  
  console.log('tag page:', location)
  return (
  <>    
    <Layout location={location}>
    <Helmet>
    </Helmet>
    <Heading
    text={'Tag ' + location.hash}
    alignment="left"
    size="large"
    all_caps={false}
    add_padding={true}
    font_color="#009DD1"
    padding="top"
    bg_color="#FFF"
    />
    </Layout>
  </>
  )
}
import React, { useEffect, useContext } from "react"
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MediaCard from '../components/Blocks/MediaTiles/mediaCard'
import { GlobalContext } from '../components/GlobalContext/context'
import Heading from "../components/Blocks/Heading"
import { getDate } from '../helpers/functions'
import { useTags } from '../data/useTags'

export default ({
  location,
}) => {
  const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("light")
  })
  
  let tagList = useTags(location.hash.substring(1), getDate(location.search))
  
  let hasResult = true
  if (tagList === null) {
    hasResult = false
  }
  
  console.log(tagList)
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
      {hasResult ?
        <section className="site-section bottom">
          <Container>
            <Row>
              <Col className="media-card-wrap">
              <HitsTest
                hits={tagList.messages}/>
              </Col>
            </Row>
          </Container>
          </section>
      :''}
    </Layout>
  </>
  )
}


const HitsTest = ({hits}) => {
  return (
  <>
    {hits.nodes.map(hit => {
     console.log(hit)
      const mediaItem = {
        category: "messages",
        slug: hit.slug,
        image: hit.featuredImage.node.mediaItemUrl,
        title: hit.title,
        blurb: hit.content,
        showBlurb: true,
        showSeries: false,
        showAttribution: false
    }
     return (
     <>
        <MediaCard
          mediaItem={mediaItem}
        />
     </>
     )
     
    })}
  </>
  )
}

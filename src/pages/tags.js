import React, { useEffect, useContext } from "react"
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MediaCard from '../components/Blocks/MediaTiles/mediaCard'
import { GlobalContext } from '../components/GlobalContext/context'
import { useScrollPosition } from "../helpers/useScrollPosition"
import Heading from "../components/Blocks/Heading"
import { getDate } from '../helpers/functions'
import { useTags } from '../data/useTags'
import { isAppView } from '../helpers/functions'

export default ({
  location,
}) => {
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }

  useScrollPosition(
    ({ prevPos, currPos }) => {
      ctx.setScrollPos(-currPos.y)
    },
    null,
    false,
    false,
    100
  )
  
  useEffect(() => {
    ctx.setTheme(theme)
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }

    if (ctx.currPath === "") {
      ctx.setPath(location.pathname)
    }

    if (ctx.currPath !== location.pathname && ctx.prevPath !== location.pathname) {
      ctx.resetScroll()
      setTimeout(() => ctx.setPath(location.pathname),0)
    } else if (ctx.prevPath === location.pathname) {
      setTimeout(() => { window.scrollTo({
                         top: ctx.scrollPos,
                        })},100)
      ctx.setPath('back')
    } else {
      ctx.setPath(location.pathname)        
    }
  }, [ctx, theme])
  
  let tagList = useTags(location.hash.substring(1), getDate(location.search))
  
  let hasResult = true
  if (tagList === null) {
    hasResult = false
  }
  
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

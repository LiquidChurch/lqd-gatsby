import React, { useContext, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { Link } from 'gatsby'
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"

import PageBlocks from "../components/PageBlocks"
import Heading from "../components/Blocks/Heading"

import { GlobalContext } from '../components/GlobalContext/context'
import { useScrollPosition } from "../helpers/useScrollPosition"
import { getDate, isAppView } from '../helpers/functions'
import { locationLookup, jobTypeLookup, postLengthCalc } from '../helpers/jobHelper'

function JobPageButtons(props) {
  return (
    <>
      <section className={'site-section both'}>
        <Container>
          <Row>
            <Col className="flex-space-between">
              <Link
                className="btn font-btn-large btn-left"
                to={"/jobs"}
              > 
                Back
              </Link>
              <a href={props.appUrl} className="btn font-btn-large btn-right">Apply</a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

function JobPageInfo(props) {
  return (
  <>
    <section className={'site-section bottom'}>
      <Container>
        <Row>
          <Col className={'flex-space-between'}>
            <div className={'job-location'}>{props.location}</div>
            <div className={'job-type'}>{props.jobType}</div>
            <div className={'job-post-length'}>{props.postLength}</div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}

/**
 * Template - Job Component
 */
export default ({
  location,
  data: {
    lqdmJob
  },
}) => {
  const generalSettings = useGeneralSettings()    
  const ctx = useContext(GlobalContext)

  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  var pageValid = false
  if ( (lqdmJob.publication.publishDate === null || getDate(location.search) >= Date.parse(lqdmJob.publication.publishDate.replace(/\s/g, 'T'))) &&
       (lqdmJob.publication.unpublishDate === null || getDate(location.search) < Date.parse(lqdmJob.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  let locationText = locationLookup(lqdmJob.properties.location)
  let jobType = jobTypeLookup(lqdmJob.properties.jobType)
  
  let postLength = ''
  
  if (lqdmJob.publication.publishDate !== null ) {
    postLength = postLengthCalc(lqdmJob.publication.publishDate.replace(' ', 'T'))
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
    if (!pageValid) {
      navigate('/jobs')
    } else {
      ctx.setTheme('light')
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
                          })},200)
        ctx.setPath('back')
      } else {
        ctx.setPath(location.pathname)        
      }
      
    }
    
  }, [ctx, theme, location.pathname, pageValid])
    
  return (
    <>
    {!pageValid ? (
      ''
     ) :
      <Layout location={location}>
        <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
          <title>{Parse(lqdmJob.title)}</title>
        </Helmet>
        <article className="page">
          <Heading
              text={lqdmJob.title}
              alignment="left"
              size="large"
              all_caps={false}
              add_padding={true}
              font_color="#009DD1"
              padding="top"
              bg_color="#FFF"
          />
          <JobPageInfo
            location = {locationText}
            jobType = {jobType}
            postLength = {postLength}
          />
          <div className="blog">
            <PageBlocks {...lqdmJob} />
          </div>
          <JobPageButtons
            appUrl = {lqdmJob.properties.appUrl}
          />
        </article>
      </Layout>
    }
    </>
  )
}

export const query = graphql`
  query Job($id: String!) {
    lqdmJob: wpJob(id: { eq: $id }) {
      id
      blocks {
        ...AllBlocks
      }
      title
      slug
      uri
      publication {
        unpublishDate
        publishDate
      }
      properties {
        appUrl
        jobType
        location
      }
    }
  }
`

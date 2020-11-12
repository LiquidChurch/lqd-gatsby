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
import { isTouchEnabled, getDate } from '../helpers/functions'
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
  console.log("job:", lqdmJob.title)
  const generalSettings = useGeneralSettings()    
  const ctx = useContext(GlobalContext)
  var pageValid = false
  if ( (lqdmJob.publication.publishDate === null || getDate(location.search) >= Date.parse(lqdmJob.publication.publishDate.replace(/\s/g, 'T'))) &&
       (lqdmJob.publication.unpublishDate === null || getDate(location.search) < Date.parse(lqdmJob.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  let locationText = locationLookup(lqdmJob.properties.location)
  let jobType = jobTypeLookup(lqdmJob.properties.jobType)
  let postLength = postLengthCalc(lqdmJob.publication.publishDate)
  
  useEffect(() => {
    if (!pageValid) {
      navigate('/jobs')
    }
    ctx.setTheme("light")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
    ctx.setPath(location.pathname)
  }, [ctx, location.pathname, pageValid])
    
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

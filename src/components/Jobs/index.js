import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';

import Heading from "../Blocks/Heading"
import JobCard from "./jobCard.js"
import { useJobs } from "../../data/useJobs"
import { getDate } from '../../helpers/functions'

/** 
 * JobLists Page Component
 */
export default () => {
  
  const jobLists = useJobs(getDate(useLocation().search))
  
  return (
  <>
      <Heading
          text="Job Opportunities"
          alignment="left"
          size="large"
          all_caps={false}
          add_padding={true}
          font_color="#009DD1"
          padding="top"
          bg_color="#FFF"
      />
      <section className="site-section bottom" style={{backgroundColor: '#FFF'}} >
        <Container>
          <Row>
            <Col>
            {jobLists.map(item => {
              return(
              <JobCard 
                title={item.title}
                location={item.properties.location}
                type={item.properties.jobType}
                slug={item.slug}
              />
              )
          })}
            </Col>
          </Row>
        </Container>
      </section>
  </>
  )
}
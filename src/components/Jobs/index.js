import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';

import Heading from "../Blocks/Heading"
import JobCard from "./jobCard.js"
import { useJobs } from "../../data/useJobs"
import { getDate } from '../../helpers/functions'

function JobListings({type, listings}) {
  if (listings.length === 0) {return (<></>)}
  return (
    <>
      <Heading
          text={type}
          alignment="left"
          size="medium"
          all_caps={false}
          add_padding={true}
          font_color="#009DD1"
          padding="none"
          bg_color="#FFF"
      />
      <section className="site-section bottom" style={{backgroundColor: '#FFF'}} >
        <Container>
          <Row>
            <Col>
            {listings.map((item, index) => {
              return(
              <JobCard 
                title={item.title}
                location={item.properties.location}
                type={item.properties.jobType}
                slug={item.slug}
                key={item.properties.jobType + '-' + index}
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

/** 
 * JobLists Page Component
 */
export default ({
    location
  }) => {
 
  const jobLists = useJobs(getDate(useLocation().search), location.hash.replace('#', ''))
  
  let ftJobs = []
  let ptJobs = []
  let volJobs = []
  let vstaffJobs = []
  let internJobs = []
  
  jobLists.map(item => {
    switch(item.properties.jobType) {
      case "full": ftJobs.push(item); break;
      case "part": ptJobs.push(item); break;
      case "intern": internJobs.push(item); break;
      case "vstaff": vstaffJobs.push(item); break;
      case "vol": volJobs.push(item); break;
      default:
    }
  })
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
      <JobListings type={'Full Time'} listings={ftJobs} />
      <JobListings type={'Part Time'} listings={ptJobs} />
      <JobListings type={'Volunteer Staff'} listings={vstaffJobs} />
      <JobListings type={'Volunteer'} listings={volJobs} />
      <JobListings type={'Internship'} listings={internJobs} />
  </>
  )
}
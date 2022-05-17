import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'gatsby'

import "./styles.css"

/** 
 * Job Card Component
 */

export default ({
  title,
  location,
  slug,
  type,
}) => { 

  let jobType =""
  switch(type){
    case "full": jobType = "Full Time"; break;
    case "part": jobType = "Part Time"; break;
    case "cwc-full": jobType = "Full Time"; break;
    case "cwc-part": jobType = "Part Time"; break;
    case "intern": jobType = "Internship"; break;
    case "vstaff": jobType = "Volunteer Staff"; break;
    case "vol": jobType = "Volunteer"; break;
    default: jobType = '' 
  }

  let locationText = ""
  switch(location){
    case 'par': locationText = 'Parsippany Central Office'; break;
    case 'ess': locationText = 'Essex County'; break;
    case 'mid': locationText = 'Middlesex County'; break;
    case 'mon': locationText = 'Monmouth County'; break;
    case 'mor': locationText = 'Morris County'; break;
		case 'som': locationText = 'Somerset County'; break;
		case 'gar': locationText = 'Union County Garwood'; break;
		case 'mtn': locationText = 'Union County Mountainside'; break;
    case 'pas': locationText = 'Passaic County'; break;
    case 'mer': locationText = 'Mercer County'; break;
		case 'fut': locationText = 'Future Campuses'; break;
		case 'any': locationText = 'Anywhere'; break;
    default: locationText = ''
  }
  return (
    <>
    <div className="job-link">
    <Link to={"/jobs/" + slug}>
      <Card bsPrefix="job-card">
        <Card.Body className="job-card-body">
          <div className="job-title">{title}</div>
          <div className="job-info">
            <div className="job-location">{locationText}</div>
            <div className="job-type">{jobType}</div>
          </div>
        </Card.Body>
      </Card>
    </Link>
    </div>
    </>
  )
}
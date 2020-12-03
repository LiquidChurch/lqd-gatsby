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
		case 'fut': locationText = 'Future Campuses'; break;
		case 'any': locationText = 'Anywhere'; break;
    default: locationText = ''
  }
  return (
    <>
    <div class="job-link">
    <Link to={"/jobs/" + slug}>
      <Card bsPrefix="job-card">
        <Card.Body class="job-card-body">
          <div class="job-title">{title}</div>
          <div class="job-info">
            <div class="job-location">{locationText}</div>
            <div class="job-type">{jobType}</div>
          </div>
        </Card.Body>
      </Card>
    </Link>
    </div>
    </>
  )
}
import React from 'react'

import Col from 'react-bootstrap/Col'

function AddHR(props) {
  console.log(props)
  if (props.showHR) {
    return (
      <hr/>
    )
  } else {
     return null
   }
}
      
export default ({
  label,
  offset,
  showHR,
}) => {
  
  if (showHR === null || showHR === undefined) {
    showHR = false
  }
  
  if (label !== "" && label !== null) {
    return (
      <>
      <Col xs={{span:12, offset:0}} md={{span: 12-(offset*2), offset: offset}}>
        <h6 className="font-section-header">{label}</h6>
        <AddHR showHR={showHR} />
      </Col>
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}
import React from 'react'

import Col from 'react-bootstrap/Col'

export default ({
  label,
  offset,
}) => {
  if (label !== "" && label !== null) {
    return (
      <>
      <Col xs={{span:12, offset:0}} md={{span: 12-(offset*2), offset: offset}}>
        <h6 className="font-section-header">{label}</h6>
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
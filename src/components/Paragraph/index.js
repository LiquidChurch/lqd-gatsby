import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Parse from "react-html-parser"
import { MaybeLink } from "../../helpers/hoc"

import { Link } from 'gatsby'
import "./styles.css"

export default function Paragraph({ content, dropCap, align, fontSize }) {
  const classNames = []
  
  if (fontSize === null || fontSize === 'normal') {
    classNames.push('font-regular')
  } else {
    switch(fontSize) {
      case 'small':
        classNames.push('font-small')
        break;
      case 'medium':
        classNames.push('font-medium')
        break;
      case 'large':
        classNames.push('font-large')
        break;
      case 'huge':
        classNames.push('font-huge')
        break;
    } 
  }
  
  if (dropCap) {
    classNames.push(`font-dropCap`)
  }

  if (align) {
    classNames.push(`p--${align}`)
  }

  const options = {
    transform: node => {
      if ("tag" === node.type && "a" === node.name) {
        return (
          <MaybeLink
            key={node?.attribs?.href}
            url={node?.attribs?.href}
            label={node?.children?.[0]?.data}
          />
        )
      }
    },
  }
  return (
    <Container>
      <Row>
        <p className={classNames.length ? classNames.join(" ") : null}>
          {Parse(content, options)}
        </p>
      </Row>
    </Container>
  )
}

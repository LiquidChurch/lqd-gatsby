import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Parse from "react-html-parser"
import { MaybeLink } from "../../helpers/hoc"

import "./styles.css"

export default function Paragraph({ content, dropCap, align, fontSize }) {
  const classNames = []
  
  if (fontSize === null) {
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
      default:
        classNames.push('font-regular')
    } 
  }
  
  if (dropCap) {
    classNames.push(`font-dropCap`)
  }

  if (align) {
    classNames.push(`p--${align}`)
  }

  return (
    <Container>
      <Row>
        <p className={classNames.length ? classNames.join(" ") : null}>
          {Parse(content)}
        </p>
      </Row>
    </Container>
  )
}

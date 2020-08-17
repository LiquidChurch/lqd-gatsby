import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CallToAction from '../CallToAction'
import { useImageById } from "../../data/useImage"
import { usePageSlugById } from "../../data/usePage"

import Parse from "react-html-parser"
import { RichTextHelper } from "../../helpers/functions"

import "./photoTab.css"

function TabImage(props) {
  const image_info = useImageById(props.tab_image_id)
   
  if (image_info !== undefined) {
    var imgUrl = image_info.mediaItemUrl.split("/")
    return (
      <Col xs={12} sm={12} md={6} lg={6} className="photo-tab-image-col">
        <Imgix 
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?h=296"}
          className="photo-tab-image"
          />
      </Col>
    )
  }  
  return null
}

/**
 * PhotoTab Block Component
 */
export default ({
  location,
  image_id,
  bg_color,
  header,
  text_block,
  header_secondary,
  text_block_secondary,
  cta,
}) => {
  const ctaObject = JSON.parse(cta)
  
  const imageInfo = useImageById(image_id)
  var imgUrl = imageInfo.mediaItemUrl.split("/")
  
  var imgOrder = 1
  var textOrder = 2
  
  if (location === "right") {
    imgOrder = 2
    textOrder = 1
  }

  if (text_block !== "" && text_block !== undefined) { 
    var textBlock = RichTextHelper(text_block)
  }
  
  console.log("text Block", textBlock)
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: bg_color}}>
  <Container>
    <Row className="photo-tab-row">
      <Col xs={{span: 12, order: 1}} lg={{span: 6, order: imgOrder}} className="photo-tab-image-col">
        <Imgix 
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=1:1&fit=crop&h=545"}
          className="photo-tab-image"
          />
      </Col>    
      <Col  xs={{span: 12, order: 2}} lg={{span: 6, order: textOrder}}  id={"photo-tab-body-" + image_id}>
        <h2 className={"photo-tab-tag font-h1 tab-left"}>{Parse(header)}</h2>
        <div className={"photo-tab-text font-regular tab-left"}>{Parse(textBlock)}</div>
        <div className={"photo-tab-cta tab-left"}>
          {
            ctaObject.rows.map(cta => {
              return (
                <CallToAction cta={cta} />
              )
            })
          }
        </div>
      </Col>

     
    </Row>    
  </Container>
  </section>
  </>
  )
}



/*
import React from 'react';
import ReactDOM from 'react-dom';

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './photoTab.css';
import photo  from './photo.jpg';
import PhotoTab from './PhotoTab';

class PhotoTabs extends React.Component {
    render() {
        

        return(
            <div>
              <h2 className="linked-tile-title">PhotoTabs</h2>
                
          <Container>
          <Row xs={12} md={6}>
            <Col>
              <PhotoTab
                href="#"
                src={photo}
                className="linked-tile-img"
                alt="Link Tile"     
                />
            </Col>

            <Col>
                <h2>Watch On-Demand</h2>
                <p>Lorem ipsum dolor sit amet, mea disputando 
                    signiferumque ne, id vim laoreet evertitur. 
                    Admodum tacimates delicatissimi et cum, 
                    nec ludus latine suscipit ne. 
                    Nominavi epicurei disputationi ne usu, 
                    usu brute percipitur dissentias ut, 
                    at eos mandamus indoctum reprehendunt. 
                    No sed pertinax nominati.</p>

                <button>This CTA is a big deal</button>
            </Col>
            
          </Row>
          </Container>
          
            </div>
        );
    }

}

ReactDOM.render(<PhotoTabs/>, document.getElementById('root'));

*/

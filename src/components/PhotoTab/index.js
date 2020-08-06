import React, { useContext } from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import { useImage } from "../../data/image"

import Parse from "react-html-parser"

import "./photoTab.css"

function TabImage(props) {
  const image_info = useImage(props.tab_image_id)
  
  if (image_info !== undefined) {
    var imgUrl = image_info.mediaItemUrl.split("/")
    return (
      <Col xs={12} sm={12} md={4} lg={3} className="photo-tab-image-col">
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
  cta_slug,
  cta_text,
  tab_bg_img,
  tab_color,
  tab_tag,
  tab_text,
  tab_image,
}) => {
  var hasImage = false
  
  if (tab_image !== null) {
    hasImage = true
  }
  
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: tab_color}}>
  <Container>
    <Row>
      <TabImage tab_image_id={tab_image} />
      <Col id={"tab-body-" + cta_slug} className={hasImage ? "vertical-center tab-pad-left" : "vertical-center"}>
        <h2 className={hasImage ? "photo-tab-tag font-h1 tab-left" : "photo-tab-tag font-h1"}>{Parse(tab_tag)}</h2>
        <p className={hasImage ? "photo-tab-text font-large tab-left" : "photo-tab-text font-large"}>{tab_text}</p>
        <div className={hasImage ? "photo-tab-cta tab-left" : "photo-tab-cta"}>
          <TabLink cta_text={cta_text} cta_slug={cta_slug} />
        </div>
      </Col> 
    </Row>

    <Row>
      <Col id={"tab-body-" + cta_slug} className={hasImage ? "vertical-center tab-pad-left" : "vertical-center"}>
        <h2 className={hasImage ? "photo-tab-tag font-h1 tab-left" : "photo-tab-tag font-h1"}>{Parse(tab_tag)}</h2>
        <p className={hasImage ? "photo-tab-text font-large tab-left" : "photo-tab-text font-large"}>{tab_text}</p>
        <div className={hasImage ? "photo-tab-cta tab-left" : "photo-tab-cta"}>
          <TabLink cta_text={cta_text} cta_slug={cta_slug} />
           <TabImage tab_image_id={tab_image} />
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

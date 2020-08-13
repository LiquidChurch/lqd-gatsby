import React from 'react';


import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './tiles.css';

import LinkTile from './LinkTile';


/* class LinkedTiles extends React.Component {
    render() { 
        */

export default ({slugs_list}) => {
  var obj_slugs_list = JSON.parse(slugs_list)

    console.log(obj_slugs_list)
  
        return(
            <div>
              
          <Container>
          <Row>          
          {obj_slugs_list.rows.map(item => {
                 return (
            <Col key={"linked-tile-img-" + item.page_slug.id} sm={4} xs={6}>
              <LinkTile
                page_slug_id={item.page_slug.id}       
                />
            </Col>
            )})}
       
          
          </Row>
          </Container>
          
            </div>
          
        );
    }
    

//}

//ReactDOM.render(<Tiles/>, document.getElementById('root'));

//export default LinkedTiles;
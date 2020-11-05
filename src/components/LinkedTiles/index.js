import React from 'react';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './styles.css';
import LinkTile from './linkTile';

export default ({
    slugs_list,
    bg_color,
    padding,
  }) => {
  var obj_slugs_list = JSON.parse(slugs_list)
  return( 
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
      <Container>
        <Row>          
          {obj_slugs_list.rows.map(item => {
            return (
              <Col sm={12} md={6} lg={4} key={"linked-tile-img-" + item.page_slug.id}>
                <LinkTile
                  page_slug_id={item.page_slug.id}       
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  );
} 
import React from 'react';
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
              <LinkTile
                page_slug_id={item.page_slug.id}       
              />
            )
          })}
        </Row>
      </Container>
    </section>
  );
} 
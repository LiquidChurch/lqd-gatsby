import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { useRecentSeries } from "../../../data/useRecentSeries"

import "./styles.css"

function SeriesCard(props) {
  var imgUrl = props.mediaItem.SeriesImage.image.sourceUrl.split("/")
  return (
  <>
    <Link
      to={"/" + props.mediaItem.category + "/" + props.mediaItem.slug}
      className="media-card-link"
    >
    <Card className="series-card">
      <Imgix
        className="rounded"
        src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop"}
        width={600}
      />
    </Card>
    </Link>
  </>
  )
  
}

/**
 * Series Tiles Block Component
 */

export default ({
  type,
  num_items,
  layout,
  series_list,
  bg_color,
  padding,
}) => {
  let tempItems = useRecentSeries(num_items)
  console.log('num items', num_items)
  return (
  <>
    <section className={'site-section media-cards ' + padding} style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        <Col className="series-card-wrap">
        {tempItems.map(item => {
          return (
              <SeriesCard mediaItem={item} key={'Media-lists-' + item.id} />
          )
        })}
        </Col>
      </Row>
  </Container>
</section>
  </>
  )
}
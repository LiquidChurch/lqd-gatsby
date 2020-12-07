import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'
import { useImageById } from "../../../data/useImage"
import './styles.css'

/**
 * Photo Grid
 */
export default ({
  keyValue,
  column,
  max_width,
  image_list,
  bg_color,
  padding,
}) => {
  let imageGrid = []
  let imageListObject = {}
  if (max_width === null || max_width < 10) {
    max_width=1140/column
  }
  let colNum = 12/column
  if (image_list !== undefined) {
      imageListObject = JSON.parse(image_list)
    } else {
      return (<></>)
    }

  let imagesInfo = []
  imageListObject.rows.forEach((item,i) => {
    let tempItem = useImageById(item.image)
    tempItem.mediaArray = tempItem.mediaItemUrl.split("/")
    tempItem.tabBehavior = imageListObject.rows[i].tab_behavior
    tempItem.linkUrl = imageListObject.rows[i].url
    imagesInfo.push(tempItem)
  })
           
  let i = 0
  do {
    let tempArray = []
    for (let j=0; j < column; j++) {
      if (typeof(imageListObject.rows[i]) !== "undefined"){
        tempArray.push(imagesInfo[i])
      } else {
        tempArray.push({})
      }
      i = i + 1
    }
    imageGrid.push(tempArray)
  } while (i < imageListObject.rows.length)
             
  return (
  <>
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
      <Container>
        {imageGrid.map(col => {
          return (
            <Row>
              {col.map(image => {
                console.log('photo-grid', image)
                return (
                <Col sm={12} md={colNum}>
                  {image.id && 
                    <>
                      {
                        {
                        'none':<Imgix 
                                  src={process.env.IMGIX_URL + image.mediaArray[process.env.IMG_DIR_INDEX] + "/" + image.mediaArray[process.env.IMG_FILE_INDEX]}
                                  className="photo-grid-image"
                                  width={max_width} />,
                        'open':<a href={image.linkUrl}>
                               <Imgix 
                                  src={process.env.IMGIX_URL + image.mediaArray[process.env.IMG_DIR_INDEX] + "/" + image.mediaArray[process.env.IMG_FILE_INDEX]}
                                  className="photo-grid-image"
                                  width={max_width} />
                                </a>,
                        'new':<a href={image.linkUrl} target="_blank">
                               <Imgix 
                                  src={process.env.IMGIX_URL + image.mediaArray[process.env.IMG_DIR_INDEX] + "/" + image.mediaArray[process.env.IMG_FILE_INDEX]}
                                  className="photo-grid-image"
                                  width={max_width} />
                                </a>,
                        'download':<a href={image.linkUrl} download>
                               <Imgix 
                                  src={process.env.IMGIX_URL + image.mediaArray[process.env.IMG_DIR_INDEX] + "/" + image.mediaArray[process.env.IMG_FILE_INDEX]}
                                  className="photo-grid-image"
                                  width={max_width} />
                                </a>}[image.tabBehavior]
                            }
                        </>
                  }
                   
                </Col>
               )               
              })}  
            </Row>
          )    
        })}
      </Container>
    </section>
  </>
  )
}
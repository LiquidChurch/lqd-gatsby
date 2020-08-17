import React from "react"
import Parse from 'react-html-parser'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"

export default ({ page_slug_id }) => {  
  const page_info = useFeaturedImage(page_slug_id)

  if (page_info === undefined) {
    return (
    <>
    </>
    )
  }

  var imgUrl = page_info.featuredImage.node.mediaItemUrl.split("/")
  
  return (
  <>
    <Link 
      to={page_info.uri}
      key={"linked-tile-img-1" + page_info.databaseId}
    >
    <div className="linked-tile">
     <Imgix 
      src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=296"}
      altText={page_info.featuredImage.node.altText}
      className="linked-tile-image"
       />   
      <h2 className="hero-text font-h2">{Parse(page_info.featuredImage.node.caption)}</h2>
    </div>
    </Link>
  </>
  )
}

    
  
  
/* function LinkTile (props) {
  
  return (              
             <a href={props.href}><img className={props.className} src={props.src}  alt={props.alt} /></a> 
               
         );
  } 

export default LinkTile */
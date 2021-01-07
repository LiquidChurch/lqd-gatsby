import React from 'react'
import Imgix from 'react-imgix'
import Parse from "react-html-parser"

import { mediaUrlConverter } from '../../../helpers/functions'
import { useAttributionById } from '../../../data/useAttribution'

const FeaturedAttribute = ({
    attribute,
    showBlurb,
    showEmail,
  }) => {
  const attributeObject = useAttributionById(attribute.id)
  const imageUrl = mediaUrlConverter(attributeObject.profileImage.image.mediaItemUrl)
    
  return (
  <>
    <div>
      <Imgix 
        src={imageUrl + "?ar=1:1&fit=crop&crop=faces&mask=ellipse&w=240&h=240"}
        className={'attribution-profile-image'}
        height={240}
        width={240}
      />
      <div className={showBlurb ? 'attribution-profile-blurb bottom font-small' : 'no-display'}>
        <p>{attributeObject.profileImage.blurb}</p>
      </div>
    </div>
    <div className={'attribution-profile-information'}> 
      <div className={'font-h1'}>
        {attributeObject.name}
      </div>
      <div className={'attribution-profile-role font-h2'}
           style={{textTransform:'uppercase'}}>
        {attributeObject.profileImage.role}
      </div>
      <div className={showEmail ? 'attribution-profile-email font-h2' : 'no-display'}>
        <a href={'mailto:'+ attributeObject.profileImage.email}
           style={{color:'#009DD1'}}>
          {attributeObject.profileImage.email}
        </a>
      </div>
      <div className={'attribution-profile-description font-regular'}>
        {Parse(attributeObject.description)}
      </div>
    </div>    
  </>
  )
}

export default FeaturedAttribute
import React from 'react'
import Imgix from 'react-imgix'

import { useAttributionById } from '../../../data/useAttribution'

const FeaturedAttribute = ({
    attribute,
    showBlurb,
    showEmail,
  }) => {
  const attributeObject = useAttributionById(attribute.id)
  const imageUrl = attributeObject.profileImage.image.mediaItemUrl.split("/")
  console.log('featured attribute', attributeObject)
  return (
  <>
    <div>
      <Imgix 
        src={"https://liquidchurch.imgix.net/" + imageUrl[4] + "/" + imageUrl[5] + "?mask=ellipse&w=240&h=240"}
        className={'attribution-profile-image'}
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
        {attributeObject.description}
      </div>
    </div>    
  </>
  )
}

export default FeaturedAttribute
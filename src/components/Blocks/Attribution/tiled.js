import React from 'react'
import Imgix from 'react-imgix'

import { useAttributionById } from '../../../data/useAttribution'

const TiledAttribute = ({
    attribute,
    showBlurb,
    showEmail,
  }) => {
  console.log(attribute)
  const attributeObject = useAttributionById(attribute.id)
  const imageUrl = attributeObject.profileImage.image.mediaItemUrl.split("/")
  console.log('featured attribute', attributeObject)
  return (
  <>
    <div> 
      <Imgix 
        src={process.env.IMGIX_URL + imageUrl[4] + "/" + imageUrl[5] + "?mask=ellipse&w=137&h=137"}
        className={'attribution-secondary-profile-image'}
      />
      <div className={showBlurb ? 'attribution-profile-blurb top font-small' : 'no-display'}>
        <p>{attributeObject.profileImage.blurb}</p>
      </div>              
    </div>
    <div className={'attribution-secondary-profile-information'}>
      <div className={'font-h2'}>
        {attributeObject.name}
      </div>
      <div className={'attribution-profile-role font-h3'}
           style={{textTransform:'capitalize'}}>
        {attributeObject.profileImage.role}
      </div>
      <div className={showEmail ? 'attribution-profile-email font-regular' : 'no-display'}>
        <a href={'mailto:'+ attributeObject.profileImage.email}
           style={{color:'#009DD1'}}>
          {attributeObject.profileImage.email}
        </a>
      </div>
    </div>
  </>
  )
}

export default TiledAttribute
    
    
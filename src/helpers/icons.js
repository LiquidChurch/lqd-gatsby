import React from 'react'
import { withBaseIcon } from 'react-icons-kit'
import { socialInstagramCircular } from 'react-icons-kit/typicons/socialInstagramCircular'
import { socialFacebookCircular } from 'react-icons-kit/typicons/socialFacebookCircular'
import { socialTwitterCircular } from 'react-icons-kit/typicons/socialTwitterCircular'
import { socialYoutubeCircular } from 'react-icons-kit/typicons/socialYoutubeCircular'
import { ic_copyright } from 'react-icons-kit/md/ic_copyright'

const SideIconContainer = withBaseIcon({ size: 32, style: {color: '#14a7e0'}})
const SideIconContainerSmall = withBaseIcon({ size: 16, style: {color: '#14a7e0'}})

export const FacebookIcon = () => <SideIconContainer icon={socialFacebookCircular}/>;
export const InstagramIcon = () => <SideIconContainer icon={socialInstagramCircular}/>;
export const TwitterIcon = () => <SideIconContainer icon={socialTwitterCircular}/>;
export const YouTubeIcon = () => <SideIconContainer icon={socialYoutubeCircular}/>;
export const CopyrightIcon = () => <SideIconContainer icon={ic_copyright}/>;
export const CopyrightIconSm = () => <SideIconContainerSmall icon={ic_copyright}/>;
  

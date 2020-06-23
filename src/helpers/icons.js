import React from 'react'
import { withBaseIcon } from 'react-icons-kit'
import { ic_copyright } from 'react-icons-kit/md/ic_copyright'
import { ic_arrow_forward } from 'react-icons-kit/md/ic_arrow_forward'

const SmallIcon = withBaseIcon({size: 16, style: { color: '#B4B4B4', verticalAlign: 'text-bottom'}})
const StandardIcon = withBaseIcon({size: 20, style: { color: '#B4B4B4', verticalAlign: 'text-bottom'}})

export const ArrowRight = () => <StandardIcon icon={ic_arrow_forward} />;
export const CopyrightIcon = () => <SmallIcon icon={ic_copyright}/>;
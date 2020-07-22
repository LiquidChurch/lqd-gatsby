import React from 'react'
import { withBaseIcon } from 'react-icons-kit'
import { ic_copyright } from 'react-icons-kit/md/ic_copyright'
import { ic_arrow_forward } from 'react-icons-kit/md/ic_arrow_forward'
import { ic_clear } from 'react-icons-kit/md/ic_clear'
import { ic_play_arrow } from 'react-icons-kit/md/ic_play_arrow'

import "./icons.css"

const SmallIcon = withBaseIcon({size: 16, style: { color: '#949494', verticalAlign: 'text-bottom'}})
const StandardIcon = withBaseIcon({size: 16, style: { verticalAlign: 'text-bottom'}})
const LargeIcon = withBaseIcon({size: 28, style: { color: '#949494', verticalAlign: 'text-bottom'}})
export const ArrowRight = () => <StandardIcon icon={ic_arrow_forward} />
export const CopyrightIcon = () => <SmallIcon icon={ic_copyright} />
export const ClearIcon = () => <LargeIcon icon={ic_clear} />
export const PlayArrow = () => <StandardIcon icon={ic_play_arrow} />
  
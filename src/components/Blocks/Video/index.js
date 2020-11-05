import React from 'react'

import VideoPlayer from '../../Commons/VideoPlayer'
/** 
 * Video Block Component
 */
const VideoBlock = ({
  video_url,
  video_title,
  bg_color,
  padding,
}) => {
  
  return (
  <>
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <VideoPlayer url={video_url} title={video_title} />
  </section>
  </>
  )
}

export default VideoBlock
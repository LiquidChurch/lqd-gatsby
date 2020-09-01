import React from 'react'

import VideoPlayer from '../../Commons/VideoPlayer'
/** 
 * Video Block Component
 */
const VideoBlock = ({
  video_url,
  bg_color,
  padding,
}) => {
  console.log(video_url)
  
  
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <VideoPlayer url={video_url} />
  </section>
  </>
  )
}

export default VideoBlock
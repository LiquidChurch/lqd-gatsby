import React from "react"

/**
 * IFrame Block component.
 */
export default ({
  src,
}) => {
  return (
    <>
      <iframe src={src} title="test iframe block" width="100%" height="100%"></iframe>
    
    </>
  )
}
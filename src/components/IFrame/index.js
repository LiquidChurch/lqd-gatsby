import React from "react"

/**
 * IFrame Block component.
 */
export default ({
  src,
}) => {
  console.log('iframe block', src)
  return (
    <>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEyjZGdaropm46X5em_GY9p6VXM6PYNSQ&callback=initMap&libraries=&v=weekly"
      defer
    ></script>
      <iframe src={src} width="100%" height="100%"></iframe>
    
    </>
  )
}
import React, { useEffect } from "react"

/**
 * External Redirect Block component.
 */
export default ({
  external_url,
  new_tab,
}) => {
  console.log("external block")
  console.log(external_url)
  useEffect(() => {
    window.location.replace(external_url)  
  }, [external_url]);
  
  return (
    <>
    </>
  )
}
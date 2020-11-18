import React from 'react'

export default ({
  label
}) => {
  console.log('anchor', label)

  return (
  <>
    <a id={ label.toLowerCase() }></a>
  </>
  )
}
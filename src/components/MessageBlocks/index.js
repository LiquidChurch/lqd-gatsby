import React from "react"

import MessagePlayer from "../MessagePlayer"
/** 
 * Message Blocks
 */
export default (lqdmMessage) => {
  const blockMap = {
  }

  return (
    <>
      <MessagePlayer {...lqdmMessage} />
    </>
  )
}
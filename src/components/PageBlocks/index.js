import React from "react"

//import Image from "gatsby-image"
import BlockParagraph from "../Paragraph"
import BlockHeading from "../Heading"
import BlockImage from "../Image"
import BlockCode from "../Code"
import BlockList from "../List"
import BlockBlockquote from "../Blockquote"
import BlockButton from "../Button"
import BlockHomepageHero from "../HomepageHero"
import BlockHeroImage from "../HeroImage"
import BlockExternalRedirect from "../ExternalRedirect"
import BlockPageStrap from "../PageStrap"
import BlockHomeLinks from "../HomeLinks"
import BlockMessageTile from "../MessageTile"
import BlockMediaTile from "../MediaTile"
import BlockPageModal from "../PageModal"
import BlockLinkTiles from "../LinkTiles"p

import { PageModalProvider } from "../PageModal/context.js"

/** 
 * Page Blocks
 */
export default ({ blocks, featuredImage }) => {

  //const topImage = featuredImage?.localFile?.childImageSharp?.fluid
  const blockMap = {
    "core/paragraph": BlockParagraph,
    "core/heading": BlockHeading,
    "core/image": BlockImage,
    "core/code": BlockCode,
    "core/list": BlockList,
    "core/quote": BlockBlockquote,
    "core/button": BlockButton,
    "block-lab/homepage-hero": BlockHomepageHero,
    "block-lab/hero-image": BlockHeroImage,
    "block-lab/external-redirect": BlockExternalRedirect,
    "block-lab/page-strap": BlockPageStrap,
    "block-lab/home-links": BlockHomeLinks,
    "block-lab/message-tile": BlockMessageTile,
    "block-lab/media-tile": BlockMediaTile,
    "block-lab/page-modal": BlockPageModal,
    "block-lab/link-tiles": BlockLinkTiles,
  }

  return (
    <>
      <PageModalProvider>
      <div>
        {blocks &&
          blocks.map((data, index) => {
            const Component = blockMap[data.name] || false
            if (!Component) {
              return null
            }

            return (
              <Component key={`${data.name}-${index}`} {...data.attributes} />
            )
          })}

      </div>
      </PageModalProvider>
    </>
  )
}
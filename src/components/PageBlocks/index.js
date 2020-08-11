import React from "react"

import BlockParagraph from "../Paragraph"
import BlockList from "../List"
import BlockHeading from "../Heading"
import BlockButton from "../Button"
import BlockHomepageHero from "../HomepageHero"
import BlockHeroImage from "../HeroImage"
import BlockExternalRedirect from "../ExternalRedirect"
import BlockPageStrap from "../PageStrap"
import BlockHomeLinks from "../HomeLinks"
import BlockMessageTile from "../MessageTile"
import BlockMediaTiles from "../MediaTiles"
import BlockPageModal from "../PageModal"
import BlockLinkedTiles from "../LinkedTiles"

import { PageModalProvider } from "../PageModal/context.js"

/** 
 * Page Blocks
 */
export default ({ blocks, featuredImage }) => {
  const blockMap = {
    "core/paragraph": BlockParagraph,
    "core/list": BlockList,
    "block-lab/button": BlockButton,
    "block-lab/heading": BlockHeading,
    "block-lab/homepage-hero": BlockHomepageHero,
    "block-lab/hero-image": BlockHeroImage,
    "block-lab/external-redirect": BlockExternalRedirect,
    "block-lab/page-strap": BlockPageStrap,
    "block-lab/home-links": BlockHomeLinks,
    "block-lab/message-tile": BlockMessageTile,
    "block-lab/media-tiles": BlockMediaTiles,
    "block-lab/page-modal": BlockPageModal,
    "block-lab/link-tiles": BlockLinkedTiles,
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
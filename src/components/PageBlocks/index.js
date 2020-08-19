import React from "react"

import BlockParagraph from "../Paragraph"
import BlockList from "../List"
import BlockHeading from "../Heading"
import BlockButton from "../Button"
import BlockHomepageHero from "../HomepageHero"
import BlockHeroImage from "../HeroImage"
import BlockExternalRedirect from "../ExternalRedirect"
import BlockIFrame from "../IFrame"
import BlockPageStrap from "../PageStrap"
import BlockHomeLinks from "../HomeLinks"
import BlockMessageTile from "../MessageTile"
import BlockMediaTiles from "../MediaTiles"
import BlockPageModal from "../PageModal"
import BlockLinkedTiles from "../LinkedTiles"
import BlockPhotoTab from  "../PhotoTab"
import BlockPhotoCarousel from "../PhotoCarousel"
import BlockAttribution from "../Attribution"
import BlockGoogleMap from "../GoogleMap"

import { PageModalProvider } from "../PageModal/context.js"

/** 
 * Page Blocks
 */
export default ({ blocks, featuredImage }) => {
  const blockMap = {
    "core/paragraph": BlockParagraph,
    "core/list": BlockList,
    "block-lab/attributions-block": BlockAttribution,
    "block-lab/button": BlockButton,
    "block-lab/heading": BlockHeading,
    "block-lab/homepage-hero": BlockHomepageHero,
    "block-lab/hero-image": BlockHeroImage,
    "block-lab/external-redirect": BlockExternalRedirect,
    "block-lab/google-map": BlockGoogleMap,
    "block-lab/iframe-block": BlockIFrame,
    "block-lab/page-strap": BlockPageStrap,
    "block-lab/home-links": BlockHomeLinks,
    "block-lab/message-tile": BlockMessageTile,
    "block-lab/media-tiles": BlockMediaTiles,
    "block-lab/page-modal": BlockPageModal,
    "block-lab/link-tiles": BlockLinkedTiles,
    "block-lab/photo-block": BlockPhotoTab,
    "block-lab/photo-carousel": BlockPhotoCarousel,
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
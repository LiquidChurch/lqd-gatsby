import React from "react"

import BlockAccordion from "../Blocks/Accordion"
import BlockAttribution from "../Blocks/Attribution"
import BlockButton from "../Blocks/Button"
import BlockHeading from "../Blocks/Heading"
import BlockHeroImage from "../Blocks/HeroImage"
import BlockMediaTiles from "../Blocks/MediaTiles"
import BlockMessageTile from "../Blocks/MessageTile"
import BlockPageStrap from "../Blocks/PageStrap"
import BlockPhotoTab from  "../Blocks/PhotoTab"
import BlockSeriesTiles from "../Blocks/SeriesTiles"
import BlockVideo from "../Blocks/Video"

import BlockParagraph from "../Paragraph"
import BlockList from "../List"
import BlockHomepageHero from "../HomepageHero"
import BlockIFrame from "../IFrame"
import BlockHomeLinks from "../HomeLinks"
import BlockPageModal from "../PageModal"
import BlockLinkedTiles from "../LinkedTiles"
import BlockPhotoCarousel from "../PhotoCarousel"
import BlockGoogleMap from "../GoogleMap"

import { PageModalProvider } from "../PageModal/context.js"

/** 
 * Page Blocks
 */
export default ({ blocks, featuredImage }) => {
  const blockMap = {
    "core/paragraph": BlockParagraph,
    "core/list": BlockList,
    "block-lab/accordion": BlockAccordion,
    "block-lab/attributions-block": BlockAttribution,
    "block-lab/button": BlockButton,
    "block-lab/heading": BlockHeading,
    "block-lab/homepage-hero": BlockHomepageHero,
    "block-lab/hero-image": BlockHeroImage,
    "block-lab/google-map": BlockGoogleMap,
    "block-lab/iframe-block": BlockIFrame,
    "block-lab/page-strap": BlockPageStrap,
    "block-lab/home-links": BlockHomeLinks,
    "block-lab/message-tile": BlockMessageTile,
    "block-lab/media-tiles": BlockMediaTiles,
    "block-lab/page-modal": BlockPageModal,
    "block-lab/series-tiles": BlockSeriesTiles,
    "block-lab/link-tiles": BlockLinkedTiles,
    "block-lab/photo-block": BlockPhotoTab,
    "block-lab/photo-carousel": BlockPhotoCarousel,
    "block-lab/video-block": BlockVideo,
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
            data.keyValue=`${data.name}-${index}`
            return (
              <Component key={data.keyValue} {...data.attributes} />
            )
          })}

      </div>
      </PageModalProvider>
    </>
  )
}
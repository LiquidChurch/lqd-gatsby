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
import BlockExternalRedirect from "../ExternalRedirect"
import BlockPageStrap from "../PageStrap"
import BlockHomeLinks from "../HomeLinks"

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
    "block-lab/external-redirect": BlockExternalRedirect,
    "block-lab/page-strap": BlockPageStrap,
    "block-lab/home-links": BlockHomeLinks,
  }

  return (
    <>
      <div>
        {blocks &&
          blocks.map((data, index) => {
            const Component = blockMap[data.name] || false
            console.log("Page Component", Component)
            if (!Component) {
              return null
            }

            return (
              <Component key={`${data.name}-${index}`} {...data.attributes} />
            )
          })}
      </div>
    </>
  )
}
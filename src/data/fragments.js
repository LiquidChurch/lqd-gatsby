import { graphql } from "gatsby"

export const GeneralSettings = graphql`
  fragment GeneralSettings on Wp {
    generalSettings {
      title
      description
      url
      notificationBarToggle
      notificationBarText
      notificationBarCta
      notificationBarUrl
      notificationBarVariant
    }
  }
`

export const Paragraph = graphql`
  fragment Paragraph on WpCoreParagraphBlock {
    attributes {
      ... on WpCoreParagraphBlockAttributes {
        align
        content
        dropCap
        fontSize
      }
    }
  }
`

export const List = graphql`
  fragment List on WpCoreListBlock {
    attributes {
      values
      ordered
      reversed
      start
    }
  }
`

/*
export const Paragraph = graphql`
  fragment Paragraph on WPGraphQL_CoreParagraphBlock {
    attributes {
      ... on WPGraphQL_CoreParagraphBlockAttributes {
        align
        content
        dropCap
        fontSizeInt: fontSize
      }
      ... on WPGraphQL_CoreParagraphBlockAttributesV2 {
        align
        content
        dropCap
        fontSizeString: fontSize
      }
      ... on WPGraphQL_CoreParagraphBlockAttributesV3 {
        align
        content
        dropCap
        fontSize
      }
    }
  }
`

export const Image = graphql`
  fragment Image on WPGraphQL_CoreImageBlock {
    attributes {
      alt
      url
      caption
      sizeSlug
      align
      localFile {
        publicURL
        childImageSharp {
          fluid(maxWidth: 768) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`
*/
/*
export const List = graphql`
  fragment List on WPGraphQL_CoreListBlock {
    attributes {
      values
      ordered
    }
  }
`

export const Blockquote = graphql`
  fragment Blockquote on WPGraphQL_CoreQuoteBlock {
    attributes {
      align
      citation
      value
    }
  }
`

export const Code = graphql`
  fragment Code on WPGraphQL_CoreCodeBlock {
    attributes {
      nonNullContent: content
      className
    }
  }
`
*/

export const Heading = graphql`
  fragment Button on WpBlockLabHeadingBlock {
    attributes {
      text
      size
      alignment
      background_color
    }
  }
`

export const Attributions = graphql`
  fragment Attributions on WpBlockLabAttributionsBlock {
    attributes {
      title
      bg_color
      attribution_list
    }
  }
`

export const Button = graphql`
  fragment Heading on WpBlockLabButtonBlock {
    attributes {
      text
      alignment
      page
      color
      background_color
      has_arrow
      has_icon
      min_width
      text_float
    }
  }
`

export const HompageHero = graphql`
  fragment HomepageHero on WpBlockLabHomepageHeroBlock {
    attributes {
        cta_label
        cta_url
        hero_image
        hero_tag
        hero_text
    }
  }
`

export const HeroImage = graphql`
  fragment HeroImage on WpBlockLabHeroImageBlock {
    attributes {
      image_id
      image_style
      bg_color
      statement
      sidekick
      cta
    }
  }
`

export const ExternalRedirect = graphql`
  fragment ExternalRedirect on WpBlockLabExternalRedirectBlock {
    attributes {
        external_url
        new_tab
    }
  }
`

export const IFrame = graphql`
  fragment IFrame on WpBlockLabIframeBlock {
    attributes {
        src
    }
  }
`

export const GoogleMap = graphql`
  fragment GoogleMap on WpBlockLabGoogleMapBlock {
    attributes {
      campuses
    }
  }
`

export const PageStrap = graphql`
  fragment PageStrap on WpBlockLabPageStrapBlock {
    attributes {
      statement
      sidekick
      bg_color
      image_id
      cta
    }
  }
`

export const HomeLinks = graphql`
  fragment HomeLinks on WpBlockLabHomeLinksBlock {
    attributes {
      page_list
      background_color
    }
  }
`

export const MessageTile = graphql`
  fragment MessageTile on WpBlockLabMessageTileBlock {
      attributes {
        block_title
        background_color
        message_slug
      }
  }
`

export const PhotoCarousel = graphql`
  fragment PhotoCarousel on WpBlockLabPhotoCarouselBlock {
      attributes {
        images
      }
  }
`

export const MediaTiles = graphql`
  fragment MediaTiles on WpBlockLabMediaTilesBlock {
    attributes {
      show_attribution
      background_color
      label
      media_list
      num_items
      show_blurb
      show_series
      type
      display_type
    }
  }
`

export const PageModal = graphql`
  fragment PageModal on WpBlockLabPageModalBlock {
      attributes {
        modal_title
        modal_text
        modal_id
      }
  }
`

export const LinkTiles = graphql`
  fragment LinkTiles on WpBlockLabLinkTilesBlock {
    attributes {
      slugs_list
    }
  }
`

export const PhotoTab = graphql`
  fragment PhotoTab on WpBlockLabPhotoBlock {
    attributes {
      location
      image_id
      bg_color
      header
      text_block
      header_secondary
      text_block_secondary
      cta
    }
  } 
`

export const AllBlocks = graphql`
  fragment AllBlocks on WpBlock {
    name
    ...Paragraph
    ...List
    ...Attributions
    ...Button
    ...Heading
    ...HomepageHero
    ...HeroImage
    ...GoogleMap
    ...ExternalRedirect
    ...IFrame
    ...PageStrap
    ...HomeLinks
    ...MessageTile
    ...MediaTiles
    ...PageModal
    ...LinkTiles
    ...PhotoTab
    ...PhotoCarousel
  }
`

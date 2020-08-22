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

// Define block fragments.
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
  fragment Button on WpBlockLabButtonBlock {
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


export const ExternalRedirect = graphql`
  fragment ExternalRedirect on WpBlockLabExternalRedirectBlock {
    attributes {
        external_url
        new_tab
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

export const Heading = graphql`
  fragment Heading on WpBlockLabHeadingBlock {
    attributes {
      text
      size
      alignment
      bg_color
      font_color
      show_hr
      all_caps
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

export const HomeLinks = graphql`
  fragment HomeLinks on WpBlockLabHomeLinksBlock {
    attributes {
      page_list
      background_color
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

export const IFrameBlock = graphql`
  fragment IFrameBlock on WpBlockLabIframeBlock {
    attributes {
        src
    }
  }
`

export const LinkTiles = graphql`
  fragment LinkTiles on WpBlockLabLinkTilesBlock {
    attributes {
      slugs_list
      bg_color
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

export const MessageTile = graphql`
  fragment MessageTile on WpBlockLabMessageTileBlock {
      attributes {
        block_title
        background_color
        message_slug
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

export const PageStrap = graphql`
  fragment PageStrap on WpBlockLabPageStrapBlock {
    attributes {
      statement
      sidekick
      image_id
      cta
      bg_color
      padding
      alignment
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

export const PhotoCarousel = graphql`
  fragment PhotoCarousel on WpBlockLabPhotoCarouselBlock {
      attributes {
        images
      }
  }
`

export const PhotoTab = graphql`
  fragment PhotoTab on WpBlockLabPhotoBlock {
    attributes {
      location
      image_id
      header
      text_block
      cta
      header_secondary
      text_block_secondary
      cta_secondary
      bg_color
      padding      
    }
  } 
`

// Create All Blocks fragment.
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
    ...IFrameBlock
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

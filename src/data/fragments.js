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
      layout
      attribution_list
      show_blurb
      show_email
      bg_color
      padding
    }
  }
`

export const Button = graphql`
  fragment Button on WpBlockLabButtonBlock {
    attributes {
      text
      alignment
      page
      btn_color
      btn_outline
      font_color
      bg_color
      padding
      has_arrow
      has_icon
      min_width
      text_float
      add_padding
      dropdown
      size
    }
  }
`


export const ExternalRedirect = graphql`
  fragment ExternalRedirect on WpBlockLabExternalRedirectBlock {
    attributes {
        external_url
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
      font_color
      show_hr
      all_caps
      add_padding
      bg_color
      padding
    }
  }
`

export const HeroImage = graphql`
  fragment HeroImage on WpBlockLabHeroImageBlock {
    attributes {
      image_id
      image_style
      bg_color
      padding
      spacing
      alignment
      size
      color
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
      media_list
      num_items
      show_blurb
      show_series
      type
      display_type
      bg_color
      padding
    }
  }
`

export const MessageTile = graphql`
  fragment MessageTile on WpBlockLabMessageTileBlock {
      attributes {
        block_title
        bg_color
        padding
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
      font_color
      all_caps
      sidekick
      image_id
      cta
      bg_color
      padding
      spacing
      width
      alignment
      size
      color
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
      spacing
      alignment
      header_size
      size 
    }
  } 
`

export const Video = graphql`
  fragment Video on WpBlockLabVideoBlock {
    attributes {
      video_url
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
    ...Video
  }
`

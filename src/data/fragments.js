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

export const Accordion = graphql`
  fragment Accordion on WpBlockLabAccordionBlock {
    attributes {
      items
      bg_color
      padding
    }
  }
`

export const Anchor = graphql`
  fragment Anchor on WpBlockLabAnchorBlock {
    attributes {
      label
    }
  }
`

export const Button = graphql`
  fragment Button on WpBlockLabButtonBlock {
    attributes {
      text
      alignment
      page
      url_append
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
      block_on
      block_off
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
      latitude
      longitude
      zoom
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

export const LinkTiles = graphql`
  fragment LinkTiles on WpBlockLabLinkTilesBlock {
    attributes {
      slugs_list
      bg_color
      padding
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
      category
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
      image_size
      cta
      bg_color
      padding
      spacing
      width
      alignment
      size
      color
      block_on
      block_off
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
      color
      bg_color
      padding
      spacing
      alignment
      header_size
      size
      block_on
      block_off
      google_map
      map_toggle
    }
  } 
`

export const PhotoGrid = graphql`
  fragment PhotoGrid on WpBlockLabPhotoGridBlock {
    attributes {
      column
      max_width
      image_list
      bg_color
      padding
    }
  }
`

export const SeriesTiles = graphql`
  fragment SeriesTiles on WpBlockLabSeriesTilesBlock {
    attributes {
      type
      num_items
      layout
      series_list
      bg_color
      padding
    }
  }
`
export const Video = graphql`
  fragment Video on WpBlockLabVideoBlock {
    attributes {
      video_url
      video_title
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
    ...Accordion
    ...Anchor
    ...Attributions
    ...Button
    ...Heading
    ...HomepageHero
    ...HeroImage
    ...GoogleMap
    ...ExternalRedirect
    ...PageStrap
    ...PhotoGrid
    ...HomeLinks
    ...MessageTile
    ...MediaTiles
    ...SeriesTiles
    ...PageModal
    ...LinkTiles
    ...PhotoTab
    ...PhotoCarousel
    ...Video
  }
`

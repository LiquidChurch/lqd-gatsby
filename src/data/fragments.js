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
      hero_image_id
      hero_title
      image_style
      hero_text
      theme_style
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

export const PageStrap = graphql`
  fragment PageStrap on WpBlockLabPageStrapBlock {
    attributes {
      cta_slug
      cta_text
      strap_bg_img
      strap_color
      strap_tag
      strap_text
      strap_image
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

export const MediaTile = graphql`
  fragment MediaTile on WpBlockLabMediaTileBlock {
      attributes {
        block_title
        background_color
        media_slug
      }
  }
`

export const MediaTiles = graphql`
  fragment MediaTiles on WpBlockLabMediaTilesBlock {
    attributes {
      label
      background_color
      type
      media_list
    }
  }
`

export const PageModal = graphql`
  fragment PageModal on WpBlockLabPageModalBlock {
      attributes {
        modal_title
        modal_text
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
export const AllBlocks = graphql`
  fragment AllBlocks on WpBlock {
    name
    ...Button
    ...Heading
    ...HomepageHero
    ...HeroImage
    ...ExternalRedirect
    ...PageStrap
    ...HomeLinks
    ...MessageTile
    ...MediaTile
    ...MediaTiles
    ...PageModal
    ...LinkTiles
  }
`

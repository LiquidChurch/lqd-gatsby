import { graphql } from "gatsby"

export const GeneralSettings = graphql`
  fragment GeneralSettings on WPGraphQL {
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

export const Heading = graphql`
  fragment Heading on WPGraphQL_CoreHeadingBlock {
    attributes {
      content
      level
    }
  }
`

export const Button = graphql`
  fragment Button on WPGraphQL_CoreButtonBlock {
    attributes {
      url
      text
    }
  }
`

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

export const HompageHero = graphql`
  fragment HomepageHero on WPGraphQL_BlockLabHomepageHeroBlock {
    attributes {
        cta_label
        cta_url
        hero_image
        hero_tag
        hero_text
    }
  }
`

export const ExternalRedirect = graphql`
  fragment ExternalRedirect on WPGraphQL_BlockLabExternalRedirectBlock {
    attributes {
        external_url
        new_tab
    }
  }
`

export const PageStrap = graphql`
  fragment PageStrap on WPGraphQL_BlockLabPageStrapBlock {
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
  fragment HomeLinks on WPGraphQL_BlockLabHomeLinksBlock {
    attributes {
      page_slug_list
      background_color
    }
  }
`

export const MessageTile = graphql`
  fragment MessageTile on WPGraphQL_BlockLabMessageTileBlock {
      attributes {
        block_title
        background_color
        message_slug
      }
  }
`

export const PageModal = graphql`
  fragment PageModal on WPGraphQL_BlockLabPageModalBlock {
      attributes {
        modal_title
        modal_text
      }
  }
`
export const AllBlocks = graphql`
  fragment AllBlocks on WPGraphQL_Block {
    name
    ...Paragraph
    ...Heading
    ...Button
    ...Image
    ...Code
    ...List
    ...Blockquote
    ...HomepageHero
    ...ExternalRedirect
    ...PageStrap
    ...HomeLinks
    ...MessageTile
    ...PageModal
  }
`

import { useStaticQuery, graphql } from "gatsby"

export const useGeneralSettings = () => {
  const data = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
            notificationBarCta
            notificationBarText
            notificationBarToggle
            notificationBarUrl
            notificationBarVariant
        }
      }
    }
    `
  )
  return data.wp.generalSettings
}

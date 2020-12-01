import React from "react"
import { Helmet } from "react-helmet"
import { useGeneralSettings } from "../../data/hooks"
import ReactHtmlParser from "react-html-parser"

export default () => {
  const data = useGeneralSettings()
  return (
    <Helmet defaultTitle={`${ReactHtmlParser(data.title)} | ${data.description}`}>
      <meta name="description" content={data.description} />
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <html lang="en" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
</Helmet>
  )
}

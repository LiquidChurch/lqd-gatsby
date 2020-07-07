import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Imgix from "react-imgix"

import Container from 'react-bootstrap/Container'

import "./styles.css"

/**
 * Homepage Hero component.
 */
export default ({
  hero_tag,
  hero_text,
  hero_image,
  cta_label,
  cta_url,
}) => {

  const [runEffect, setRunEffect] = useState(false)
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setRunEffect(true)
    }, 1500);
    return () => clearTimeout(timer1); 
  }, []);
  
  return (
    <>
    <section id="homepage-hero">
    <Container fluid className="homepage-hero-container">
      <div className={runEffect ? "homepage-hero-image loaded" : "homepage-hero-image"}>
        <Imgix src={"https://liquidchurch.imgix.net" + hero_image + "?gam=50"} sizes="100vw" />
      </div>
      <h1 className={runEffect ? "homepage-hero-tag loaded" : "homepage-hero-tag"}>{hero_tag}</h1>
      <p className={runEffect ? "homepage-hero-text loaded" : "homepage-hero-text"}>{hero_text}</p>
      <div className={runEffect ? "homepage-hero-cta loaded" : "homepage-hero-cta"}>
        <Link
          id="hero-cta"
          to={"/" + cta_url} 
          className="btn btn-primary homepage-hero-button"
        >{cta_label}</Link>
      </div>
    </Container>
    </section>
    </>
  )
}

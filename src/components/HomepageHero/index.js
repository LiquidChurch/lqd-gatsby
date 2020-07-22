import React, { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import Imgix from "react-imgix"

import Container from 'react-bootstrap/Container'
import { GlobalContext } from '../GlobalContext/context'

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
  const ctx = useContext(GlobalContext)
  const [runEffect, setRunEffect] = useState(false)
  
  if (runEffect === false && ctx.isInitialLoad === false) {
    setRunEffect(true)
  }
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setRunEffect(ctx.isInitialLoad)
    }, 1500);
    return () => {
      ctx.initialLoaded()
      clearTimeout(timer1)
    }    
  }, [ctx]);
  
  return (
    <>
    <section id="homepage-hero">
    <Container fluid className="homepage-hero-container">
      <div className={runEffect ? "homepage-hero-image loaded" : "homepage-hero-image"}>
        <Imgix src={"https://liquidchurch.imgix.net" + hero_image + "?gam=50"} sizes="100vw" />
      </div>
      <div className="homepage-hero-text-block">
        <h1 className={runEffect ? "homepage-hero-tag loaded" : "homepage-hero-tag"}>{hero_tag}</h1>
        <p className={runEffect ? "homepage-hero-text loaded" : "homepage-hero-text"}>{hero_text}</p>
        <div className={runEffect ? "homepage-hero-cta loaded" : "homepage-hero-cta"}>
          <Link
            id="hero-cta"
            to={"/" + cta_url} 
            className="btn btn-primary homepage-hero-button"
          >{cta_label}</Link>
        </div>
      </div>
    </Container>
    </section>
    </>
  )
}

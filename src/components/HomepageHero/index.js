import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import Imgix from "react-imgix"

import Container from 'react-bootstrap/Container'
import { GlobalContext } from '../GlobalContext/context'
import { ArrowRight } from '../../helpers/icons'
import { ArrowForwardText } from '../../helpers/icons'

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
        <Imgix 
           src={process.env.IMGIX_URL + hero_image + "?gam=50"} 
           className="homepage-hero-image-crop" 
           sizes="150vw" />
      </div>
      <div className="homepage-hero-text-block">
        <h1 className={runEffect ? "homepage-hero-tag font-h1 loaded" : "homepage-hero-tag font-h1"}>{hero_tag}</h1>
        <p className={runEffect ? "homepage-hero-text font-large loaded" : "homepage-hero-text font-large"}>{hero_text}</p>
        <div className={runEffect ? "homepage-hero-cta loaded" : "homepage-hero-cta"}>
          <Link
            id="hero-cta"
            to={"/" + cta_url} 
            className="btn font-btn homepage-hero-btn"
          >
            {cta_label}
            <span className="button-arrow homepage-hero-btn-arrow">
            <ArrowForwardText style={{fill:"#009DD1;"}} />
            </span>
          </Link>
          <Link
            id="hero-cta"
            to={"/indoor-services"} 
            className="btn font-btn homepage-hero-btn"
          >
            Join Us In Person
            <span className="button-arrow homepage-hero-btn-arrow">
            <ArrowForwardText style={{fill:"#009DD1;"}} />
            </span>
          </Link>
        </div>
      </div>
    </Container>
    </section>
    </>
  )
}

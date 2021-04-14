import React, { useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { useScrollPosition } from "../helpers/useScrollPosition"
import Jobs from '../components/Jobs'
import { Helmet } from 'react-helmet';
import { isAppView } from '../helpers/functions'

export default ({ location }) => {
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  } 
  
  useScrollPosition(
    ({ prevPos, currPos }) => {
      ctx.setScrollPos(-currPos.y)
    },
    null,
    false,
    false,
    100
  )
  
  useEffect(() => {
    ctx.setTheme(theme)
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }

    if (ctx.currPath === "") {
      ctx.setPath(location.pathname)
    }

    if (ctx.currPath !== location.pathname && ctx.prevPath !== location.pathname) {
      ctx.resetScroll()
      setTimeout(() => ctx.setPath(location.pathname),0)
    } else if (ctx.prevPath === location.pathname) {
      setTimeout(() => { window.scrollTo({
                         top: ctx.scrollPos,
                        })},100)
      ctx.setPath('back')
    } else {
      ctx.setPath(location.pathname)        
    }
    
  }, [ctx, theme])

  return (
    <Layout location={location}>
        <Helmet>
        </Helmet>
        <article className="Page">
          <Jobs location={location}/>
        </article>
    </Layout>
  )
}
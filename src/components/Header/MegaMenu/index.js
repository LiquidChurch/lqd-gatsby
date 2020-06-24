import React, { useContext } from "react"
import { slide as Menu } from 'react-burger-menu'
import { MegaMenuContext } from './context'
import "./styles.css"

const MegaMenu = () => {
  const ctx = useContext(MegaMenuContext)

  return (
    <Menu
      customBurgerIcon={ false }
      width={320}
      isOpen={ ctx.isMenuOpen }
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    >
      <a id="home" className="menu-item" href="/">
        <span className="liquid-icon bm-icon"></span>
        <span className="bm-text">Home</span>
      </a>
    </Menu>
  )
}

export default MegaMenu;
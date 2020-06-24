import React, { useState } from "react"

const MegaMenuContext = React.createContext()

const MegaMenuProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false)
  
  return (
    <MegaMenuContext.Provider value={{
      isMenuOpen: menuOpenState,
      toggleMenu: () => setMenuOpenState(!menuOpenState),
      stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
    }}>
      {props.children}
    </MegaMenuContext.Provider>
  )
}

export { MegaMenuContext, MegaMenuProvider}
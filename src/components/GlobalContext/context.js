import React, { useState } from "react"

const initialState = { isNotificationOpen: false,
                       isInitialLoad: true,
                       currentTheme: "Dark",
                       touchEnabled: false }

const GlobalContext = React.createContext(initialState)

const GlobalProvider = (props) => {
  const [notificationState, setNotificationState] = useState(true)
  const [initialLoadState, setInitialLoadState] = useState(true)
  const [themeState, setThemeState] = useState("Dark")
  const [touchState, setTouchState] = useState(false)
  const [currPath, setCurrPath] = useState("")
  const [prevPath, setPrevPath] = useState("")
  
  function updatePath(path) {
    if (path !== currPath) {
      setPrevPath(currPath)
      setCurrPath(path)
    }
  }
  return (
    <GlobalContext.Provider value={{
      isNotificationOpen: notificationState,
      toggleNotification: () => setNotificationState(!notificationState),
      isInitialLoad: initialLoadState,
      initialLoaded: () => setInitialLoadState(false),
      currentTheme: themeState,
      setTheme: (theme) => setThemeState(theme),
      touchEnabled: touchState,
      enableTouchState: () => setTouchState(true),
      prevPath: prevPath,
      currPath: currPath,
      setPath: (path) => updatePath(path),
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
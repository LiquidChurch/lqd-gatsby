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
  
  return (
    <GlobalContext.Provider value={{
      isNotificationOpen: notificationState,
      toggleNotification: () => setNotificationState(!notificationState),
      isInitialLoad: initialLoadState,
      initialLoaded: () => setInitialLoadState(false),
      currentTheme: themeState,
      setTheme: (theme) => setThemeState(theme),
      touchEnabled: touchState,
      enableTouchState: () => setTouchState(true)
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
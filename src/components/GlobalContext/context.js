import React, { useState } from "react"

const initialState = { isNotificationOpen: false,
                       isInitialLoad: true }

const GlobalContext = React.createContext(initialState)

const GlobalProvider = (props) => {
  const [notificationState, setNotificationState] = useState(true)
  const [initialLoadState, setInitialLoadState] = useState(true)
  
  return (
    <GlobalContext.Provider value={{
      isNotificationOpen: notificationState,
      toggleNotification: () => setNotificationState(!notificationState),
      isInitialLoad: initialLoadState,
      initialLoaded: () => setInitialLoadState(false) 
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
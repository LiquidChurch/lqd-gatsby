import React, { useState } from "react"

const PageModalContext = React.createContext()

const PageModalProvider = (props) => {
  const [modalOpenState, setModalOpenState] = useState(false)
  return (
    <PageModalContext.Provider value={{
      isModalOpen: modalOpenState,
      toggleModal: () => setModalOpenState(!modalOpenState),
      stateChangeHandler: (newState) => setModalOpenState(newState.isOpen)
    }}>
      {props.children}
    </PageModalContext.Provider>
  )
}

export { PageModalContext, PageModalProvider}
import React, { useState } from "react"

const PageModalContext = React.createContext()

const PageModalProvider = (props) => {
  const [modalOpenState, setModalOpenState] = useState(false)
  const [modalId, setModalId] = useState('')
  
  const [showModalIdState, setShowModalIdState] = useState('')
  
  
  return (
    <PageModalContext.Provider value={{
      showModalId: showModalIdState,
      setShowModalId: (mId) => setShowModalIdState(mId),
      setCloseModal: () => setShowModalIdState(''),
      stateChangeHandler: (mId) => setShowModalIdState(mId),
    }}>
      {props.children}
    </PageModalContext.Provider>
  )
}

export { PageModalContext, PageModalProvider}
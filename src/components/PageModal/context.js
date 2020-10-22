import React, { useState } from "react"

const initialPageModal = { modalOpenState: false,
                           modalId: '',
                           showModalIdState: ''}

const PageModalContext = React.createContext(initialPageModal)

const PageModalProvider = (props) => {
 // const [modalOpenState, setModalOpenState] = useState(false)
  
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
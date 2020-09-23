import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { PageModalContext } from './context'


/** 
 * Page Modal Block Component
 */
export default ({ modal_title,
                  modal_text,
                  modal_id }) => {
  const ctx = useContext(PageModalContext)
  
  return (
    <>
       <Modal show={(ctx.showModalId === modal_id)} onHide={ctx.setCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal_text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ctx.setCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )  
}

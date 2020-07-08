import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { PageModalContext } from './context'


/** 
 * Page Modal Block Component
 */
export default ({ modal_title,
                  modal_text }) => {
  console.log(modal_title)
  
  const ctx = useContext(PageModalContext)
  console.log(ctx)
  
  return (
    <>
       <Modal show={ctx.isModalOpen} onHide={ctx.toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal_text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ctx.toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={ctx.toggleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )  
}

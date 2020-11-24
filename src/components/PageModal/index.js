import React, { useContext } from 'react'
import { Link } from 'gatsby'
import Parse from "react-html-parser"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CallToAction from '../Commons/CallToAction'
import { ArrowForwardBtn, ArrowForwardText } from '../../helpers/icons'

import { PageModalContext } from './context'
import "./styles.css"

/** 
 * Page Modal Block Component
 */
export default ({ keyValue,
                  modal_title,
                  modal_text,
                  modal_id,
                  modal_link }) => {
  const ctx = useContext(PageModalContext)
  return (
    <>
       <Modal show={(ctx.showModalId === modal_id)} onHide={ctx.setCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Parse(modal_text)}</Modal.Body>
        <Modal.Footer>
          <Link className={'cta medium text-center modal-link'}
                to={modal_link}
           ><div className="cta-label">View Info<ArrowForwardText/></div>
           </Link>
        </Modal.Footer>
      </Modal>
    </>
  )  
}

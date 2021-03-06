import React, { useContext } from 'react'
import { Link } from 'gatsby'
import Parse from "react-html-parser"
import Modal from 'react-bootstrap/Modal'
import { ArrowForwardText } from '../../helpers/icons'

import { PageModalContext } from './context'
import "./styles.css"

/** 
 * Page Modal Block Component
 */
export default ({ keyValue,
                  modal_title,
                  modal_text,
                  modal_obj,
                  modal_id,
                  modal_cta,
                  modal_link }) => {
  const ctx = useContext(PageModalContext)
  
  let isObject = false
  if (modal_obj === true) {
    isObject = true
  }
  
  let hasFooter = false
  if (modal_cta !== '') {
    hasFooter = true
  }
  
  return (
    <>
       <Modal show={(ctx.showModalId === modal_id)} onHide={ctx.setCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        {(isObject) ?
          <Modal.Body>{modal_text}</Modal.Body>        
        :
          <Modal.Body>{Parse(modal_text)}</Modal.Body>
        }
        {hasFooter && <Modal.Footer>
            <Link className={'cta medium text-center modal-link'}
                  to={modal_link}
             ><div className="cta-label">{modal_cta}<ArrowForwardText/></div>
             </Link>
          </Modal.Footer>
        }
      </Modal>
    </>
  )  
}

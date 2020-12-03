import React, { useContext } from 'react'

import Nav from 'react-bootstrap/Nav'

import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share"

import PageModal from "../../PageModal"
import { PageModalContext } from '../../PageModal/context'

import './styles.css'

/**
 * Social Icons Component
 */
function SocialShare(props) {
  return (
  <>
      <Nav className='flex-nowrap flex-row message-social-padding' as='ul'>
        <Nav.Item className="p-1 message-social" as='li'>
          <FacebookShareButton url={props.url}>
            <div className={'message-social-icon facebook-icon'}>
            </div>
          </FacebookShareButton>
        </Nav.Item>
        <Nav.Item className="p-1 message-social" as='li'>
          <TwitterShareButton url={props.url} hashtags={['liquidchurch']}>
            <div className={'message-social-icon twitter-icon'}>
            </div>
          </TwitterShareButton>
        </Nav.Item>
        <Nav.Item className="p-1 message-social" as='li'>
          <EmailShareButton url={props.url} subject={'Watch this message from Liquid Church'}>
            <div className={'message-social-icon email-icon'}></div>
          </EmailShareButton>
        </Nav.Item>
      </Nav>
  </>
  )
}

const SocialIcons = ({
  slug,
}) => {
  const ctx = useContext(PageModalContext)
  var modalId = 'share-modal'
  var modalTitle = "Share This Message"
  var url = "https://dev2.liquidchurch.com/message/" + slug
  return (
    <>
      <Nav className='flex-nowrap flex-row message-action-area' as='ul'>
        <Nav.Item 
            className="p-1 message-action" 
            as='li'
            onClick={() => ctx.setShowModalId(modalId)}>
          <Nav.Link
            aria-label="share"
            className={'message-action-icon share-icon'}
            target="_blank"
          >
          </Nav.Link>
          <div className="message-action-text">Share</div>
        </Nav.Item>
        <Nav.Item className="p-1 message-action" as='li'>
          <Nav.Link 
            href="/subscribe" 
            aria-label="subscribe"
            className={'message-action-icon subscribe-icon'}
            target="_blank"
          >
          </Nav.Link>
          <div className="message-action-text">Subscribe</div>
        </Nav.Item>
        <Nav.Item className="p-1 message-action" as='li'>
          <Nav.Link 
            href="/give" 
            aria-label="give"
            className={'message-action-icon give-outline-icon'}
            target="_blank"
          >
          </Nav.Link>
          <div className="message-action-text">Give</div>
        </Nav.Item>
      </Nav>
      <PageModal 
        modal_title={modalTitle}
        modal_text={<SocialShare url={url}/>}
        modal_id={modalId}
      />
    </>
  ) 
}

export default SocialIcons
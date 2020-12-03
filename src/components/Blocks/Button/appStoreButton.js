import React from 'react'

export const AppStore = () => {
  return (
    <>
      <span className='app-store-btns'>
        <a className='app-store-link' href='https://apps.apple.com/us/app/liquid-church/id1264214057'>
          <div className={'app-store-btn left apple-app-button'}></div>
        </a>
        <a className='app-store-link' href='https://play.google.com/store/apps/details?id=io.echurch.liquidchurch&hl=en_US&gl=US'>
          <div className={'app-store-btn right google-play-button'}></div>
        </a>  
      </span>
    </>
  )
}

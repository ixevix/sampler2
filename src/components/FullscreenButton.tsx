import React from 'react'

const goFullScreen = () => {
  document.documentElement.requestFullscreen()
}

const FullscreenButton = () => {
  return (
    <input className='Button' type='button' onClick={goFullScreen} value='Fullscreen' />
  )
}

export default FullscreenButton

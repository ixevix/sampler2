import React from 'react'

type Props = {
  toggle: Function,
  playing: boolean,
}

const PlayButton: React.FC<Props> = ({toggle, playing}) => {
  return (
    <input 
      className='SampleButton'
      type='button'
      value={playing ? 'Stop' : 'Start'}
      onClick={() => toggle()}
    />
  )
}

export default PlayButton

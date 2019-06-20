import React from 'react'

type Props = {
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void),
}

const Slider: React.FC<Props> = (props) => {
  return (
    <div className='slider-wrapper'>
      <input {...props} defaultValue={props.defaultValue.toString()} type='range' className='slider' />
    </div>
  )
}

export default Slider

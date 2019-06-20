import React from 'react'
import Dropdown from './Dropdown';

type Props = {
  update: Function,
  value: string,
}

const WaveformSelect: React.FC<Props> = (props) => {
  return (
    <Dropdown {...props} >
      <option value='sine'>sine</option>
      <option value='triangle'>triangle</option>
      <option value='sawtooth'>sawtooth</option>
      <option value='square'>square</option>
    </Dropdown>
  )
}

export default WaveformSelect
import React, {useState, EventHandler} from 'react'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import PlayButton from './PlayButton'

const initialValues = {
  carrier: {
    type: 'sine',
    frequency: 240,
    amplification: 1
  },
  filter: {
    cutoffFrequency: 200,
    bandpassFrequency: 50,
    type: 'lowpass',
  },
  modulator: {
    type: 'sine',
    frequency: 20,
    amplification: 0
  },
  envelope: {
    attackAmplitude: 1,
    releaseAmplitude: 0,
    attackTime: 0.001,
    decayTime: 0.2,
    sustainTime: 0.2,
    releaseTime: 0.5,
    repeatTime: 1000,
  },
  playing: false
}

const Sample: React.FC = () => {
  const [state, setState] = useState(initialValues)
  const [carrier, setCarrier] = useState(new p5.Oscillator())
  const [modulator, setModulator] = useState(new p5.Oscillator())
  const [filter, setFilter] = useState(new p5.Filter())
  const [envelope, setEnvelope] = useState(new p5.Envelope())
  carrier.setType(state.carrier.type)
  carrier.freq(state.carrier.frequency)
  carrier.amp(state.carrier.amplification)
  modulator.setType(state.modulator.type)
  modulator.freq(state.modulator.frequency)
  modulator.amp(state.modulator.amplification)
  filter.res(state.filter.bandpassFrequency)
  modulator.start()
  modulator.disconnect()
  carrier.freq(modulator)
  carrier.connect(filter)
  filter.disconnect()

  const toggle = () => {
    if (state.playing) {
      carrier.stop(0)
    } else {
      carrier.start()
    }
    setState({...state, playing: !state.playing})
  }

  console.log(state)
  return <div className='Sample'>
      <div className='slider-wrapper'>
        <input type='range' className='slider' />
      </div>
      <div className='slider-wrapper'>
        <input type='range' className='slider' />
      </div>
      <div className='slider-wrapper'>
        <input type='range' className='slider' />
      </div>
      <div className='slider-wrapper'>
        <input type='range' className='slider' />
      </div>
      
      <div>
        <PlayButton toggle={toggle} playing={state.playing} />
      </div>
    </div>
}

export default Sample

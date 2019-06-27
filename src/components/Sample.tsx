import React, {useState} from 'react'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import PlayButton from './PlayButton'
import Slider from './Slider'
import WaveformSelect from './WaveformSelect'
import Header from './Header'
import {State} from '../types'
import KeyboardButton from './KeyboardButton'

const initialValues: State = {
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

const carrierOscillator = new p5.Oscillator()
const modulatorOscillator = new p5.Oscillator()
const filterObject = new p5.Filter()
const envelopeObject = new p5.Envelope()

type Props = {
  loadedValues?: State,
  index: number,
  onChange: Function,
}

const Sample: React.FC<Props> = ({loadedValues, index, onChange}) => {
  const [state, setState] = useState(loadedValues || initialValues)
  const [carrier, setCarrier] = useState(carrierOscillator)
  const [modulator, setModulator] = useState(modulatorOscillator)
  const [filter, setFilter] = useState(filterObject)
  const [envelope, setEnvelope] = useState(envelopeObject)
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

  const updateCarrierWaveForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = {...state.carrier, type: event.currentTarget.value}
    setState({...state, carrier: value})
    carrier.setType(state.carrier.type)
    onChange({...state, carrier: value}, index)
  }

  const updateCarrierFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = {...state.carrier, frequency: parseInt(event.target.value)}
    setState({...state, carrier: value})
    carrier.freq(state.carrier.frequency)
    onChange({...state, carrier: value}, index)
  }

  const updateCarrierAmplitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = {...state.carrier, amplification: parseFloat(event.target.value)}
    setState({...state, carrier: value})
    carrier.amp(state.carrier.amplification)
    onChange({...state, carrier: value}, index)
  }

  const updateModulatorWaveForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = {...state.modulator, type: event.currentTarget.value}
    setState({...state, modulator: value})
    modulator.setType(state.modulator.type)
    onChange({...state, modulator: value}, index)
  }

  const updateModulatorFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = {...state.modulator, frequency: parseInt(event.target.value)}
    setState({...state, modulator: value})
    modulator.freq(state.modulator.frequency)
    onChange({...state, modulator: value}, index)
  }

  const updateModulatorAmplitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = {...state.modulator, amplification: parseInt(event.target.value)}
    setState({...state, modulator: value})
    modulator.amp(state.modulator.amplification)
    onChange({...state, modulator: value}, index)
  }

  return (
    <div className='Sample'>
      <div className='column'>
        <Header>Sample {index}</Header>
        <PlayButton toggle={toggle} playing={state.playing} />
        <KeyboardButton />
      </div>
      <div className='column'>
        <Header>Carrier</Header>
        <WaveformSelect value={state.carrier.type} update={updateCarrierWaveForm} />
        <Header>{state.carrier.frequency}</Header>
        <Header>{state.carrier.amplification.toFixed(2)}</Header>
      </div>
      <Slider defaultValue={state.carrier.frequency} min={0} max={1000} step={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCarrierFrequency(e)} />
      <Slider defaultValue={state.carrier.amplification} min={0} max={1} step={0.01} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCarrierAmplitude(e)} />
      <div className='column'>
        <Header>Modulator</Header>
        <WaveformSelect value={state.modulator.type} update={updateModulatorWaveForm} />
        <Header>{state.modulator.frequency}</Header>
        <Header>{state.modulator.amplification.toFixed(2)}</Header>
      </div>
      <Slider defaultValue={state.modulator.frequency} min={0} max={150} step={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateModulatorFrequency(e)} />
      <Slider defaultValue={state.modulator.amplification} min={-150} max={150} step={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateModulatorAmplitude(e)} />
    </div>
  )
}

export default Sample

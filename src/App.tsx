import React, {useState} from 'react';
import './App.css';
import Sample from './components/Sample'
import {State} from './types'

const App: React.FC = () => {
  const savedState = localStorage.getItem('samples')
  const state: Array<State> = []

  const updateState = (newState: State, index: number) => {
    state[index] = {...newState, playing: false}
    const savedString = JSON.stringify(state)
    localStorage.setItem('samples', savedString)
  }

  if (savedState === null) {
    return (
      <div className='App'>
        <Sample index={0} key={0} onChange={updateState}/>
      </div>
    )
  } else {
    const parsed: Array<State> = JSON.parse(savedState)
    const samples = parsed.map((sample, i) => {
      return <Sample index={i} key={i} onChange={updateState} loadedValues={sample} />
    })
    return (
      <div className='App'>
        {samples}
      </div>
    )
  }


}

export default App;

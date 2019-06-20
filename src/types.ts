export type State = {
  carrier: {
    type: string,
    frequency: number,
    amplification: number,
  },
  filter: {
    cutoffFrequency: number,
    bandpassFrequency: number,
    type: string,
  },
  modulator: {
    type: string,
    frequency: number,
    amplification: number,
  },
  envelope: {
    attackAmplitude: number,
    releaseAmplitude: number,
    attackTime: number,
    decayTime: number,
    sustainTime: number,
    releaseTime: number,
    repeatTime: number,
  },
  playing: boolean,
}
import React from 'react'

type Props = {
  update: Function,
  value: string,
  children: Object,
}

const Dropdown: React.FC<Props> = ({update, value, children}) => {
  return (
    <select className='SampleSelect' value={value} onChange={(event) => update(event)}>
      {children}
    </select>
  )
}

export default Dropdown
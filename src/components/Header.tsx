import React from 'react'

const Header: React.FC = ({children}) => {
  return (
    <span className='SampleHeader'>
      {children}
    </span>
  )
}

export default Header
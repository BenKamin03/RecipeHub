import React from 'react'
import Session from '../backend/Session'

const Footer = () => {
  return (
    <div className='mx-24 border-t-2 mt-4'>
      <div className='grid grid-cols-3'>
        <div className='p-8 cursor-pointer' onClick={(e) => Session.redirectTo(e, "/")}>
          <img className="h-min w-min mr-4" src="/recipehub/logo.png" alt="Logo" />
        </div>
        <div className='text-center p-8'>
          <h1 className='text-lg'>Creator</h1>
          <a href='https://github.com/BenKamin03' className='font-light'>Ben Kamin</a>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Footer
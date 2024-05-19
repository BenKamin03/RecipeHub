import React from 'react'
import Session from '../middleware/Session'

const Footer = () => {
  return (
    <div className='mx-24 border-t-2 mt-4'>
      <div className='grid grid-cols-3'>
        <div className='p-8 cursor-pointer' onClick={(e) => Session.redirectTo(e, "/")}>
          <img className="h-min w-min mr-4" src="/recipehub/logo.png" alt="Logo" />
        </div>
        <div className='text-center p-8'>
          <h1 className='text-lg font-bold'>Creator</h1>
          <a href='https://github.com/BenKamin03' className='font-light'>Ben Kamin</a>
        </div>
        <div className='text-center p-8 flex flex-col'>
          <h1 className='text-lg font-bold'>Resources</h1>
          <a href='https://www.mongodb.com/' className='font-light'>MongoDB</a>
          <a href='https://expressjs.com/' className='font-light'>ExpressJS</a>
          <a href='https://react.dev/' className='font-light'>ReactJS</a>
          <a href='https://nodejs.org/en' className='font-light'>NodeJS</a>
          <a href='https://tailwindcss.com/' className='font-light'>TailwindCSS</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
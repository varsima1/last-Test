import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter className='text-center text-lg-left bg-primary text-light'>
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} createdBy:{' '}
        <a className='text-light'>
          Luka Varsimashvili
        </a>
      </div>
    </MDBFooter>
  )
}


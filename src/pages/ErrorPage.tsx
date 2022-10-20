import React from 'react'
import pingu from '../styles/assets/pingu_dance.gif'
import '../styles/error.css'

export const ErrorPage = () => {
  return (
    <>
        <div className='error-holder'>
            <img className='pingu' src={pingu} alt="pingu-dancing-cause-of-error" />
            <h1>ERROR 404</h1>
        </div>
    </>
  )
}

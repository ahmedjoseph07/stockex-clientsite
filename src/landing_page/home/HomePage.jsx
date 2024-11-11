import React from 'react'
import Hero from './Hero'
import Login from './Login'
import Stats from './Stats'
import Pricing from './Pricing'
import Education from './Education'
import OpenAccount from '../OpenAccount'

const HomePage = () => {

  

  return (
    <>
    <Hero/>
    <hr className='w-[85vw] mx-auto' />
    {/* <Login/> */}
    <Stats/>
    <hr className='w-[85vw] mx-auto' />
    <Pricing/>
    <hr className='w-[85vw] mx-auto' />
    <Education/>
    {/* <OpenAccount/> */}
    <hr className='mx-auto' />
    </>
  )
}

export default HomePage

import React from 'react'
import Hero from '../products/Hero'
import LeftImage from '../products/LeftImage'
import RightImage from '../products/RightImage'
// import OpenAccount from '../OpenAccount'
const ProductPage = () => {
  return (
    <>
    <Hero/>
    <LeftImage imageUrl="images/kite.png" productName="Kite" productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." tryDemo="Try demo" learnMore ="Get Started" googlePlay="" appStore="" />

    <RightImage imageUrl="images/console.png" productName="Console" productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations." tryDemo="Get Started" learnMore ="Learn More" googlePlay="" appStore="" />

    <LeftImage imageUrl="images/coin.png" productName="Coin" productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." tryDemo="Coin" learnMore ="Get Started" googlePlay="" appStore="" />

    <RightImage imageUrl="images/kiteconnect.png" productName="Kite Connect API" productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." tryDemo="Kite Connect" learnMore ="Learn More" googlePlay="" appStore="" />

    <LeftImage imageUrl="images/varsity.png" productName="Varsity mobile" productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." tryDemo="Varsity" learnMore ="Learn More" googlePlay="" appStore="" />
    <p className='hidden md:flex md:justify-center md:items-start text-2xl font-semibold lg:-mb-5 -mb:4'>Know more about our technology stack? Check out the&nbsp;<span className='text-green-500'>StockEx</span>&nbsp;Blog..</p>
    {/* <OpenAccount/> */}
    </>
  )
}

export default ProductPage

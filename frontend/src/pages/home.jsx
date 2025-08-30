import React from 'react'
import { assets } from '../assets/assets'
import { Hero } from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import { BestSeller } from '../components/BestSeller'
import { OurPolicy } from '../components/OurPolicy'
import { NewsletterBox } from '../components/NewsletterBox'

export const Home = () => {
  return (
    <div className=''>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy/>
      <NewsletterBox />
    </div>
  )
}

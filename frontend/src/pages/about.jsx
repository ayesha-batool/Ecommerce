import React from 'react'
import { Title } from '../components/Title'
import { assets } from '../assets/assets'
export const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever was</p>
          <p>Since our inception</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission at forever is </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>we meticulously select asdsadsadasdasdasdadadasdsada </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>we meticulously select asdasdadasdasdassdas</p>
        </div>
             <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Cusotmer Service:</b>
          <p className='text-gray-600'>we meticulously select asdasdasdas</p>
        </div>
      </div>
    </div>
  )
}

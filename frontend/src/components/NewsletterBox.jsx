import React from 'react'

export const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        // not reload page after submission
        e.preventDefault();

        console.log('Form submitted');
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'> Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'> Be the first to know about new arrivals, exclusive offers, and style tips delivered straight to your inbox.</p>
            <form action="" onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" required placeholder='Enter your email' className='w-full sm:flex-1 outline-none' />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
            </form>
        </div>
    )
}

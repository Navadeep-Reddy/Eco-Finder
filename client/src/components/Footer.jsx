import React from 'react'

const Footer = () => {
  return (
    <div className='w-[100%] mx-auto border-t-black border-t mb-5 mt-10 flex justify-between'>
        <p>© 2024 SSNCE. All rights reserved.</p>
        <ul className='flex'>
            <li className='mx-2'>Terms of Services</li>
            <li className='mx-2'>Privacy Policy</li>
        </ul>
    </div>
  )
}

export default Footer

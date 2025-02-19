import React from 'react'
import AboutImg from '/About.png'
import '/src/Styles/About.css'
import { FaCirclePlay } from "react-icons/fa6";

const About = () => {
  return (
    <div className='mt-[200px] w-2/3 mx-auto flex container py-[200px]' name="abt">
      <div className='about-left'>
        <img src={AboutImg} className='border rounded-xl imag' alt='About EcoFinder'></img>
      </div>
      <div className='about-right flex flex-col justify-center'>
        <p className='font-semibold text-NewAccent'>ABOUT ECO-FINDER</p>
        <h1 className='font-bold text-4xl'>Your Guide to Sustainable Living</h1>

        <div className='mt-5 text-gray-800'>
            <p>Eco-Finder empowers consumers to make environmentally conscious choices by providing reliable information on eco-friendly product alternatives.</p>
            <p className='my-2'>Our platform helps you discover sustainable options by analyzing eco-certifications, ingredients, and sustainability ratings, ensuring transparency in your purchases.</p>
            <p>With EcoFinder, you can shop smarter, reduce your carbon footprint, and contribute to a greener future—one product at a time.</p>
        </div>
      </div>
    </div>
  )
}

export default About
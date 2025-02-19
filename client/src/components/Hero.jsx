import React from 'react';
import '/src/Styles/hero.css';
import { MdArrowCircleRight } from "react-icons/md";
import { Link } from 'react-scroll';
const Hero = () => {
  return (
    <div className='heroic flex justify-center items-center' name = "Top">
      <div className='Words flex-col flex max-w-[50rem] text-center justify-center items-center'>
        <h1 className='text-[3.8rem] font-extrabold '>ECO-FINDER</h1>
        <p className='max-w-[43.8rem] mx-auto'>Discover Eco-Friendly Alternatives with Confidence – Shop Sustainably, Live Responsibly!</p>
        <button className="border w-40 rounded-full h-11 bg-Comp text-black my-4 flex items-center justify-center space-x-2"><Link to="searcher" smooth={true} offset={-200}><span>Explore more</span></Link> <MdArrowCircleRight className='text-NewAccent'/></button>
      </div>
    </div>
  )
}

export default Hero


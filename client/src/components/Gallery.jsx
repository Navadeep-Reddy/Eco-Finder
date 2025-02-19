import React from 'react'
import Clock from '/Gallery/Clock.jpg'
import Drone from '/Gallery/drone.jpg'
import Ent from '/Gallery/entrance.jpg'
import Tree from '/Gallery/Tree.jpg'
import '/src/Styles/Gallery.css'
import { FaLongArrowAltRight } from "react-icons/fa";

const Gallery = () => {
  return (
    <>
    <div className='mt-10 w-[90%] flex mx-auto container'>
      <div className='photo-cont'>
        <img src = {Ent}></img>
        <div className='pop'>
            <p className='cap'>
                Entrance
            </p>
        </div>
      </div>
      <div className='photo-cont'>
        <img src = {Clock}></img>
        <div className='pop'>
            <p className='cap'>
                Clock Tower
            </p>
        </div>    
      </div>
      <div className='photo-cont'>
        <img src = {Drone}></img>
        <div className='pop'>
            <p className='cap'>
                Vama Sundari
            </p>
        </div>
      </div>
      <div className='photo-cont'>
        <img src = {Tree}></img>
        <div className='pop'>
            <p className='cap'>
                Aboreal
            </p>
        </div>
      </div>
    </div>

    <div className='w-full flex justify-center mt-10 h-10'>
    <button className="border border-none w-40 rounded-full h-11 bg-NewAccent text-Comp flex items-center justify-center space-x-2"><span>See more here</span><FaLongArrowAltRight /></button>

    </div>
    </>
  )
}

export default Gallery

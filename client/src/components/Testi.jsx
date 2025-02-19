import React, { useRef } from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import Navadeep from '/People/Navadeep.jpg'
import Shrek from '/People/shrek.jpg'
import Man from '/People/man.jpg'
import Grand from '/People/grand.jpg'
import '/src/Styles/Testi.css'

const Testi = () => {
  const slider = useRef();  
  let X_Value = 0;
  
  const MoveLeft = () => {
    if (X_Value <= -25){
        X_Value += 25;
    }
    slider.current.style.transform =  `translateX(${X_Value}%)`
  }


  const MoveRight = () => {
    if (X_Value > -50){
        X_Value -= 25;
    }
    slider.current.style.transform =  `translateX(${X_Value}%)`
  }  
  return (
    <div className='testimonials' name = 'Test'>
        <FaArrowCircleLeft className='left-butt text-Accent' onClick={MoveLeft}/>
        <FaArrowCircleRight className='right-butt text-Accent' onClick={MoveRight}/>
        <div className='slider'>
            <ul ref = {slider}>
                <li>
                    <div className='user-box'>
                        <div className='user-info'>
                            <img src = {Navadeep}></img>
                            <div>
                                <h3>Navadeep</h3>
                                <span>SSN, Chennai</span>
                            </div>
                        </div>
                        <p>
                        Choosing to pursue my degree at SSN was one of the best decisions I've ever made. The supportive community, state-of-the-art facilities, and commitment to academic excellence have truly exceeded my expectations.
                        </p>
                    </div>
                </li>

                <li>
                    <div className='user-box'>
                        <div className='user-info'>
                            <img src = {Shrek}></img>
                            <div>
                                <h3>Shrek</h3>
                                <span>HCL, Coimbature</span>
                            </div>
                        </div>
                        <p>
                        Me, myself and my donkey are really greatful to have studied in SSN. It helped me secure the biggest package.
                        </p>
                    </div>
                </li>

                <li>
                    <div className='user-box'>
                        <div className='user-info'>
                            <img src = {Man}></img>
                            <div>
                                <h3>Man</h3>
                                <span>SSN, Chennai</span>
                            </div>
                        </div>
                        <p>
                        Man is meant to save people, not kill them. Cripple them sometimes? Sure, but he does not kill. The defining moment in his life in when his parents were taken away from him. He never wants another person to go through that. 
                        </p>
                    </div>
                </li>


                <li>
                    <div className='user-box'>
                        <div className='user-info'>
                            <img src ={Grand} ></img>
                            <div>
                                <h3>Ariana Grande</h3>
                                <span>Amma Unavagam, Chennai</span>
                            </div>
                        </div>
                        <p>
                        Yeah, breakfast at Ashwin's and bottles of bubbles
                        Lashes and diamonds, ID card machines, 
                        Girls with arrears who like getting in trouble
                        Buy myself all of my favourite things, yeah
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Testi;

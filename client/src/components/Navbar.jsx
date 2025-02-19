import React, {useState, useEffect} from 'react'
import logo from '/logo.svg'
import { Link } from 'react-scroll';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', () => {
      (window.scrollY > 100)? setSticky(true) : setSticky(false); 
    })
  });

  return (
    <nav className={`w-full text-white flex justify-between fixed top-0 left-0 items-center z-10 ${sticky ? `bg-Dom` : `bg-transparent`} duration-700`}>
       <img src = {logo} className='px-4 h-[3.5rem] my-4 pl-20'/>
       <ul className='flex px-4 items-center text-Comp pr-20'>
            <li className='px-8 text-xl cursor-pointer'><Link to='Top' offset={0} duration={500} smooth={true}>Home</Link></li>
            <li className='px-8 text-xl cursor-pointer'><Link to='Prog' offset={-250} duration={500} smooth={true}>Products</Link></li>
            <li className='px-8 text-xl cursor-pointer'><Link to= 'abt' offset={-200} duration={500} smooth={true}>About</Link></li>
            <li className="px-8 text-xl flex items-center">
                <Link to= 'Cont' duration = {500} smooth = {true} offset={-320}><button className="border w-40 rounded-full h-11 bg-Comp text-black">Contact Us</button></Link>
            </li>

       </ul>
    </nav>
  )
}

export default Navbar

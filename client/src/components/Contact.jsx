import React from 'react'
import { IoMailSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { MdLocalPostOffice } from "react-icons/md";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "297fcefb-4445-4b00-912a-ac02a32095d3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='w-[70%] mx-auto mt-10 flex' name = "Cont">
      <div className='Alphabet w-1/2 p-5'>
        <h1 className='font-semibold text-2xl text-NewAccent'>Send us a message</h1>
        <p className='my-5 w-[67%] text-gray-800'>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our university community.</p>
        <div className='space-x-2 flex items-center text-gray-800'><IoMailSharp className='text-NewAccent' /><span>Contact@EcoFinder.dev</span></div>
        <div className='space-x-2 flex items-center mt-2 text-gray-800'><FaPhoneAlt className='text-NewAccent' /><span>+91 44 2746 9700</span></div>
        <div className='space-x-2 flex items-center mt-2 text-gray-800'><TiLocation className='text-NewAccent'/><span>Rajiv Gandhi Salai (OMR)<br/>Kalavakkam – 603 110<br/>Tamil Nadu, India</span></div>
      </div>
      <div className='Form w-1/2 p-5'>

        <form className='flex flex-col' onSubmit={onSubmit}>
            <label>Your Name</label>
            <input name = "Name" placeholder='Enter Name' className='p-[0.7rem] bg-Dom bg-opacity-60 placeholder-white'></input>
            <label className='mt-4'>Phone Number</label>
            <input name = "phno" placeholder='Enter Phone No' className='p-[0.7rem] bg-Dom bg-opacity-60 placeholder-white'></input>
            <label className='mt-4'>Your Email</label>
            <input name = "email" placeholder='Enter Email' className='p-[0.7rem] bg-Dom bg-opacity-60 placeholder-white'></input>
            <label className='mt-4'>Write your messages here</label>
            <textarea rows={6} className='p-[0.7rem] bg-NewDomDark bg-opacity-60 placeholder-white' placeholder='Enter your message'></textarea>
            <button className='flex space-x-2 border bg-NewAccent w-40 h-11 my-5 text-white items-center justify-center rounded-3xl border-none'><span>Submit Now</span><MdLocalPostOffice /></button>
        </form>
        <span className='mx-2'>{result}</span>
      </div>
    </div>
  )
}

export default Contact

import React from 'react'
import Navbar from '../components/Navbar';
import '/src/Styles/index.css'
import Hero from '../components/Hero';
import Academics from '../components/Academics';
import About from '../components/About'
import Title from '../components/Title';
import Contact from '../components/Contact';
import Footer from '../components/Footer'
import Search from '../components/Search';
import ImageVerdict from '../components/ImageVerdict';

const Home = () => {
  return (
    <div >
      <Navbar />
      <Hero />
      <Title Title={"IMAGE ECO-ANALYSER"} SubTitle={"Upload Product Image"}/>
      <ImageVerdict />  
      <Title Title={"ECO-FRIENDLY PRODUCTS"} SubTitle={"Discover Alternatives"}/>
      <Search />
      <Title Title={"QUICK ACCESS"} SubTitle={"Trusted Products"}/>
      <Academics />
      <About />
      <Title Title={"CONTACT US"} SubTitle={"Get in Touch"} />
      <Contact /> 
      <Footer />
    </div>
  )
}

export default Home

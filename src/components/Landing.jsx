import React from 'react'
import Header from './Header'
import Hero from './Hero'
import CompanyLogos from './CompanyLogos'
import Features from './Features'
import AIMentors from './AIMentors'
import Services from './Services'
import Testimonials from './Testimonials'
import GetStarted from './GetStarted'
import Footer from './Footer'




const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CompanyLogos />
        <Features />
        <AIMentors />
        <Services />
        <Testimonials/>
        <GetStarted/>
        <Footer/>
      </main>
    </div>
  )
}

export default Landing

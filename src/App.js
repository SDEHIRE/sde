import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Landing from "./components/Landing"
import ExplorePage from "./components/ExplorePage"
import ProLanding from "./components/ProLandingPage"
import StudentLogin from "./components/student-login"
import CompanyLogin from "./components/recruiter-login"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/Sdehire-pro-landing" element={<ProLanding />} />
        <Route path="/Sdehire-pro-Student-login" element={<StudentLogin />} />
        <Route path="/Sdehire-pro-Company-login" element={<CompanyLogin/>} />




      </Routes>
    </Router>
  )
}

export default App

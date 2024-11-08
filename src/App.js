import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Landing from "./components/Landing"
import ExplorePage from "./components/ExplorePage"
import ProLanding from "./components/ProLandingPage"
import StudentLogin from "./components/student-login"
import CompanyLogin from "./components/recruiter-login"
import ComingSoon from "./components/TempPages/ComingSoon"
import EventsPage from "./components/TempPages/events"
import RequestDemo from "./components/TempPages/RequestDemo"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/Sdehire-pro-landing" element={<ProLanding />} />
        <Route path="/Sdehire-pro-Student-login" element={<StudentLogin />} />
        <Route path="/Sdehire-pro-Company-login" element={<CompanyLogin/>} />
        <Route path="/ComingSoon" element={<ComingSoon/>} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/RequestDemo" element={<RequestDemo/>} />




      </Routes>
    </Router>
  )
}

export default App

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the charts
const growthData = [
  { date: '2024-10-18', score: 89 },
  { date: '2024-10-20', score: 81 },
  { date: '2024-10-22', score: 51 },
  { date: '2024-10-24', score: 35 },
  { date: '2024-10-26', score: 72 },
]

const performanceData = [
  { date: '2024-10-18', score: 28 },
  { date: '2024-10-20', score: 26 },
  { date: '2024-10-22', score: 24 },
  { date: '2024-10-24', score: 10 },
  { date: '2024-10-26', score: 18 },
]

export default function ProfilePage() {
  const [name, setName] = useState('Ashish')
  const [age, setAge] = useState(25)
  const [degree, setDegree] = useState('B.Tech Computer Science')
  const [college, setCollege] = useState('B.V Raju Institute Of Technology')
  const [email, setEmail] = useState('hadhi@gmail.com')
  const [phone, setPhone] = useState('9110593766')
  const [isProfileVisible, setIsProfileVisible] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const navigate = useNavigate()

  const handleUpdateClick = () => {
    const profileData = { name, age, degree, college, email, phone }
    console.log('Profile Data Updated:', profileData)
    // Here you can make a POST request to your backend API
  }

  const handleInterviewPracticeClick = () => {
    navigate('/landing')
  }

  const handleGuidedPracticeClick = () => {
    navigate('/ComingSoon')
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button 
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
            onClick={() => setIsProfileVisible(!isProfileVisible)}
          >
            {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
          </button>
        </div>

        {isProfileVisible && (
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age:</label>
                <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree:</label>
                <input type="text" value={degree} onChange={e => setDegree(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">College:</label>
                <input type="text" value={college} onChange={e => setCollege(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone:</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={handleUpdateClick}>Update</button>
          </div>
        )}

        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Interview Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" onClick={handleInterviewPracticeClick}>
            Go to Interview Practice
          </button>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Progress</h2>
          <div className="space-y-4">
            <div>
              <span className="block mb-1">Linked List</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <span className="block mb-1">Graph</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            {showMore && (
              <>
                <div>
                  <span className="block mb-1">Hash Table</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Tree</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Sort</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Search</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Sales Man</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Brute Force</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </>
              
            )}
            <button className="text-blue-600 hover:underline" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Academic Records</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 1</td><td className="px-6 py-4 whitespace-nowrap">9.2</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 2</td><td className="px-6 py-4 whitespace-nowrap">8.9</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 3</td><td className="px-6 py-4 whitespace-nowrap">9.5</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 4</td><td className="px-6 py-4 whitespace-nowrap">9.5</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 5</td><td className="px-6 py-4 whitespace-nowrap">9.5</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap">Semester 6</td><td className="px-6 py-4 whitespace-nowrap">9.5</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Job Experiences</h2>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Google - Software Engineer</h4>
              <p className="text-gray-600">Worked on large-scale distributed systems.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium">Microsoft - Intern</h4>
              <p className="text-gray-600">Contributed to cloud infrastructure projects.</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Courses</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Data Structures and Algorithms - Completed with distinction</li>
            <li>Operating Systems - Completed</li>
          </ul>
        </div>

        <div className="p-6 flex justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={handleInterviewPracticeClick}>Interview Practice</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" onClick={handleGuidedPracticeClick}>Guided Practice</button>
        </div>
      </div>
    </div>
  )
}
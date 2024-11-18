import React, { useState } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const api = axios.create({
  baseURL: 'http://localhost:5001', // Your backend URL
})

export default function SessionReport() {
  const [reportData, setReportData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reportGenerated, setReportGenerated] = useState(false)

  const fetchReportData = async () => {
    setLoading(true)
    setError(null)
    setReportGenerated(false)

    try {
      const response = await api.get('/get_report')
      setReportData(response.data)
      setReportGenerated(true)
      alert(`Report Data Loaded: ${JSON.stringify(response.data, null, 2)}`)
    } catch (err) {
      setError('Failed to load report data.')
      alert("Failed to load report data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const facialEmotionsData = [
    { emotion: 'Happy', score: Math.random() * 100 },
    { emotion: 'Sad', score: Math.random() * 100 },
    { emotion: 'Angry', score: Math.random() * 100 },
    { emotion: 'Fear', score: Math.random() * 100 },
    { emotion: 'Surprise', score: Math.random() * 100 },
  ]

  const audioAnalysisData = [
    { attribute: 'Clarity', score: Math.random() * 10 },
    { attribute: 'Volume', score: Math.random() * 10 },
    { attribute: 'Speed', score: Math.random() * 10 },
    { attribute: 'Tone', score: Math.random() * 10 },
  ]

  const testCaseData = [
    { name: 'Validated', value: 0 },
    { name: 'Not Validated', value: 100 },
  ]

  const COLORS = ['#FF8042', '#0088FE']

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Session Report</h1>
        <nav className="bg-blue-500 p-4 rounded-lg">
          <ul className="flex space-x-4">
            <li><a href="#about" className="text-white hover:text-blue-200">About</a></li>
            <li><a href="#demo" className="text-white hover:text-blue-200">Demo</a></li>
            <li><a href="#explore" className="text-white hover:text-blue-200">Explore</a></li>
          </ul>
        </nav>
      </header>

      <div className="mb-8">
        <button
          onClick={fetchReportData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate Report
        </button>
      </div>

      {loading && <p className="text-blue-800">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reportGenerated && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="D.Ashish Ratna"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold text-blue-800 mb-2">D.Ashish Ratna</h2>
                <p className="text-blue-600">Branch: AI & DS</p>
                <p className="text-blue-600">College: BV RAJU INSTITUTE OF TECHNOLOGY</p>
                <hr className="my-4" />
                <p className="font-bold text-blue-800">Interview Session Details:</p>
                <p className="text-blue-600">Duration: 3 min</p>
                <p className="text-blue-600">Session ID: 21</p>
                <p className="text-blue-600">Interviewer Name: Liza</p>
                <p className="text-blue-600">Date: 26-10-2024</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Code Analysis</h2>
                <p className="text-blue-600"><strong>Code Snippet:</strong> {reportData.code_analysis?.code_snippet || "N/A"}</p>
                <h3 className="text-xl font-bold text-blue-800 mt-4 mb-2">Structure</h3>
                <p className="text-blue-600"><strong>Number of Lines:</strong> {reportData.code_analysis?.analysis?.structure?.num_lines || 0}</p>
                <p className="text-blue-600"><strong>Number of Functions:</strong> {reportData.code_analysis?.analysis?.structure?.num_functions || 0}</p>
                <p className="text-blue-600"><strong>Average Indentation:</strong> {reportData.code_analysis?.analysis?.structure?.avg_indentation?.toFixed(2) || "N/A"}</p>
                <h3 className="text-xl font-bold text-blue-800 mt-4 mb-2">Naming Conventions</h3>
                <p className="text-blue-600"><strong>Number of Camel Case Names:</strong> {reportData.code_analysis?.analysis?.naming_conventions?.num_camel_case || 0}</p>
                <p className="text-blue-600"><strong>Number of Snake Case Names:</strong> {reportData.code_analysis?.analysis?.naming_conventions?.num_snake_case || 0}</p>
                <h3 className="text-xl font-bold text-blue-800 mt-4 mb-2">Coding Patterns</h3>
                <p className="text-blue-600"><strong>Uses List Comprehension:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_list_comprehension ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Lambda:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_lambda ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Decorators:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_decorators ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Docstrings:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_docstrings ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Exception Handling:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_exception_handling ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Classes:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_classes ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Uses Inheritance:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.uses_inheritance ? "Yes" : "No"}</p>
                <p className="text-blue-600"><strong>Cyclomatic Complexity:</strong> {reportData.code_analysis?.analysis?.coding_patterns?.cyclomatic_complexity || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Confidence Analysis</h2>
            <p className="text-blue-600"><strong>Original Sentence:</strong> {reportData.confidence?.original_sentence}</p>
            <p className="text-blue-600"><strong>Rewritten Sentence:</strong> {reportData.confidence?.rewritten_sentence}</p>
            <p className="text-blue-600"><strong>Original Score:</strong> {reportData.confidence?.original_score}</p>
            <p className="text-blue-600"><strong>Modified Score:</strong> {reportData.confidence?.modified_score}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Emotion Analysis</h2>
            <p className="text-blue-600"><strong>Emotion:</strong> {reportData.emotions?.emotion}</p>
            <p className="text-blue-600"><strong>Emotion Scores:</strong> {JSON.stringify(reportData.emotions?.emotion_scores)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Audio Processing</h2>
            <p className="text-blue-600"><strong>Transcript:</strong> {reportData.audio_process?.transcript}</p>
            <p className="text-blue-600"><strong>Confidence:</strong> {reportData.audio_process?.confidence}</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Facial Emotions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={facialEmotionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="emotion" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Audio Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={audioAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attribute" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Test Case Validation</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={testCaseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#3B82F6"
                    label
                  >
                    {testCaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const InstructionsModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Interview Instructions</h2>
      <p>Welcome to the interview! Here are some instructions to help you get started:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>Make sure your camera and microphone are working.</li>
        <li>Read the problem statement carefully before starting.</li>
        <li>Use the code pad to write and test your code.</li>
        <li>Click "Submit" to submit your code when ready.</li>
        <li>If you need hints, click on the hint buttons provided.</li>
      </ul>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)

const HintModal = ({ hint, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Hint</h2>
      <p>{hint}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)

export default function GuidedPracticePage() {
  const [time, setTime] = useState(49 * 60)
  const [problemStatement, setProblemStatement] = useState(null)
  const [hints, setHints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userCode, setUserCode] = useState("")
  const [showInstructions, setShowInstructions] = useState(true)
  const [currentHint, setCurrentHint] = useState('')
  const [showHintPop, setShowHintPop] = useState(false)
  const [transcripts, setTranscripts] = useState(["Hello , let's begin the guided practice!"])
  const [output, setOutput] = useState(null)
  const transcriptRef = useRef(null)
  const [randomQuestion, setRandomQuestion] = useState(null)
  const [userTestCases, setUserTestCases] = useState([])
  const [emotion, setEmotion] = useState("Unknown")
  const navigate = useNavigate()

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [])

  useEffect(() => {
    if (showInstructions) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showInstructions])

  
  
 



















  let isSpeaking = false;
let voices = [];
let audioPlaying = false;

const updateVoices = () => {
  const synth = window.speechSynthesis;
  voices = synth.getVoices();
};

const speakText = (text) => {
  if (isSpeaking) return;  // Exit if already speaking
  
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Set the voice to a female one (first female voice available)
  const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices[0];
  utterance.voice = femaleVoice;

  utterance.onstart = () => {
    isSpeaking = true;  // Set flag to true when speech starts
    audioPlaying = true;
    playVideo2(); // Play the new video when audio starts
  };

  utterance.onend = () => {
    isSpeaking = false;  // Set flag to false when speech ends
    audioPlaying = false;
    playVideo1(); // Revert to old video after audio completes
  };

  synth.speak(utterance);
};

// Function to play the second video (the new one while audio is playing)
const playVideo2 = () => {
  const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');
  
  video1.style.display = 'none'; // Hide the first video
  video2.style.display = 'block'; // Show the second video
  video2.play();
};

// Function to play the first video again (when audio finishes)
const playVideo1 = () => {
  const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');
  
  video2.style.display = 'none'; // Hide the second video
  video1.style.display = 'block'; // Show the first video again
  video1.play();
};

// Update voices list when voices change (e.g., when the page loads)
if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = updateVoices;
} else {
  updateVoices();  // Fallback for browsers without onvoiceschanged
}















  const addTranscript = (newText) => {
    setTranscripts((prevTranscripts) => {
      const updatedTranscripts = [...prevTranscripts, newText]
      speakText(newText)
      return updatedTranscripts
    })
  }

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startProcesses = async () => {
    try {
      await axios.post('http://localhost:5002/start_all_processes', { duration: 10 })
      console.log("Started emotion recognition and audio analysis.")
    } catch (error) {
      console.error("Failed to start processes:", error)
    }
  }

  const stopProcesses = async () => {
    try {
      await axios.post('http://localhost:5002/stop_all_processes')
      console.log("Stopped emotion recognition and audio analysis.")
    } catch (error) {
      console.error("Failed to stop processes:", error)
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  






  const handleEndSession = async () => {
    if (!randomQuestion || !randomQuestion._id) {
      setError('No question data available to end the session. Please try again.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Prepare the payload for evaluation API
      const evaluatePayload = {
        code: userCode,           // User's submitted code
        testCases: userTestCases,  // Test cases fetched from the problem
        questionId: randomQuestion._id,  // Question ID
      };
  
      // Send the code and test cases to the evaluation API
      const evaluationResponse = await axios.post('https://backendexpress-mi00.onrender.com/api/evaluate', evaluatePayload);
      const evaluationResults = evaluationResponse.data.results;
      const totalPassed = evaluationResponse.data.totalPassed;
  
      // Create the alert message based on the evaluation results
      let alertMessage = `Test Case Results: \n`;
  
      evaluationResults.forEach((result, index) => {
        alertMessage += `\nTest Case ${index + 1}: \n`;
        alertMessage += `Input: ${result.input}\n`;
        alertMessage += `Expected Output: ${result.expectedOutput}\n`;
        alertMessage += `Actual Output: ${result.actualOutput}\n`;
        alertMessage += `Passed: ${result.passed ? 'Yes' : 'No'}\n\n`;
      });
  
      alertMessage += `Total Passed Test Cases: ${totalPassed}`;
  
      // Display the alert with the evaluation summary
      alert(alertMessage);
  
      // Combine results and question data for the session report
      const sessionData = {
        evaluationResults,
        totalPassed,
        nextQuestion: randomQuestion,  // Include full question data
      };
  
      // Stop any ongoing processes (e.g., timers)
      await stopProcesses();
  
      // Navigate to the Session Report and pass the session data
      navigate('/SessionReport', { state: sessionData });
  
    } catch (error) {
      console.error('Error during end session process:', error.message);
      setError('An error occurred while ending the session. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  








  
  
  























  const fetchProblemStatement = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Fetch a random question from the backend
      const response = await axios.get('https://backendexpress-mi00.onrender.com/api/question');
      const questionData = response.data;
  
      // Log the fetched question for debugging
      console.log('Fetched Question:', questionData);
  
      // Update states with the question data
      setProblemStatement(questionData.QText);
      setHints(questionData.hints.map(hint => hint.hint));
      setUserTestCases(questionData.test_cases);
      setRandomQuestion(questionData); // Store the entire question object, including _id
    } catch (error) {
      console.error('Error fetching the problem statement:', error.message);
      setError('Failed to load problem statement. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

































  
  

  const handleSubmitCode = async () => {
    if (userCode.trim().split('\n').length > 0) {
      try {
        const response = await axios.post('https://backendexpress-mi00.onrender.com/compile_code', {
          code: userCode,

        })
        const { output } = response.data
        setOutput(output)
        addTranscript(`Output: ${output}`)
      } catch (error) {
        console.error('Error compiling code:', error)
        alert('Failed to compile code. Please try again.')
      }
    } else {
      alert('Please write at least 2 lines of code.')
    }
  }

  

  const handleHintClick = (hint) => {
    if (hint) {
      addTranscript(`Hint: ${hint}`)
      setCurrentHint(hint)
      setShowHintPop(true)
    }
  }

  const closeHintPop = () => {
    setShowHintPop(false)
  }

  useEffect(() => {
    return () => {
      stopProcesses()
    }
  }, [])

  const closeInstructions = () => {
    setShowInstructions(false)
  }































































  return (
    <div className="min-h-screen bg-blue-100">
      {showInstructions && <InstructionsModal onClose={closeInstructions} />}

      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="logo2.png" alt="SDE Hire Logo" className="h-12" />
          <h2 className="text-2xl font-bold">Level 1 - Guided Practice</h2>
        </div>
      </header>

      <main className="container mx-auto p-4 md:flex md:space-x-4">
        <div className="md:w-1/2 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-bold mb-4">Interviewer Online</h3>
            <div className="flex items-start space-x-4">
              <div className="w-1/3">
                <div className="text-center mb-2">
                  <h4 className="font-semibold">Lisa</h4>
                  <p>AI Interviewer</p>
                </div>
                <div className="video-container">
  <video id="video1" className="w-full h-40 object-cover rounded-lg" autoPlay muted loop>
    <source src="personalised.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <video id="video2" className="w-full h-40 object-cover rounded-lg" autoPlay muted loop style={{ display: 'none' }}>
    <source src="interview.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
                 </div>
              

              <div className="flex-1 w-2/3">
                <h5 className="font-semibold mb-2">Transcripts</h5>
                <div className="h-[calc(100vh-36rem)] min-h-[12rem] overflow-y-auto bg-blue-50 p-2 rounded" ref={transcriptRef}>
                  {transcripts.map((transcript, index) => (
                    <p key={index} className="mb-2">{transcript}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Problem Statement</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-[calc(100vh-32rem)] min-h-[16rem] overflow-y-auto">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <pre className="whitespace-pre-wrap text-sm">{problemStatement || 'Click the button below to load a new problem statement.'}</pre>
              )}
            </div>
            <div className="mt-4 space-x-2">
              {hints.map((hint, index) => (
                <button
                  key={index}
                  onClick={() => handleHintClick(hint)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Hint {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={fetchProblemStatement}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Loading...' : 'Load New Problem'}
            </button>
          </div>
        </div>

        <div className="md:w-1/2 space-y-4 mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Your Code</h3>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Write your code here..."
              className="w-full h-[calc(100vh-20rem)] min-h-[24rem] p-2 bg-black text-white rounded"
            />
            <button
              onClick={handleSubmitCode}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Code
            </button>
          </div>

          {output && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold mb-4">Output</h3>
              <pre className="whitespace-pre-wrap bg-black text-white p-4 rounded">{output}</pre>
            </div>
          )}
        </div>
      </main>

      {showHintPop && <HintModal hint={currentHint} onClose={closeHintPop} />}

      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <button
            onClick={handleEndSession}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100"
          >
            End Session
          </button>
        </div>
      </footer>
    </div>
  )
}
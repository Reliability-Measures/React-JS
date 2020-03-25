import React from 'react'
import './App.css'
import EnterlistSTD from './components/enterlistSTD'
import EnterlistPropo from './components/enterlistPropo'
import EnterlistSum from './components/enterlistSum'

function App() {
  return (
    <div className="App">
        <div className="App-header">
          ReliabilityMeasures
        </div>
        <EnterlistSTD />
        <EnterlistSum />
        <EnterlistPropo />
        <a
          className="App-link"
          href="https://github.com/ThahaShahzad/ReliabilityMeasures"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github for this project
        </a>
    </div>
  )
}

export default App

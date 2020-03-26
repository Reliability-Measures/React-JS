import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import EnterlistSTD from './components/enterlistSTD'
import EnterlistPropo from './components/enterlistPropo'
import EnterlistSum from './components/enterlistSum'
import Home from './components/Home'
import Error from './components/Error'
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-header">
          ReliabilityMeasures
          <a
          className="App-link"
          href="https://github.com/ThahaShahzad/ReliabilityMeasures"
          target="_blank"
          rel="noopener noreferrer"
          >
            Github for this project
          </a>
        </div>
         <div><Navigation /></div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/std" component={EnterlistSTD} />
            <Route path="/sum" component={EnterlistSum} />
            <Route path="/prop" component={EnterlistPropo} />
            <Route component={Error} />
          </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

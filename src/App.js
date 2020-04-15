import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//import Home from './components/Home'
import Error from './components/Error'
import Navigation from './components/Navigation'
import Analyze from './components/Analyze'
import Analyze_Test from './components/Analyze_test'
import {get_config} from './components/config'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            {get_config('application_name')}
        </header>
         <div><Navigation /></div> 
        
          <Switch>
            <Route path="/" component={Analyze_Test} exact />
            <Route path="/old" component={Analyze} exact />
            <Route component={Error} />
          </Switch>
       
        {/* <footer className="footer">
          &copy;  Reliability Measures - All Rights Reserved.
          <br></br>
          <a
          className="gitlink"
          href="https://github.com/Reliability-Measures"
          target="_blank"
          rel="noopener noreferrer"
          >
            Github for this project
          </a>
        </footer> */}
      </div>
    </BrowserRouter>
  )
}

export default App

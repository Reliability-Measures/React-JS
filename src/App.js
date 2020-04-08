import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import EnterlistSTD from './components/enterlistSTD'
import EnterlistPropo from './components/enterlistPropo'
import EnterlistSum from './components/enterlistSum'
import Kr20 from './components/kr20'
//import Home from './components/Home'
import Error from './components/Error'
//import Navigation from './components/Navigation'
import Pbcc from './components/pbcc'
import Testdata from './components/Testdata'
import Analyze from './components/Analyze'
import {get_config} from './components/config'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            {get_config('application_name')}
        </header>
        {/* <div><Navigation /></div> */}
        
          <Switch>
            <Route path="/" component={Analyze} exact />
            <Route path="/std" component={EnterlistSTD} />
            <Route path="/sum" component={EnterlistSum} />
            <Route path="/prop" component={EnterlistPropo} />
            <Route path="/kr20" component={Kr20} />
            <Route path="/pbcc" component={Pbcc} />
            <Route path="/testdata" component={Testdata} />
            <Route path="/analyze" component={Analyze} />
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

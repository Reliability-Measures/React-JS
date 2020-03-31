import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import EnterlistSTD from './components/enterlistSTD'
import EnterlistPropo from './components/enterlistPropo'
import EnterlistSum from './components/enterlistSum'
import Kr20 from './components/kr20'
import Home from './components/Home'
import Error from './components/Error'
import Navigation from './components/Navigation'
import Pbcc from './components/pbcc'
import Testdata from './components/Testdata'
import Test from './components/Test'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          Reliability Measures Microservices
        </header>
        <div><Navigation /></div>
        
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/std" component={EnterlistSTD} />
            <Route path="/sum" component={EnterlistSum} />
            <Route path="/prop" component={EnterlistPropo} />
            <Route path="/kr20" component={Kr20} />
            <Route path="/pbcc" component={Pbcc} />
            <Route path="/testdata" component={Testdata} />
            <Route path="/test" component={Test} />
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

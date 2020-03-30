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



function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h1 className="App-header">
          Reliability Measures Microservices
        </h1>
        <div><Navigation /></div>
        <body className="body">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/std" component={EnterlistSTD} />
            <Route path="/sum" component={EnterlistSum} />
            <Route path="/prop" component={EnterlistPropo} />
            <Route path="/kr20" component={Kr20} />
            <Route path="/pbcc" component={Pbcc} />
            <Route component={Error} />
          </Switch>
        </body>
        <footer className="footer">
        &copy; 2020 reliabilitymeasures.com
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

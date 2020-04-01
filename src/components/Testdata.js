import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './components.css'

function Testdata() {
  const [item, setitem] = useState("")
  const [itemresponses, setitemresponses] = useState([])
  const [kr20json, setkr20json] = useState({})

  const handleSubmit = e => {
    e.preventDefault();
    if (!item) return;
    setitemresponses(prevState => [
      ...prevState, 
      { itemresponses: item.split(',').map(Number) }
    ])
    setitem('')
  }
  useEffect(() =>{
    setkr20json(prevStat => ({
      ...prevStat,
      "students": itemresponses
    }))
  },[itemresponses])


  const handleclick = e =>{
    let url = 'http://visonics.net/rm/';
    axios.post(url +'kr20/' + JSON.stringify(kr20json))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("kr20").innerHTML = "Kr20 = " + JSON.stringify(response.data.KR20);
    })
    .catch(function (error) {
      console.log(error);
    })
    axios.post(url +'pbcc/' + JSON.stringify(kr20json))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("pbcc").innerHTML = "Pbcc = " + JSON.stringify(response.data.pbcc);
    })
    .catch(function (error) {
      console.log(error);
    })
    axios.post(url +'difficulty/' + JSON.stringify(kr20json))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("diff").innerHTML = "Difficulty = " + JSON.stringify(response.data.difficulty);
      

    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (

   <div className="row">
       <div className="col-md-4"></div>
    <div className="card text-center col-md-4">
         <div className="card-header bg-info text-white h2">
         Calculate Test Reliabilty
        </div>
  <div class="card-body">
    <h5 class="card-title">Analyze your Teacher-Made tests</h5>
    <p class="card-text">Provide you with reliability indicators to help you determine your tests’ capabilities for assessing your students.</p>
  </div>

        <br></br>
        <form onSubmit={handleSubmit}>
            Enter student scores: &nbsp; 
          <input 
            type="textarea"
            value={item}
            placeholder=""
            onChange={e => setitem(e.target.value)}
          />
        </form>
        <br></br>
        <div class="h5">
          {JSON.stringify(itemresponses, null, 4)}
        </div>
        <br></br>
        <button className="btn btn-danger btn-lg" onClick={handleclick}>Compute !</button>
        <br></br>
        <div class="card-footer">
        <h3 id="kr20"> </h3>
        <h3 id="pbcc"> </h3>
        <h3 id="diff"> </h3>
        </div>

    </div>
    <div className="col-md-4"></div>
    </div>
  )
}  
  
export default Testdata

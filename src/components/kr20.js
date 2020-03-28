import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './components.css'


function Kr20() {
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
    axios.post('http://127.0.0.1:5000/kr20/' + JSON.stringify(kr20json))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("kr20").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={item}
            placeholder="itemresponses"
            onChange={e => setitem(e.target.value)}
          />
        </form>
        <button onClick={handleclick}>Calculate Kr20</button>
        <div>
          {JSON.stringify(itemresponses)}
        </div>
        <p className="data" id="kr20"></p>
    </div>
  )
}  
  
export default Kr20

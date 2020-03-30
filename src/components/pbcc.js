import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Pbcc() {
  const [item, setitem] = useState("")
  const [itemresponses, setitemresponses] = useState([])
  const [pbccjson, setpbcc] = useState({})

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
    setpbcc(prevStat => ({
      ...prevStat,
      "students": itemresponses
    }))
  },[itemresponses])

  const handleclick = e =>{
    axios.post('http://visonics.net/rm/pbcc/' + JSON.stringify(pbccjson))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("pbcc").innerHTML = "Pbcc = " + JSON.stringify(response.data.pbcc);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div className="mbody">
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={item}
            placeholder="itemresponses"
            onChange={e => setitem(e.target.value)}
          />
        </form>
        <button onClick={handleclick}>Calculate Pbcc</button>
        <div>
          {JSON.stringify(itemresponses)}
        </div>
        <p id="pbcc"></p>
    </div>
  )
}  
  
export default Pbcc

import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
    axios.post('http://visonics.net/rm/kr20/' + JSON.stringify(kr20json))
    .then(function (response) {
      console.log(response.data, response.data);
      document.getElementById("kr20").innerHTML = "Kr20 = " + JSON.stringify(response.data.KR20);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div className="mbody">
        <form onSubmit={handleSubmit}>
          <br></br>
          Enter student scores: &nbsp; 
          <input
            type="textarea"
            value={item}
            placeholder=""
            onChange={e => setitem(e.target.value)}
          />
        </form>
        <br></br>
        <button className="btn btn-success" onClick={handleclick}>Calculate Kr20</button>
        <div>
          {JSON.stringify(itemresponses)}
        </div>
        <p id="kr20"></p>
    </div>
  )
}  
  
export default Kr20

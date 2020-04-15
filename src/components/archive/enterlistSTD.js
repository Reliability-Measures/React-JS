import React, { useState } from 'react'
import axios from 'axios'
import './components.css'

function EnterlistSTD() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    let numbers = newItem.split(",").map(Number);
    
    let userlist = {elements: numbers};
    document.getElementById("dataSTD").innerHTML = JSON.stringify(userlist.elements);
    axios.post('http://visonics.net/rm/std/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data)
      console.log(response.data.STD)
      document.getElementById("std").innerHTML = "STandard Deviation = " + JSON.stringify(response.data.Std);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div className="mbody">
      <p>Enter list separated by a comma and press Enter to get the standard deviation.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={newItem}
            placeholder="Enter list"
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
        <p id="dataSTD"></p>
        <p id="std"></p>

    </div>
  )
   
}


export default EnterlistSTD
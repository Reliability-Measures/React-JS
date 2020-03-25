import React, { useState } from 'react'
import axios from 'axios'
import './components.css'


function Enterlist() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    let numbers = newItem.split(",").map(Number);
    
    let userlist = {elements: numbers};
    document.getElementById("data").innerHTML = JSON.stringify(userlist);
    axios.post('http://127.0.0.1:5000/std/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data, response.data.STD);
      document.getElementById("std").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://127.0.0.1:5000/summation/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data, response.data.sum);
      document.getElementById("sum").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

  return (
    <div>
      <p>Enter list separated by a comma and press Enter to get std and summation results.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={newItem}
            placeholder="Enter list"
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
        <p className="data" id="data"></p>
        <p className="data" id="std"></p>
        <p className="data" id="sum"></p>

    </div>
  )
   
}


export default Enterlist
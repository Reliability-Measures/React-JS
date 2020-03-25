import React, { useState } from 'react'
import axios from 'axios'
import './components.css'


function EnterlistPropo() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    let numbers = newItem.split(",").map(Number);
    let userlist = {twoElements: [numbers[0], numbers[1]]};
    document.getElementById("dataPropo").innerHTML = JSON.stringify(userlist);
    axios.post('http://127.0.0.1:5000/proportion/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data, response.data.proportion);
      document.getElementById("proportion").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

  return (
    <div>
      <p>Enter two numbers separated by a comma and press Enter to get the proportion.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={newItem}
            placeholder="Enter list"
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
        <p className="data" id="dataPropo"></p>
        <p className="data" id="proportion"></p>

    </div>
  )
   
}


export default EnterlistPropo
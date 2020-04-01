import React, { useState } from 'react'
import axios from 'axios'


function EnterlistSum() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    let numbers = newItem.split(",").map(Number);
    
    let userlist = {elements: numbers};
    document.getElementById("dataSum").innerHTML = JSON.stringify(userlist);
    axios.post('http://visonics.net/rm/summation/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data, response.data.sum);
      document.getElementById("sum").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

  return (
    <div className="mbody">
      <p>Enter list separated by a comma and press Enter to get the sum.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={newItem}
            placeholder="Enter list"
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
        <p id="dataSum"></p>
        <p id="sum"></p>

    </div>
  )
   
}


export default EnterlistSum
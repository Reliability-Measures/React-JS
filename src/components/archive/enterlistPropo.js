import React, { useState } from 'react'
import axios from 'axios'


function EnterlistPropo() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    let numbers = newItem.split(",").map(Number);
    let userlist = {twoElements: [numbers[0], numbers[1]]};
    document.getElementById("dataPropo").innerHTML = JSON.stringify(userlist);
    axios.post('http://visonics.net/rm/proportion/' + JSON.stringify(userlist))
    .then(function (response) {
      console.log(response.data, response.data.proportion);
      document.getElementById("proportion").innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

  return (
    <div className="mbody">
      <p>Enter two numbers separated by a comma and press Enter to get the proportion.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={newItem}
            placeholder="Enter list"
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
        <p id="dataPropo"></p>
        <p id="proportion"></p>

    </div>
  )
   
}


export default EnterlistPropo
import React from "react";
import axios from 'axios'
import MaterialTable from "material-table";
import './components.css'


export default function Test() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Item responses", field: 'itemresponses'},
    ],
    data: [
        
    ]
        
    
  })
  const [krpb, setkrpb] = React.useState({})
  React.useEffect(() =>{
    setkrpb(prevStat => ({
      ...prevStat,
      "students": state.data
    }))
  },[state])
    console.log(krpb)
    console.log(krpb.students)



    const handleclick = e =>{
        let url = 'http://visonics.net/rm/';
        axios.post(url +'kr20/' + JSON.stringify(krpb))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("kr20").innerHTML = "Kr20 = " + JSON.stringify(response.data.KR20);
        })
        .catch(function (error) {
          console.log(error);
        })
        axios.post(url +'pbcc/' + JSON.stringify(krpb))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("pbcc").innerHTML = "Pbcc = " + JSON.stringify(response.data.pbcc);
        })
        .catch(function (error) {
          console.log(error);
        })
        axios.post(url +'difficulty/' + JSON.stringify(krpb))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("diff").innerHTML = "Difficulty = " + JSON.stringify(response.data.difficulty);
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
  return (
    <React.Fragment>
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
        </div>
     </div>

        <div class="container">
    <div className="col-md-12">
    <MaterialTable
      title="Item responses:"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data};
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data =[...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
          
      }}
    />
    </div>
    </div>
    <div className="text-center">
            <button type="button" className="btn btn-danger" color="primary" variant="contained" onClick={handleclick}
            >
            Compute 
            </button>
        </div>
        <h3 id="kr20"> </h3>
        <h3 id="pbcc"> </h3>
        <h3 id="diff"> </h3>

    </React.Fragment>
    
  );
}

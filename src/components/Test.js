import React ,{useCallback} from "react"
import axios from 'axios'
import './components.css'
import csv from "csv";
import { useDropzone } from "react-dropzone"
import MaterialTable from "material-table"


export default function Test() {
    const [state, setState] = React.useState({
        columns: [
          { title: "Item responses", field: 'itemresponses'},
        ],
        data: [
            
        ]
            
        
      })

    const handleclick = e =>{
        let url = 'http://visonics.net/rm/';
        //let url1 = 'http://127.0.0.1:5000/';
        let data = []
        state.data.forEach(function fn(item) {
            console.log(item);
            data.push({itemresponses: item.itemresponses.split(',').map(Number)});    
        })
        data = {students: data}
        console.log(data)
        axios.post(url +'kr20/' + JSON.stringify(data))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("kr20").innerHTML = "Kr20 = " + JSON.stringify(response.data.KR20);
        })
        .catch(function (error) {
          console.log(error);
        })
        axios.post(url +'pbcc/' + JSON.stringify(data))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("pbcc").innerHTML = "Item discrimination = " + JSON.stringify(response.data.pbcc);
        })
        .catch(function (error) {
          console.log(error);
        })
        axios.post(url +'difficulty/' + JSON.stringify(data))
        .then(function (response) {
          console.log(response.data, response.data);
          document.getElementById("diff").innerHTML = "Item difficulty = " + JSON.stringify(response.data.difficulty);
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      const handlesample = useCallback( e =>{
        e.preventDefault();
        let data1 = [
            {itemresponses: '1, 0, 1, 1, 0, 0'},
            {itemresponses: '0, 1, 1, 1, 1, 1'},
            {itemresponses: '0, 1, 0, 0, 0, 0'},
            {itemresponses: '1, 1, 1, 1, 1, 1'},
            {itemresponses: '0, 0, 0, 0, 1, 0'}
        ]
        
        console.log(data1)

        setState(prevStat => ({
            ...prevStat,
            data: data1
            })
        ,[state.data])
                
        state.data = []
        data1.forEach(function fn(item) {
            state.data.push({itemresponses: item.itemresponses})
        })   
        console.log(state.data) 

        handleclick()
        
    },[state.data])

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();
    
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          // Parse CSV file
          csv.parse(reader.result, (err, data1) => {
            console.log("Parsed CSV data: ", data1);
            let state_data = []
            data1.forEach(function fn(item) {
                console.log(item)
                state_data.push({itemresponses: item.map(Number).toString()})
            })
            console.log(state_data)
        setState(prevStat => ({
            ...prevStat,
            data: state_data
            })
        ,[state.data])

        state.data = []
        state_data.forEach(function fn(item) {
            state.data.push({itemresponses: item.itemresponses})
        })   
        console.log(state.data)            
        handleclick()
            
          });
        };
    
        // read file contents
        acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      }, [state.data]);

      const { getRootProps, getInputProps} = useDropzone({ onDrop });
      

  return (
    <React.Fragment>
     <div className="row">

        <div className="card text-center col-md-8">
            <div className="card-header bg-info text-white h2">
                Calculate Test Reliabilty
            </div>
            <div className="card-body">
              <h5 className="card-title">Analyze your Teacher-Made tests</h5>
              <p className="card-text">Provide you with reliability indicators to help you determine your tests’ capabilities for assessing your students.</p>
              <p className="card-text">Please enter student responses below (comma separated, one student at a time) or <span onClick={handlesample}><a href=" ">Use this data</a></span>.</p>
              <div className="btn btn-primary" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' Drop score CSV file here or click to upload</p>
              </div>
              <MaterialTable
            options={{
                selection: true
              }}
              actions={[
                {
                  tooltip: 'Remove All Selected Users',
                  icon: 'delete',
                  onClick: (evt, deldata) => {
                      let ans = window.confirm('You want to delete ' + deldata.length + ' rows');
                      if (ans === true) {
                        setState(prevState => {
                            const data =[...prevState.data];
                            deldata.forEach(function fn(item) {
                            data.splice(data.indexOf(item), 1);
                            })
                            return { ...prevState, data };
                        }
                  )}}
                }
              ]}
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

    <div className="card col-md-4">
    <div className="card-header bg-info text-white h2">
                Results
            </div>  
            <div className="card-body">          
        <div className="text-center">
            <button type="button" className="btn btn-danger btn-lg" color="primary" variant="contained" onClick={handleclick}
            >
            Compute 
            </button>
        </div>

     <div className="text-center"> <br></br>
        <h5 id="kr20"> </h5>
        <h5 id="pbcc"> </h5>
        <h5 id="diff"> </h5>
        </div>
     </div>    
    </div>
    </div>
 
    </React.Fragment>
    
  );
}

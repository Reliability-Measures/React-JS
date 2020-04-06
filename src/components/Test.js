import React , {useState} from "react"
import axios from 'axios'
import './components.css'
import csv from "csv";
import Dropzone from 'react-dropzone'
//import MaterialTable from "material-table"
import {get_service_config, get_config, convertToArrayOfObjects} from './config'

export default function Test() {
  const [fileNames, setFileNames] = useState([]);
  const [fileNamess, setFileNamess] = useState([]);
    // const [state, setState] = useState({
    //     columns: [
    //       { title: "Graduation Year", field: 'gradYear'},
    //       { title: "Id", field: 'id'},
    //       { title: "First Name", field: 'firstName'},
    //       { title: "Last Name", field: 'lastName'},
    //       { title: "Email", field: 'email'},
    //       { title: "Item responses", field: 'itemresponses'}
    //     ],
    //     data: [
            
    //     ]
            
        
    //   })
    //   const handlesample = useCallback( e =>{
    //     e.preventDefault();
    //     let data1 = [
    //         {gradYear: '2020', id: '1231', firstName:'boby', lastName:'shane', email:'qqwe@gmail.com', itemID:'1, 2, 3, 4, 5, 6', itemresponses: '0, 1, 1, 1, 1, 1'},
    //         {gradYear: '2023', id: '3453', firstName:'dany', lastName:'richy', email:'erte@gmail.com', itemID:'5, 2, 1, 6, 3, 4', itemresponses: '0, 1, 1, 1, 1, 1'},
    //         {gradYear: '2024', id: '4567', firstName:'adib', lastName:'azwat', email:'erty@gmail.com', itemID:'5, 2, 6, 4, 1, 3', itemresponses: '0, 1, 0, 0, 0, 0'},
    //         {gradYear: '2022', id: '9768', firstName:'daha', lastName:'roood', email:'tuyt@gmail.com', itemID:'3, 1, 5, 4, 6, 2', itemresponses: '1, 1, 1, 1, 1, 1'},
    //         {gradYear: '2021', id: '5234', firstName:'khiz', lastName:'whize', email:'werw@gmail.com', itemID:'6, 5, 4, 3, 2, 1', itemresponses: '0, 0, 0, 0, 1, 0'}
    //     ]

    //     setState(prevStat => ({
    //         ...prevStat,
    //         data: data1
    //         })
    //     ,[state.data])
    //     state.data = []
    //     state.data.push(data1)
         
        
    //     //handleclick()
    //     //eslint-disable-next-line
    // },[state.data])

    const handleclick = e =>{
        //let url = 'http://visonics.net/rm/';
        //let url1 = 'http://127.0.0.1:5000/';

        // let fjson = []
        // console.log(state.data)
        
        
        // fjson = {studentslist: state.data.StudentsList.itemresponses}
        // console.log(fjson)

        // axios.post('http://127.0.0.1:5000/analyzeTest/' + JSON.stringify())
        //   .then(function (response) {
        //     console.log(response.analysis);
        //     document.getElementById("analz").innerHTML = JSON.stringify(response.analysis);
            
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
      }


      // Csv upload
      const handleDropC = acceptedFiles =>{
        setFileNames(acceptedFiles.map(file => file.name))
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => {
            if (err) {
              alert("File not in CSV format")
            } else {
              console.log("Parsed CSV data: ", data)
              let obj = convertToArrayOfObjects(data)
              console.log(obj)
              for (let i=0;i<obj.length;i++) {
                 let item = obj[i]
                 let keys = Object.keys(item)
                 let items = []
                 keys.forEach(function get_key(key) {
                  console.log(key, parseInt(key)) 
                  if (!(isNaN(parseInt(key)))) {
                    items.push({item_id: parseInt(key), response: parseInt(item[key])})
                    delete item[key]
                  }
                 })
                 item["item_responses"] = items
              }
              console.log(obj)
              console.log(acceptedFiles[0].name)
              let jsonStr = {student_list: obj, exam_info: {name: acceptedFiles[0].name.split(".")[0]} }
              axios.post(get_config('test_url') + get_service_config(6, 'api_method') + JSON.stringify(jsonStr))
              .then(function (response) {
                console.log(response.data.analysis);
                console.log(response.data.input);
                document.getElementById("analzkr").innerHTML = JSON.stringify(response.data.analysis[0])
                document.getElementById("analzpbcc").innerHTML = JSON.stringify(response.data.analysis[1])
                document.getElementById("analzitemdiff").innerHTML = JSON.stringify(response.data.analysis[2])
                document.getElementById("analzscores").innerHTML = JSON.stringify(response.data.analysis[3])
                document.getElementById("analzavg").innerHTML = JSON.stringify(response.data.analysis[4])
                
              })
              .catch(function (error) {
                console.log(error);
              })
            }
          })
          
        
        }
        acceptedFiles.forEach(file => reader.readAsBinaryString(file))
      }


      // Json upload
      const handleDropJ = acceptedFiles =>{
        setFileNamess(acceptedFiles.map(file => file.name))
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          let jsonStr = JSON.parse(reader.result)
          console.log(jsonStr)
          axios.post(get_config('test_url') + get_service_config(6, 'api_method') + JSON.stringify(jsonStr))
          .then(function (response) {
            console.log(response.data.analysis);
            console.log(response.data.input);
            document.getElementById("analz").innerHTML = JSON.stringify(response.data.analysis);
          })
          .catch(function (error) {
            console.log(error);
          })
        }
        acceptedFiles.forEach(file => reader.readAsBinaryString(file))
      }
      
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
              <p className="card-text">Please enter student responses below (comma separated, one student at a time) or upload CSV or JSON file.</p>
              <Dropzone onDrop={handleDropC}
              accept=".csv,.txt"
              >
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop csv files, or click to select files</p>
                  <div>
                <ul className="ba">
                  {fileNames.map(fileName => (
                    <li key={fileName}>{fileName}</li>
                  ))}
                </ul>
              </div>
                </div>
                )}
              </Dropzone>
              <Dropzone onDrop={handleDropJ}
              accept=".json,.txt"
              >
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop json file, or click to select file</p>
                  <div>
                <ul className="ba">
                  {fileNamess.map(fileNames => (
                    <li key={fileNames}>{fileNames}</li>
                  ))}
                </ul>
              </div>
                </div>
                )}
              </Dropzone>
             

              {/* <MaterialTable
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
                /> */}
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
        <h5 id="analzkr"> </h5>
        <h5 id="analzpbcc"> </h5>
        <h5 id="analzitemdiff"> </h5>
        <h5 id="analzscores"> </h5>
        <h5 id="analzavg"> </h5>
        {/* <h5 id="jsoninput"> </h5> */}

        </div>
     </div>    
    </div>
    </div>
 
    </React.Fragment>
    
  );
}

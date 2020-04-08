import React , {useState} from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import './components.css'
import csv from "csv";
import Dropzone from 'react-dropzone'
//import MaterialTable from "material-table"
import {get_service_config, get_config, fnExcelReport,
    convertToArrayOfObjects, saveJSON} from './config'

export default function Analyze() {
  const [fileNames, setFileNames] = useState([]);
  
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
    // eslint-disable-next-line
      const handleClick =  e => {

      };
      const handleExport = e =>{
        saveJSON("jsonStr", "downloadJSON")
      };
      const handleExportResult = e =>{
        saveJSON("resultStr", "downloadResult")
      };
      const handleExportCSV = e =>{
        fnExcelReport("output", "result")
      };
      // Csv upload
      const handleDropC = acceptedFiles =>{
        document.getElementById("btn1").style.display = "none";
        document.getElementById("btn2").style.display = "none";
        document.getElementById("btn3").style.display = "none";
        setFileNames(acceptedFiles.map(file => file.name))
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => {
            let jsonStr = null;
            if (err) {
                //alert("File not in CSV format");
                // try JSON format
                try {
                  jsonStr = JSON.parse(reader.result);
                }
                catch(err) {
                  alert('The file is not in a valid CSV or JSON format!');
                }
            } else {
                console.log("Parsed CSV data: ", data)
                let obj = convertToArrayOfObjects(data)
                console.log(obj)
                for (let i = 0; i < obj.length; i++) {
                    let item = obj[i]
                    let keys = Object.keys(item)
                    let items = []
                    keys.forEach(function get_key(key) {
                        //console.log(key, parseInt(key))
                        if (!(isNaN(parseInt(key)))) {
                            items.push({
                                item_id: parseInt(key),
                                response: parseInt(item[key])
                            })
                            delete item[key]
                        }
                    })
                    item["item_responses"] = items
                }
                console.log(obj)
                console.log(acceptedFiles[0].name)
                jsonStr = {
                    student_list: obj,
                    exam: {name: acceptedFiles[0].name.split(".")[0]}
                }
               
            }
            if (jsonStr) {
                  console.log(jsonStr)
                  document.getElementById("input").style.display = "";
                  const options = {
                    method: 'POST',
                    url: get_config('test_url') + get_service_config(6, 'api_method'),
                    params: {pretty:1, input: JSON.stringify(jsonStr)}
                  }
                  axios(options)
                      .then(function (response) {
                          document.getElementById("jsonStr").innerHTML = JSON.stringify(jsonStr)
                          document.getElementById("resultStr").innerHTML = JSON.stringify(response.data.analysis)
                          document.getElementById("btn1").style.display = "";
                          document.getElementById("btn2").style.display = "";
                          document.getElementById("btn3").style.display = "";

                          //let responses = []
                          for (let i=0;i<jsonStr.student_list.length;i++) {
                            let items = jsonStr.student_list[i].item_responses
                            let item_values = []
                            items.map(value  => (
                              item_values.push(value.response)
                            ))
                            //responses.push(item_values)
                            delete jsonStr.student_list[i].item_responses
                            jsonStr.student_list[i].responses = JSON.stringify(item_values)
                          }
                          console.log(jsonStr.student_list)

                          let results = response.data.analysis
                          console.log(results)
                          let rm_keys = [get_service_config(1, 'short_name'), get_service_config(5, 'short_name'), get_service_config(8, 'short_name')]
                          let rm_heads = [get_service_config(1, 'name'), get_service_config(5, 'name'), get_service_config(8, 'name')]
                          console.log(rm_keys)
                          let rm_results = [results[rm_keys[0]], results[rm_keys[1]], results[rm_keys[2]]]
                          console.log(rm_results)

                          let item_keys = [get_service_config(2, 'short_name'), get_service_config(3, 'short_name')]
                          let item_heads = ['item id', get_service_config(2, 'name'), get_service_config(3, 'name')] 
                          let idrs = Object.values(results[item_keys[0]])
                          let diff = Object.values(results[item_keys[1]])
                          let item_id = Object.keys(results[item_keys[0]])

                          let item_results = []
                          for (let i=0;i<item_id.length;i++) {
                              item_results.push([item_id[i], idrs[i], diff[i]])
                          }


                          let stud_keys = [get_service_config(4, 'short_name'), get_service_config(7, 'short_name')]
                          let stud_heads = ['Student Id', get_service_config(4, 'name'), get_service_config(7, 'name')]
                          let stud_scores = Object.values(results[stud_keys[0]])
                          let stud_wscores = Object.values(results[stud_keys[1]])
                          let stud_id = Object.values(jsonStr.student_list)
                          //let student_id = Object.keys(results[stud_keys[0]])
                          let stud_results = []
                          for (let i=0;i<stud_scores.length;i++) {
                              stud_results.push([stud_id[i].id, stud_scores[i], stud_wscores[i]])
                          }

                          const inputtable = (
                                      <div><br></br>
                                      <div className="text-center h3">{jsonStr.exam.name}</div>
                                      <table className="table table-sm">
                                        
                                      <thead>
                                        <tr>
                                        {[jsonStr.student_list[0]].map(value  => (                              
                                          Object.keys(value).map(val => (<th key={val}>{val}</th>))                              
                                        ))
                                      }
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {jsonStr.student_list.map((value, index) => {                              
                                        return <tr key={index}>{console.log(Object.values(value))}
                                              {Object.values(value).map(val => (<td key={val}>{val}</td>))}
                                        </tr>
                                        })}
                                      </tbody>
                                    </table>
                                    </div>
                          )


                        const resulttable = (
                              <div>
                              <table className="table table-sm" id='output'><tbody>
                              <tr><th className="text-center h3">  {jsonStr.exam.name} </th></tr> <tr><td>
                              <table className="table table-sm">
                                <thead>
                                <tr>
                                {rm_heads.map(val  => (                              
                                  <th key={val}>{val}</th>
                                ))
                              }
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                {rm_results.map((value, index) => {                               
                                  return <td key={index}>{value}</td>
                                })
                                }
                                </tr>
                                  
                                </tbody>
                              </table></td></tr>
                              <tr><th className="text-center h3"> Item Scores </th></tr> <tr><td>
                              <table className="table table-sm">
                                <thead>
                                <tr>
                                {item_heads.map(val  => (                              
                                  <th key={val}>{val}</th>
                                ))
                              }
                                </tr>
                                </thead>
                                <tbody>
                                {item_results.map((value, index) => {                              
                                        return <tr key={index}>{console.log(Object.values(value))}{Object.values(value).map(val => (<td key={val}>{val}</td>))} 
                                       
                                </tr>
                                  })}
                                  <tr><th>Total items</th><th colSpan='2'>Averages</th></tr>
                                <tr><th>{item_id.length}</th><th>{results[get_service_config(11, 'short_name')]}</th><th>{results[get_service_config(10, 'short_name')]}</th></tr>  
                                </tbody>
                              </table></td></tr>
                              <tr><th className="text-center h3"> Student Scores </th></tr> <tr><td>
                              <table className="table table-sm">
                                <thead>
                                <tr>
                                {stud_heads.map(val  => (                              
                                  <th key={val}>{val}</th>
                                ))
                              }
                                </tr>
                                </thead>
                                <tbody>
                                {stud_results.map((value, index) => {                              
                                        return <tr key={index}>{console.log(Object.values(value))}{Object.values(value).map(val => (<td key={val}>{val}</td>))} 
                                       
                                </tr>
                                  })}
                                  <tr><th>Total students</th><th colSpan='2'>Averages</th></tr>
                                  <tr><th>{stud_scores.length}</th><th>{results[get_service_config(5, 'short_name')]}</th><th>{results[get_service_config(8, 'short_name')]}</th></tr>
                                </tbody>
                              </table>

                              </td></tr></tbody>
                              </table>

                              </div>
                        )
                          ReactDOM.render(inputtable, document.getElementById('input'))
                          ReactDOM.render(resulttable, document.getElementById('results'))
                      })
                      .catch(function (error) {
                          console.log(error);
                          alert(error);
                      })
              }
        })
        }
        acceptedFiles.forEach(file => reader.readAsBinaryString(file))
      }
      //let jsonStr = JSON.parse(document.getElementById('jsonStr').innerHTML)
      //console.log(jsonStr.student_list)
  return (
    <React.Fragment>
     <div className="row">

        <div className="card text-center col-md-8">
            <div className="card-header bg-info text-white h2">
                {get_config('application_form')}
            </div>
            <div className="card-body">
              <h5 className="card-title">Analyze your Teacher-Made tests</h5>
              <p className="card-text">Provide you with reliability indicators to help you determine your tests’ capabilities for assessing your students.</p>
                <p className="card-text">Please upload exam scores in CSV or JSON format.<br></br>
                  You can download Sample files here: <a target="_blank" href="data/20 Students.csv">CSV</a> <a target="_blank" href="data/20 Students.json">JSON</a>
              </p>
              <Dropzone className="card-text" onDrop={handleDropC}
              accept=".csv,.txt,.json"
              >
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop a CSV or JSON file, or click to select a file</p>
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
              <div id="input">
               
              </div>
               <div className="text-center col-md-12">
                <a id="downloadJSON" href=" " style={{display: 'none'}}> </a>
                <input type="button" id="btn1" style={{display: 'none'}}
                       className="btn btn-warning btn-lg" value="Save Input JSON"
                       title="Download"
                       onClick= {handleExport} />
                </div> 
                           

    </div>
    </div>
    <div className="card col-md-4">
    <div className="card-header bg-info text-white h2">
                Results
            </div>  
            <div className="card-body">          
        <div className="text-center">
            <button type="button" className="btn btn-danger btn-lg"
                    style={{display: 'none'}}
                    variant="contained">
            Compute 
            </button>
        </div>

     <div className="text-center"> <br></br>

        <div id="results"> </div>

         <span id="jsonStr" style={{display: 'none'}}></span>
         <span id="resultStr" style={{display: 'none'}}></span>
         <div className="row">
                <div className="text-center col-md-6">
                <a id="downloadResult" href=" " style={{display: 'none'}}> </a>
                <input type="button" id="btn2" style={{display: 'none'}}
                       className="btn btn-danger btn-lg" value="Save Result JSON"
                       title="Download"
                       onClick= {handleExportResult} />
                </div>
                <div className="text-center col-md-6">
                <input type="button" id="btn3" style={{display: 'none'}}
                       className="btn btn-danger btn-lg" value="Save Excel"
                       title="Download Excel"
                       onClick= {handleExportCSV} />
                </div>
         </div>

        {/* <h5 id="jsoninput"> </h5> */}

        </div>
     </div>    
    </div>
    </div>
 
    </React.Fragment>
    
  );
}

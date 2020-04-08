import React  from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import {get_service_config, get_config} from './config'

function process(jsonStr) {
    console.log(jsonStr)
    let url = get_config('service_url') + get_service_config(6, 'api_method')
    if (jsonStr===null) {
        url= get_config('service_url') + get_config('sample_method')
    }
    document.getElementById("input").style.display = "";
    const options = {
      method: 'POST',
      url: url,
      params: {pretty:1, input: JSON.stringify(jsonStr)}
    }
    axios(options)
        .then(function (response) {
            if (jsonStr===null) {
                jsonStr = response.data.Input
            }            
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
            //console.log(jsonStr.student_list)

            let results = response.data.analysis
            //console.log(results)
            let rm_keys = [get_service_config(1, 'short_name'), get_service_config(5, 'short_name'), get_service_config(8, 'short_name')]
            let rm_heads = [get_service_config(1, 'name'), get_service_config(5, 'name'), get_service_config(8, 'name')]
            console.log(rm_keys)
            let rm_results = [results[rm_keys[0]], results[rm_keys[1]], results[rm_keys[2]]]
            //console.log(rm_results)

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

        return jsonStr
} 

// const handlesample = e =>{
//     e.preventDefault();
//     let jsonStr = require('./data/data.json')
//     console.log(jsonStr)
//     process(jsonStr)
// }   

export {process}
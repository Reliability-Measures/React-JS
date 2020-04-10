import React  from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import {get_service_config, get_config} from './config'




function process(jsonStr) {
  const handle_item_click = e =>{
    //console.log(e.target.value)
    let id = document.getElementById("id-"+e.target.value)
    //console.log(id, id.checked)
    if (id.checked===true) {document.getElementById("is-"+e.target.value).className = "bg-light"} 
    else {document.getElementById("is-"+e.target.value).className = ""}
  }

  const handle_edit = e =>{
    
  }

  const handle_save_chnages = e =>{
    
  }
  const handle_item_change = e =>{
    let values = [].filter.call(document.getElementsByName('remove[]'), (c) => c.checked).map(c => c.value );
    values = values.map(Number)
    console.log(values)  
    
    jsonStr.exclude_items = values
    console.log(jsonStr)
    process(jsonStr)
  }

  const handle_student_change = e =>{
    
  }


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
           console.log(response.data)
            if (jsonStr===null) {
                jsonStr = response.data.Input
            }            
            document.getElementById("jsonStr").innerHTML = JSON.stringify(jsonStr)
            document.getElementById("resultStr").innerHTML = JSON.stringify(response.data.analysis)
            document.getElementById("btn1").style.display = "";
            document.getElementById("btn2").style.display = "";
            document.getElementById("btn3").style.display = "";

            let jsonStr2 = JSON.parse(JSON.stringify(jsonStr))

            //let responses = []
            for (let i=0;i<jsonStr2.student_list.length;i++) {
              let items = jsonStr2.student_list[i].item_responses
              let item_values = []
              items.map(value  => (
                item_values.push(value.response)
              ))
              //responses.push(item_values)
              delete jsonStr2.student_list[i].item_responses
              jsonStr2.student_list[i].responses = JSON.stringify(item_values)
            }
            //console.log(jsonStr.student_list)

            let results = response.data.analysis
            console.log(results)
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
                        <caption>{<button type="button" className="btn btn-info" onClick={handle_save_chnages}>Save changes</button>}</caption>
                        <thead>
                          <tr>
                          {[jsonStr2.student_list[0]].map(value  => (                              
                            Object.keys(value).map(val => (<th key={val}>{val}</th>))                              
                          ))
                        }
                        <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jsonStr2.student_list.map((value, index) => {                              
                          return <tr key={index}> 
                                {Object.values(value).map(val => (<td key={val}>{val}</td>))}
                          <th>{<button type="button" className="btn btn-info" onClick={handle_edit}>Edit</button>}</th>
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
                  <tr><th>Items to remove</th>
                  {item_heads.map(val  => (                              
                    <th key={val}>{val}</th>
                  ))
                }
                  </tr>
                  </thead>
                  <tbody>
                  {item_results.map((value, index) => {                              
                          return <tr id={'is-'+value[0]}key={index}><td>{<input className="form-check-input position-static" onClick={handle_item_click}
                          type="checkbox" name="remove[]" id={"id-" + value[0]} value={value[0]} aria-label="..."></input>}</td>
                          {Object.values(value).map(val => ( <td key={val}>{val}</td>))}</tr>

                    })}

                    <tr><th></th><th>Total items</th><th colSpan='2'>Averages</th></tr>
                <tr><th>{<button type="button" className="btn btn-info" onClick={handle_item_change}><h5>Recalculate</h5></button>}<br></br><small className="text-danger">Items seleceted will be removed</small></th><th>{item_id.length}</th><th>{results[get_service_config(11, 'short_name')]}</th><th>{results[get_service_config(10, 'short_name')]}</th></tr>  
                  </tbody>
                </table></td></tr>
                <tr><th className="text-center h3"> Student Scores </th></tr> <tr><td>
                <table className="table table-sm">
                  <thead>
                  <tr><th>Students to remove</th>
                  {stud_heads.map(val  => (                              
                    <th key={val}>{val}</th>
                  ))
                }
                  </tr>
                  </thead>
                  <tbody>
                  {stud_results.map((value, index) => {                              
                          return <tr key={index}><td>{<input className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."></input>}</td>{Object.values(value).map(val => (<td key={val}>{val}</td>))} 
                         
                  </tr>
                    })}
                    <tr><th></th><th>Total students</th><th colSpan='2'>Averages</th></tr>
                    <tr><th>{<button type="button" className="btn btn-info"onClick={handle_student_change}><h5>Recalculate</h5></button>}<br></br><small className="text-danger">Students seleceted will be removed</small></th><th>{stud_scores.length}</th><th>{results[get_service_config(5, 'short_name')]}</th><th>{results[get_service_config(8, 'short_name')]}</th></tr>
                  </tbody>
                </table>

                </td></tr></tbody>
                </table>

                </div>
          )
            ReactDOM.render(inputtable, document.getElementById('input'))
            ReactDOM.render(resulttable, document.getElementById('results'))
            results.exclude.map(val => {
              //console.log(val, document.getElementById("id-"+val))
              document.getElementById("id-"+val).checked = true
              document.getElementById("is-"+val).className = "bg-light"
              return val
            }) 
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
import React  from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import {get_service_config, get_config} from './config'



function process(jsonStr, tab) {

  const handle_item_click = e =>{
    let id = document.getElementById("id-"+e.target.value)
    if (id.checked===true) {document.getElementById("is-"+e.target.value).className = "bg-light"} 
    else {document.getElementById("is-"+e.target.value).className = ""}
  }
  const handle_student_click = e =>{
    let id = document.getElementById("st-"+e.target.value)
    if (id.checked===true) {document.getElementById("sd"+e.target.value).className = "bg-light"} 
    else {document.getElementById("sd"+e.target.value).className = ""}
  }

  const handle_edit = (a) =>{
    //alert(a)
    console.log(a)
    document.getElementById("btn1").style.display = "none";
    let edit = document.getElementById("ed-"+a)
    let save = document.getElementById("sv-"+a)
    let field = document.getElementById("inp-"+a)
    let val = document.getElementById("val-"+a)
    let cancel = document.getElementById("cn-"+a)
    cancel.style.display = ""
    edit.style.display = "none"
    save.style.display = ""
    val.style.display = "none"
    field.style.display = ""
  }
  const handle_cancel = (a) =>{
    //alert(a)
    console.log(a)
    let edit = document.getElementById("ed-"+a)
    let save = document.getElementById("sv-"+a)
    let cancel = document.getElementById("cn-"+a)
    let field = document.getElementById("inp-"+a)
    let val = document.getElementById("val-"+a)
    let chg = document.getElementById("chg-" + a)
    edit.style.display = ""
    save.style.display = "none"
    cancel.style.display = "none"
    val.style.display = ""
    field.style.display = "none"
    chg.value=chg.defaultValue
  }  
  const handle_save = (a) => {
      let edit = document.getElementById("ed-" + a)
      let save = document.getElementById("sv-" + a)
      let field = document.getElementById("inp-" + a)
      let val = document.getElementById("val-" + a)
      let chg = document.getElementById("chg-" + a)

      edit.style.display = ""
      save.style.display = "none"
      val.style.display = ""
      field.style.display = "none"
      // update jsonStr
      console.log(chg.value, chg.defaultValue)
      if (chg.value.length !== chg.defaultValue.length) {
            alert("Invalid")
            chg.value = chg.defaultValue
      } else {
            if (chg.defaultValue !== chg.value)
                val.className = "bg-success text-light"

            chg.defaultValue=chg.value
            val.innerText = chg.value
            let change_responses = chg.value.split(",").map(Number)
            jsonStr.student_list[a-1].item_responses = change_responses.map((value, index) => {
                return {'item_id': index+1, response: value}
            })
            console.log(jsonStr)
      }
        
  }
  const handle_save_changes = e =>{
     process(jsonStr, "updated_results")
     document.getElementById("btn1").style.display = ""
  }
  const handle_item_change = e =>{
    let values = [].filter.call(document.getElementsByName('removeitem[]'), (c) => c.checked).map(c => c.value );
    values = values.map(Number)
    jsonStr.exclude_items = values

    values = [].filter.call(document.getElementsByName('removestudent[]'), (c) => c.checked).map(c => c.value );
    values = values.map(Number)
    jsonStr.exclude_students = values

    process(jsonStr, "updated_results")

    document.getElementById("updated_head").style.display = "";
    document.getElementById("result_head").className = "col-md-6";
  }
  
    console.log(jsonStr)
    let url = get_config('test_url') + get_service_config(6, 'api_method')
    if (jsonStr===null) {
        url= get_config('test_url') + get_config('sample_method')
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
            if (response.data.error)
            {
              alert("Error In response: " + response.data.error)
              return
            } 
            if (jsonStr===null) {
                jsonStr = response.data.Input
            }            
            document.getElementById("jsonStr").innerHTML = JSON.stringify(jsonStr)
            if (tab==="updated_results")  {
              document.getElementById("updatedresultStr").innerHTML = JSON.stringify(response.data.analysis)
            }
            else {
              document.getElementById("resultStr").innerHTML = JSON.stringify(response.data.analysis)
              document.getElementById("updated_head").style.display = "none";
              document.getElementById("result_head").className = "col-md-12";
            }
            document.getElementById("btn1").style.display = ""
            document.getElementById("btn2").style.display = ""
            document.getElementById("btn3").style.display = ""
            document.getElementById("btn4").style.display = ""
            document.getElementById("btn5").style.display = ""
            document.getElementById("result_head").style.display = "";
            console.log(jsonStr)
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
              jsonStr2.student_list[i].responses = item_values.toString()
            }
            //console.log(jsonStr.student_list)

            let results = response.data.analysis
            console.log(results)
            console.log(response.data.Input)
            let rm_keys = [get_service_config(1, 'short_name'), get_service_config(5, 'short_name'), get_service_config(8, 'short_name')]
            let rm_heads = [get_service_config(1, 'name'), get_service_config(5, 'name'), get_service_config(8, 'name')]
            let rm_results = [results[rm_keys[0]], results[rm_keys[1]], results[rm_keys[2]]]

            let item_keys = [get_service_config(2, 'short_name'), get_service_config(3, 'short_name'), get_service_config(12, 'short_name')]
            let item_heads = ['item id', get_service_config(2, 'name'), get_service_config(3, 'name'), get_service_config(12, 'name')] 
            let idrs = Object.values(results[item_keys[0]])
            let diff = Object.values(results[item_keys[1]])
            let item_id = Object.keys(results[item_keys[0]])
            let num_correct = Object.values(results[item_keys[2]])
            

            let item_results = []
            for (let i=0;i<item_id.length;i++) {
                item_results.push([item_id[i], idrs[i], diff[i],num_correct[i]])
            }
            console.log(item_results)

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
                        <caption className="text-right">{<button type="button" className="btn btn-sm btn-info" onClick={handle_save_changes}>Apply changes</button>}</caption>
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
                              {Object.values(value).map((val, ind, arr) => {
                                      return ind === arr.length - 1 ?
                                          <td key={val}><span
                                              id={"val-" + (index + 1)}>{val}</span>
                                              <span id={"inp-" + (index + 1)}
                                                    style={{display: 'none'}}><input id={"chg-" + (index + 1)} size={item_id.length * 1.5} type="text" defaultValue={val}></input></span>
                                          </td> : <td key={val}>{val}</td>
                                  }
                              )
                              }

                          <th>
                              {<i className="fa fa-edit h4" id={"ed-" + (index+1)}  onClick={() => handle_edit(index+1)}></i>}
                              {<i style={{display: 'none'}}  id={"sv-" + (index+1)} className="fa fa-save h4" onClick={() => handle_save(index+1)}></i>}{' '}
                              {<i style={{display: 'none'}}  id={"cn-" + (index+1)} className="fa fa-window-close h4" onClick={() => handle_cancel(index+1)}></i>}
                          </th>
                          </tr>
                          })}
                        </tbody>
                      </table>
                      </div>
            )

          const resulttable = (
                <div>
                <table className="table table-sm" id={'output-' + tab}><tbody><tr><th className="text-center h3">{jsonStr.exam.name}</th></tr><tr><td>
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
                <tr><th colSpan="5" className="text-center h3">Item Scores</th></tr><tr>
                  <td>
                <table className="table table-sm">
                  <thead>
                  <tr>{tab==='results' ?<th>Items to remove</th>:""}
                  {item_heads.map(val  => (                              
                    <th key={val}>{val}</th>
                  ))
                }
                  </tr>
                  </thead>
                  <tbody>
                  {item_results.map((value, index) => {                              
                          return  <tr id={'is-'+value[0]}key={index}>
                          {tab==='results'?<td>{<input className="form-check-input position-static" onClick={handle_item_click}
                          type="checkbox" name="removeitem[]" id={"id-" + value[0]} value={value[0]} aria-label="..."></input>}</td> : ""}
                          {Object.values(value).map((val,index) => {
                          return <td key={index}>{val}</td>})}
                          </tr> 
                    })}
                    <tr><th>Total items</th><th colSpan='3'>Averages</th></tr>
                  <tr>{tab==='results'?<th><button type="button" className="btn btn-sm btn-info" onClick={handle_item_change}><h5>Recalculate</h5></button><br></br><small className="text-danger">Items seleceted will be removed</small>
                </th>:""}<th>{item_id.length}</th><th>{results[get_service_config(11, 'short_name')]}</th><th>{results[get_service_config(10, 'short_name')]}</th></tr>  
                  </tbody>
                </table></td></tr>
                <tr><th className="text-center h3">Student Scores</th></tr><tr><td>
                <table className="table table-sm">
                  <thead>
                  <tr>{tab==='results' ?<th>Students to remove</th>:""}
                  {stud_heads.map(val  => (                              
                    <th key={val}>{val}</th>
                  ))
                }
                  </tr>
                  </thead>
                  <tbody>
                  {stud_results.map((value, index) => {                              
                       return <tr id={'sd'+value[0]}key={index}>
                        {tab==='results'?<td>{<input className="form-check-input position-static" onClick={handle_student_click}
                       type="checkbox" name="removestudent[]" id={"st-" + value[0]} value={value[0]} aria-label="..."></input>}</td>:""}
                       {Object.values(value).map((val,index) => {
                       return <td key={index}>{val}</td>})}
                  </tr>
                    })}
                    <tr>
                      <th>Total students</th>
                      <th colSpan='3'>Averages</th>
                      </tr>
                    <tr>{tab==='results'?<th>{<button type="button" className="btn btn-sm btn-info" onClick={handle_item_change}><h5>Recalculate</h5></button>}<br></br><small className="text-danger">Students seleceted will be removed</small></th>:""}
                    <th>{stud_scores.length}</th><th>{results[get_service_config(5, 'short_name')]}</th><th>{results[get_service_config(8, 'short_name')]}</th>
                    </tr>
                  </tbody>
                </table>
                </td></tr></tbody>
                </table>
                </div>
          )
            ReactDOM.render(inputtable, document.getElementById('input'))
            ReactDOM.render(resulttable, document.getElementById(tab))
            //console.log(results.exclude)
            let exclude = results.exclude
            if (tab==="results"){
              exclude.map(val => {
                //console.log(val, document.getElementById("id-"+val))
                document.getElementById("id-"+val).checked = true
                document.getElementById("is-"+val).className = "bg-light"
                return val
              })
            } 
        })
        .catch(function (error) {
            console.log(error)
            alert(error)
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
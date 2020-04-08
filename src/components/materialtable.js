// import React from 'react'
// import MaterialTable from "material-table";
 

// function Materialtable() {

   

//     return (
//         <div>
//             <MaterialTable
//             options={{
//                 selection: true
//               }}
//               actions={[
//                 {
//                   tooltip: 'Remove All Selected Users',
//                   icon: 'delete',
//                   onClick: (evt, deldata) => {
//                       let ans = window.confirm('You want to delete ' + deldata.length + ' rows');
//                       if (ans === true) {
//                         setState(prevState => {
//                             const data =[...prevState.data];
//                             deldata.forEach(function fn(item) {
//                             data.splice(data.indexOf(item), 1);
//                             })
//                             return { ...prevState, data };
//                         }
//                   )}}
//                 }
//               ]}
//       title="Item responses:"
//       columns={state.columns}
//       data={state.data}
//       editable={{
//         onRowAdd: newData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               setState(prevState => {
//                 const data = [...prevState.data];
//                 data.push(newData);
//                 return { ...prevState, data};
//               });
//             }, 600);
//           }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               if (oldData) {
//                 setState(prevState => {
//                   const data = [...prevState.data];
//                   data[data.indexOf(oldData)] = newData;
//                   return { ...prevState, data };
//                 });
//               }
//             }, 600);
//           }),
//         onRowDelete: oldData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               setState(prevState => {
//                 const data =[...prevState.data];
//                 data.splice(data.indexOf(oldData), 1);
//                 return { ...prevState, data };
//               });
//             }, 600);
//           }),
          
          
//       }}
//     />
//         </div>
//     )
// }

// export default Materialtable

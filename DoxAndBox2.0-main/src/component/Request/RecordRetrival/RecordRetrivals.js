// import React, { useState, useEffect } from 'react'
// import Navbar from '../../Navbar/Navbar'
// import './RecordRetrival.css';
// import { rmsRequest, ReportData,Totallocation } from '../../../api/index'
// import Select from 'react-select';


// function RecordRetrival() {
//     const [mandatoryfield, setMandatoryfield] = useState(false);
//     const [data, setData] = useState([]);
//     const [selectfiles, setSelectFiles] = useState([]);
//     const [totallocation,setTotallocation] = useState([])


//     useEffect(() => {
//         const data = async () => {
         
//             const Totallocationresult = await Totallocation();
//             setTotallocation(Totallocationresult)
//         }
//         data()
//     }, [])

//     let options = data.map((ele) => {
//         return { value: ele.Fileno, label: `${ele.Fileno}, ${ele.FileName}` };
//     })

//     const handleClick = async (e) => {
//         e.preventDefault();
//         // const file_name = document.getElementById('filename').value;
//         const retrival_type = document.getElementById('typeOfRetrival').value;
//         const delivery_type = document.getElementById('deliverytype').value;
//         const request_date = document.getElementById('deliverydate').value;
//         const remark = document.getElementById('remark').value;
//         const locationid = document.getElementById('locationid').value
//         const fileid = locationid + Math.floor(Math.random()*10000000)
//         if (!retrival_type || !delivery_type || !request_date) {
//             setMandatoryfield(true)
//         }
//         else {
//             selectfiles.forEach(async (datas) => {
//                 const file_name = datas.value
//                 const result = await rmsRequest('RecorRetrival', '', '', request_date, '', file_name, retrival_type, delivery_type, '', '', '', remark, localStorage.getItem('CUST_ID'),fileid,locationid)
//             })
//             window.location.href = '/Dashboard'
//         }
//     }

//     const handleChange = (selectedOption) => {
//         setSelectFiles(selectedOption)
//     }

//     const handleChangeWarehouse = async(e) => {
//         console.log(e.target.value,localStorage.getItem('CUST_ID'))
//         const result = await ReportData(localStorage.getItem('CUST_ID'),e.target.value)
//         console.log(result)
//         setData(result)
//     }




//     return (
//         <>
//             <div className="generatorlogcontainer">
//                 <Navbar />
//                 <div>

//                     <div className="col " style={{ margin: "80px auto", width: "630px" }}>
//                         <div className="card" style={{ boxShadow: "2px 2px 5px #333" }}>
//                             <header className="card-header" style={{ background: "rgba(0,0,0,0.2)" }}>
//                                 <h4 className="card-title mt-2" >Record Retrival</h4>
//                             </header>
//                             <article className="card-body" >
//                                 <form style={{ margin: "0px 20px 0px 15px" }}>
//                                     {/* <h3 className="card-title mt-4">Record Retrival</h3> */}
//                                     <br />

//                                     <div className="form-group">
//                                         <label>Warehouse  <span style={{ color: "red" }}>*</span></label>
//                                        <select className="form-control" id="locationid" style={{height:"35px"}} onChange={handleChangeWarehouse}>
//                                         <option value='' hidden>Select the warehouse</option>
//                                                   {
//                                                     totallocation.map((item,index)=>
//                                                     <option key={index} value={item.WHid}>{item.WHname}</option>)
                                                    
//                                                   }
//                                        </select>
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Search Select Files *</label>
//                                         {/* <input placeholder="Files" type="Text" className="form-control" id='filename' /> */}
//                                         <Select
//                                             options={options}
//                                             isMulti={true}
//                                             onChange={handleChange}
//                                         />

//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col-md-4" >
//                                             <label>Type Of Retrival <span style={{ color: "red" }}>*</span></label>
//                                             <select className="form-control" id='typeOfRetrival' style={{ height: "32px" }}>
//                                                 <option defaultValue hidden>Choose ...</option>
//                                                 <option>Digital (Scan)</option>
//                                                 <option >Physical-Returnable</option>
//                                                 <option >Physical-Permanent Out</option>
//                                                 <option >Photocopy</option>

//                                             </select>
//                                         </div>
//                                         <div className="form-group col-md-4" >
//                                             <label>Type Of Delivery <span style={{ color: "red" }}>*</span></label>
//                                             <select className="form-control" id='deliverytype' style={{ height: "32px" }}>
//                                                 <option defaultValue hidden>Choose ...</option>
//                                                 <option>Standard</option>
//                                                 <option>Urgent</option>
//                                                 <option>Express Delivery</option>
//                                             </select>
//                                         </div>
//                                         {/* <div className="form-group col-md-4">
//                                             <label>Date of Delivery <span style={{ color: "red" }}>*</span></label>
//                                             <input type="date" className="form-control" id='deliverydate'
//                                             />
//                                         </div> */}
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Remarks</label>
//                                         <textarea className="form-control" placeholder="Comments" type="text" id='remark' />
//                                     </div>
//                                     {
//                                         mandatoryfield ?
//                                             <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
//                                             : null
//                                     }
//                                     <div className="form-group">
//                                         <button type="submit" className="btn btn-primary  float-right mb-4" onClick={handleClick}>Submit</button>

//                                         <button type="submit" className="btn btn-secondary mr-4 float-right mb-4">Reset</button>
//                                     </div>
//                                 </form>
//                             </article>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default RecordRetrival

import React, { useState,useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import { rmsRequest,Totallocation,IdCount,Mail,lastcount,UpdateCount } from '../../../api/index'
import './ScanningReq.css'
import svg from '../../Images/phoneicon.png'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import Footer from '../../Navbar/Footer'


function ScanningRequest() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [totallocation,setTotallocation] = useState([])
    const [BookingId,setBooKingId] = useState()
    const [RequestId,setRequestId] = useState()
    const [count,setCount] = useState()
    const whid = localStorage.getItem('Warehouse_ID')



    
    useEffect(()=>{
        const fetchdata=async()=>{
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
            // const id = await IdCount(whid)
            // const lastno = Number(id[0].RMSBookid) + 1
            // let BookingId = 'BOOK' + '-' + whid + '-' + String(lastno).padStart(6, '0')
            // setBooKingId(BookingId)

            const lastcountval = await lastcount(whid)
            setCount(lastcountval[0]["hh"])
            console.log(lastcountval[0]["hh"])
            const cust_id = localStorage.getItem('User_Name').split(" ").join("").slice(0,4)
            const requestid = whid +'-'+cust_id.toUpperCase()+'-'+'SCN'+'-'+lastcountval[0]["hh"].padStart(6,'0')
            console.log(requestid)
            setRequestId(requestid)
        }
        fetchdata()
            
    },[])
    
    
    const handleClick = async (e) => {
        e.preventDefault();
        const noof_pages = document.getElementById('scanned_pages').value;
        const onsite = document.getElementById('onSite').value;
        const request_date = document.getElementById('dateofScanning').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random()*10000000)
        const cust_id = localStorage.getItem('User_Name').slice(0,4)
        const city = document.getElementById('city').value



        // return false

        const message = {
            Location: localStorage.getItem('Wh_name'),
            NoofFiles: noof_pages,
            date: request_date,
            requestid: RequestId,
            Remark: remark,
            requestType: 'ScanningRequest'

        }

        if (!noof_pages || !onsite || !request_date) {
            setMandatoryfield(true)
        }
        else {
            const mailresponse = await Mail('ScanningRequest', message);
            const result = await rmsRequest('ScanningRequest', city, '', request_date, '', '', '', '', noof_pages, onsite, '', remark, localStorage.getItem('User_ID'),fileid,locationid,RequestId,localStorage.getItem('CUST_ID'),'','','','','','',BookingId,"")
            const updatecount = await UpdateCount(whid,count)

            if(result){
                alert(`Requestid ${RequestId} generated`)
                window.location.href = '/Dashboard'
            }
        }
    }
    return (
        <>
            <div className="generatorlogcontainer">
                <Navbar />
                <div className='scan_req'>
                <div className='svg_div'>
                      <img src={svg}/>
                    </div>
                <form style={{ margin: "0px 20px 0px 15px",boxShadow:"8px 8px 5px 1px grey",padding:"40px 15px 0px",height:"80vh",borderRadius:"7px",background:"white" }}>
                <h3>Request for Scaning <BsFillChatSquareQuoteFill style={{margin:"0 0 -9px 0",fontSize:"30px"}}/></h3>
                            <br />  
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" id='city' />
                            </div>
                            <div className="form-group">
                                <label>Total no of Pages to be Scanned <span style={{ color: "red" }}>*</span></label>
                                <input type="number" className="form-control" id='scanned_pages' />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6" >
                                    <label>Date Of Scanning <span style={{ color: "red" }}>*</span></label>
                                    <input type="date" className="form-control" id='dateofScanning' />
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>On Site Scan <span style={{ color: "red" }}>*</span></label>
                                    <select className="form-control" id='onSite' style={{ height: "32px" }}>
                                        <option defaultValue hidden>Choose ...</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Remarks</label>
                                <textarea className="form-control" placeholder="Comments" type="text" id='remark' />
                            </div>
                            {
                                mandatoryfield ?
                                    <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
                                    : null
                            }

                            <div className="form-group">
                                <button type="submit" className="dark_btn btn_dark btn float-right mb-4" onClick={handleClick}>Submit</button>
                                <button type="submit" className="maroon_btn btn mr-4 float-right mb-4">Reset</button>
                            </div>
                        </form>
                        
    
                </div>
                
            
            </div>
            <Footer/>
        </>
    )
}

export default ScanningRequest

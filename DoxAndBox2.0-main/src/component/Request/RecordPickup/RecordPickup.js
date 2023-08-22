import React, { useState, useEffect } from 'react'
import Navbar from '../../Navbar/Navbar'
import { rmsRequest, Mail, Totallocation,lastcount,UpdateCount } from '../../../api/index'
import './RecordPickup.css'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import svg from '../../Images/phoneicon.png'
import Footer from '../../Navbar/Footer.js'

function RecordPickup() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [totallocation, setTotallocation] = useState([]);
    const [RequestId,setRequestId] = useState()
    const [count,setCount] = useState()
    const whid = localStorage.getItem('Warehouse_ID')



    useEffect(() => {
        const fetchdata = async () => {
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
            const lastcountval = await lastcount(whid)
            console.log(lastcountval)
            setCount(lastcountval[0]["hh"])
            console.log(lastcountval[0]["hh"])
            const cust_id = localStorage.getItem('User_Name').split(" ").join("").slice(0,4)
            const requestid = whid +'-'+cust_id.toUpperCase()+'-'+'PCK'+'-'+lastcountval[0]["hh"].padStart(6,'0')
            console.log(requestid)
            setRequestId(requestid)
        }
        fetchdata()

    }, [])

    const handleChangeNumber = (e) => {
        if (e.target.value.length > 10) {
            alert('Number is More than 10');
            document.getElementById('Contactpersonname').value = ""

            // e.target.value=""
        }
        console.log(e.target.value.length)
    }



    const handleClick = async (e) => {
        e.preventDefault();
        const location = document.getElementById('Location').value;
        const noof_files = document.getElementById('nooffiles').value;
        const request_date = document.getElementById('Pickupdate').value;
        const request_time = document.getElementById('pickuptime').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random() * 10000000)
        // const requestid = locationid + '-' + Math.floor(Math.random() * 10000000) + '-' + 'RP'
        const Contactperson = document.getElementById('ContactPerson').value;
        const Personno = document.getElementById('Contactpersonnumber').value
        const Deparment = document.getElementById('department').value

        const message = {
            Location: location,
            NoofFiles: noof_files,
            date: request_date,
            time: request_time,
            Remark: remark,
            requestType: 'RecordPickup'
        }

        if (!location || !noof_files || !request_date || !request_time) {
            setMandatoryfield(true)
        }
        else {
            const mailresponse = await Mail('RecordPickup', message);
            const result = await rmsRequest('RecordPickup', location, noof_files, request_date, request_time, '', '', '', '', '', '', remark, localStorage.getItem('User_ID'), fileid, locationid, RequestId, localStorage.getItem('CUST_ID'), '', Contactperson, Personno, Deparment)
            const updatecount = await UpdateCount(whid,count)
            if(result){
                alert(`Requestid ${RequestId} generated`)
                window.location.href = '/Dashboard'
            }
        }

    }

    return (
        <>
            <div className="PickupReq">
                <Navbar />
                <div className='rec_pickup'>
                    <div className='svg_div' >
                        <img src={svg}  />
                    </div>
                    <form style={{ margin: "0px 20px 20px 15px",boxShadow:"8px 8px 5px 1px grey",padding:"30px 15px 0px",minHeight:"70vh",borderRadius:"7px",background:"white" }}>
                        <h3 className='pb-3'>Request for record pickup <BsFillChatSquareQuoteFill style={{ margin: "0 0 -9px 0", fontSize: "30px" }} /></h3>
                        <div className="form-group">
                            <label>City <span style={{ color: "red" }}>*</span></label>
                            <input placeholder="" type="Text" className="form-control" id='Location' />
                        </div>
                        <div className="form-group">
                            <label>No of Files <span style={{ color: "red" }}>*</span> </label>
                            <input type="number" placeholder="Total no of Files" className="form-control" id="nooffiles" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Pickup Date <span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" id='Pickupdate' />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Pickup Time <span style={{ color: "red" }}>*</span></label>
                                <input type="time" className="form-control" id='pickuptime' />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Contact Person</label>
                                <input type="text" className="form-control" id='ContactPerson' />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Contact Person Number</label>
                                <input type="number" className="form-control" id='Contactpersonnumber' onChange={handleChangeNumber} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Contact Person Department</label>
                            <input className="form-control" type="text" id='department' />
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

                        <div className="form-group" >
                            <button type="submit" className="dark_btn btn float-right mb-4" onClick={handleClick}>Submit</button>
                            <button type="submit" className="maroon_btn btn mr-4 float-right mb-4">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RecordPickup

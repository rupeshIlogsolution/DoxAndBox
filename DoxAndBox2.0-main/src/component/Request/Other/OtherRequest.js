import React, { useState, useEffect } from 'react'
import Navbar from '../../Navbar/Navbar';
import { rmsRequest, Totallocation } from '../../../api/index'
import './OtherReq.css'
import svg from '../../Images/phoneicon.png'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import Footer from '../../Navbar/Footer'


function OtherRequest() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [totallocation, setTotallocation] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
        }
        fetchdata()

    }, [])

    const handleClick = async (e) => {
        e.preventDefault();

        const activity = document.getElementById('activity').value;
        const request_date = document.getElementById('dateofShreading').value;
        const onsite = document.getElementById('onSite').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random() * 10000000)
        const requestid = locationid + '-' + Math.floor(Math.random() * 10000000) + '-' + 'OR'

        if (!activity || !request_date || !onsite) {
            setMandatoryfield(true)
        }
        else {
            const result = await rmsRequest('OtherRequest', '', '', request_date, '', '', '', '', '', onsite, activity, remark, localStorage.getItem('User_ID'), fileid, locationid, requestid, localStorage.getItem('CUST_ID'));
        }
    }
    return (
        <>
            <div className="generatorlogcontainer" >
                <Navbar />
                <div className='other_req'>
                <div className='svg_div'>
                        <img src={svg} />
                    </div>
                    <form style={{ margin: "0px 20px 0px 15px" }}>
                        <h3>Other Request <BsFillChatSquareQuoteFill style={{ margin: "0 0 -9px 0", fontSize: "30px" }} /></h3>
                        <br />


                        <div className="form-group">
                            <label>Activity <span style={{ color: "red" }}>*</span></label>
                            <input type="text" className="form-control" id='activity' />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6" >
                                <label>Date  <span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" id='dateofShreading' />
                            </div>
                            <div className="form-group col-md-6" >
                                <label>On Site  <span style={{ color: "red" }}>*</span></label>
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


                        <div className="form-group" >
                            <button type="submit" className="btn dark_btn float-right mb-4 mt-3" onClick={handleClick} id="subnitbtn">Submit</button>
                            <button type="submit" className="btn maroon_btn mr-4 float-right mb-4 mt-3">Reset</button>
                        </div>
                    </form>
                    
                </div>

            </div>
            <Footer />
        </>
    )
}

export default OtherRequest

import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FileUpload, insertscannerportaldetails, scannerportaldatamorethanone, totalscannerdetails, getportalrequest, updateportalrequest } from '../../api/index'
import './basicdetail.css'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import svg from '../Images/phoneicon.png'
import Footer from '../Navbar/Footer.js'

const UpdateScanningBasicdetails = () => {
    const [scannerdata, setScannerData] = useState([]);
    const [pageScan, setPageScan] = useState(false)
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const portalrequest = await getportalrequest(localStorage.getItem("portalid"))
            setData(portalrequest)
        }
        fetchdata()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()
        const Endreading = document.getElementById("endreading").value;
        const Totalpagesscan = document.getElementById("totalpagesscan").value;
        let Remarks = document.getElementById("remarks").value;
        Remarks = Remarks.trim()

        // const scannertype = document.getElementById('scannertype').value.split(",")        
        // const Assetid = scannertype[0]
        // const Assetname = scannertype[1]
        if (!Totalpagesscan) {
            setPageScan(true)
        }
        else {
            const result = await updateportalrequest(Endreading, Totalpagesscan, "", "", "", Remarks, localStorage.getItem("portalid"))
            if (result) {
                alert("Update Successfully");
                window.location.href = "/UserLogindetails"
            }
        }
    }

    return (
        <>
            <div className="userReq">
                <Navbar />

                <div className='rec_user'>
                    <div className='svg_div' >
                        <img src={svg} alt='Dox and Box Background Image' />
                    </div>
                    <form >
                        <h3 className='pb-3'>Update Scanning Request <BsFillChatSquareQuoteFill style={{ margin: "0 0 -9px 0", fontSize: "30px" }} /></h3>

                        <div className="form-group ">
                            <label htmlFor='startreading'>Request Id</label>
                            <input type="text" className="form-control" id='startreading' disabled defaultValue={data.Requestid} />
                        </div>

                        <div className="form-group">
                            <label htmlFor='startreading'> Date</label>
                            <input type="text" className="form-control" id='startreading' disabled defaultValue={data.ARRIVEDDATE} />
                        </div>


                        <div className="form-group">
                            <label htmlFor='startreading'>Select Scanner Type</label>
                            <input type="text" className="form-control" id='startreading' disabled defaultValue={data.Assetname} />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor='startreading'> Scanner start reading</label>
                                <input type="number" className="form-control" id='startreading' disabled defaultValue={data.StartReading} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor='endreading'>Scanner end reading</label>
                                <input type="number" className="form-control" id='endreading' defaultValue={data.Endreading} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor='totalpagesscan'>Total Pages Scanned <span className='text-danger'>*</span></label>
                            <input type="number" className="form-control" id='totalpagesscan' defaultValue={data.Totalpagesscan}
                                onChange={() => { setPageScan(false) }} />
                            {pageScan && <p className='text-danger'>Enter Total Pages Scanned</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor='remarks'>Remarks</label>
                            <textarea className="form-control" placeholder="Comments" type="text" id='remarks' defaultValue={data.Remarks} />
                        </div>

                        <div className="form-group" >
                            <button type="button" className="maroon_btn btn float-right mb-4" onClick={handleClick}>Update</button>
                            <button type="reset" className="dark_btn btn mr-4 float-right mb-4">Reset</button>
                        </div>
                    </form>

                </div>


            </div>
            <Footer />
        </>
    )
}

export default UpdateScanningBasicdetails

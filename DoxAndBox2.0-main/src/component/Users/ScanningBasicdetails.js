import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  FileUpload,
  insertscannerportaldetails,
  scannerportaldatamorethanone,
  totalscannerdetails,
  Requestidforuser,
} from "../../api/index";
import "./basicdetail.css";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import svg from "../Images/phoneicon.png";
import Footer from "../Navbar/Footer.js";

function ScanningBasicdetails() {
  const [mandatoryfield, setMandatoryfield] = useState({
    requestId: false,
    typeOfScanner: false,
    arrivalDate: false,
    arrivalTime: false
  });
  // const [uploadimage,setUploadImage] = useState([]);
  const [scannerdata, setScannerData] = useState([]);
  const [requestid, setRequestid] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const RequestId = await Requestidforuser(localStorage.getItem("User_ID"), "ScanningRequest");
      setRequestid(RequestId);
      todayDate()
    };
    fetchdata();
  }, []);

  const todayDate = () => {
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById('arriveddate').value = currentDate
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const Requestid = document.getElementById("reqid").value;
    const StartReading = document.getElementById("startreading").value;
    const Endreading = document.getElementById("endreading").value;
    const Arriveddate = document.getElementById("arriveddate").value;
    const ArrivedTime = document.getElementById("arrivedtime").value;
    const Totalpagesscan = document.getElementById("totalpagesscan").value;
    const Remarks = document.getElementById("remarks").value;
    const EntryBy = localStorage.getItem("User_ID");
    const Portalid = `portal${Math.floor(Math.random() * 100000)}`;
    let scannertype = document.getElementById("scannertype").value;
    let scannertype_arr = scannertype.split(",");
    const Assetid = scannertype_arr[0];
    const Assetname = scannertype_arr[1];

    if (!Requestid || !scannertype || !Arriveddate || !ArrivedTime) {
      if (!Requestid) {
        setMandatoryfield({ ...mandatoryfield, requestId: true })
      }
      else if (!Arriveddate) {
        setMandatoryfield({ ...mandatoryfield, arrivalDate: true })
      }
      else if (!ArrivedTime) {
        setMandatoryfield({ ...mandatoryfield, arrivalTime: true })
      }
      else if (!scannertype) {
        setMandatoryfield({ ...mandatoryfield, typeOfScanner: true })
      }

    }
    else {
      const result = await insertscannerportaldetails(Requestid, "ScanningRequest", StartReading, Endreading, Arriveddate, ArrivedTime, "",
        Totalpagesscan, Remarks, EntryBy, "", "", "", Portalid, Assetid, Assetname, "", localStorage.getItem("User_Name"));

      if (result.message === 'Added') {
        alert("Added Successfully");
      }
      else if (result.message === 'Already') {
        alert('This Request id is Already inserted in current Date')
      }
      else if (result.message === 'Not Acceptable') {
        alert('Please Update the Previous Scanning Request of this request Id')
      }

      window.location.href = "/UserLogindetails";
    }
  };

  const handleChangeRequest_id = async (e) => {
    e.preventDefault();
    handleHideErrorText('requestId')
    const TotalScanner = await totalscannerdetails(e.target.value);
    setScannerData(TotalScanner);
    const datass = await scannerportaldatamorethanone(localStorage.getItem("User_ID"), "2023-07-05", "Scanning", e.target.value);
  };
  const handleHideErrorText = (fieldType) => {
    setMandatoryfield({ ...mandatoryfield, [fieldType]: false })
  }

  return (
    <>
      <div className="userReq">
        <Navbar />
        <div className="rec_user">
          <div className="svg_div">
            <img src={svg} alt="Dox and Box Bg Image" />
          </div>
          <form>
            <h3 className="pb-3">
              Request for Scanning Basic Details&nbsp;<BsFillChatSquareQuoteFill style={{ margin: "0 0 -9px 0", fontSize: "30px" }} />
            </h3>
            <div className="form-group">
              <label htmlFor="reqid"> Request Id <span className="text-danger">*</span> </label>
              <select className="form-control" id="reqid" onChange={handleChangeRequest_id} style={{ height: "32px" }}>
                <option value="" hidden> Please Select RequestId </option>
                {requestid &&
                  requestid.map((item,index) => (
                    <option key={index} value={item.Requestid}>{item.Requestid}</option>
                  ))}
              </select>
              {mandatoryfield.requestId ? <p className="text-danger">Please! Select Request Id.</p> : null}
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="arriveddate"> Date</label>
                <input type="date" className="form-control" id="arriveddate" onChange={() => { handleHideErrorText('arrivalDate') }} />
                {mandatoryfield.arrivalDate && <p className="text-danger">Please Enter the Date.</p>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="arrivedtime"> Time</label>
                <input type="time" className="form-control" id="arrivedtime" onChange={() => { handleHideErrorText('arrivalTime') }} />
                {mandatoryfield.arrivalTime && <p className="text-danger">Please Enter the Time.</p>}
              </div>
            </div>

            {/* <div className="form-group">
                            <label>Upload Image</label>
                            <input type="file" id='department' onChange={handleChange} multiple/>
                        </div> */}

            <div className="form-group">
              <label htmlFor="scannertype">Select Type Of Scanner <span className="text-danger">*</span></label>
              <select className="form-control" id="scannertype" style={{ height: "32px" }} onChange={() => { handleHideErrorText('typeOfScanner') }}>
                <option value="" hidden> Please Select RequestId </option>
                {scannerdata &&
                  scannerdata.map((ele,index) => (
                    <option key={index} value={`${ele.Scnmodelno},${ele.Scannermodel}`} >{`${ele.Scannermodel},${ele.Scnmodelno}`}</option>
                  ))}
              </select>
              {mandatoryfield.typeOfScanner && <p className="text-danger">Please! Select Type Of Scanner</p>}
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="startreading"> Scanner start reading</label>
                <input type="number" className="form-control" id="startreading" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="endreading">Scanner end reading</label>
                <input type="number" className="form-control" id="endreading" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="totalpagesscan">Total Pages Scanned</label>
              <input type="number" className="form-control" id="totalpagesscan" min={0} />
            </div>

            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea className="form-control" placeholder="Comments" type="text" id="remarks" />
            </div>


            <div className="form-group">
              <button type="submit" className="dark_btn btn float-right mb-4" onClick={handleClick} > Submit </button>
              <button type="reset" className="maroon_btn btn mr-4 float-right mb-4" > Reset </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ScanningBasicdetails;

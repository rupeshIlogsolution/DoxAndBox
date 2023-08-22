import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  rmsRequest,
  FileUpload,
  insertscannerportaldetails,
  Activityrequest,
  Requestidforuser,
} from "../../api/index";
import "./basicdetail.css";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import svg from "../Images/phoneicon.png";
import Footer from "../Navbar/Footer.js";

function PickupBasicdetails() {
  const [mandatoryfield, setMandatoryfield] = useState(false);
  // const [uploadimage,setUploadImage] = useState([]);
//   const [activity, setActivity] = useState([]);
  const [requestid, setRequestid] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
    //   const result = await Activityrequest();
    //   setActivity(result);
      const RequestId = await Requestidforuser(localStorage.getItem("User_ID"),'RecordPickup');
      setRequestid(RequestId);
    };
    fetchdata();
  }, []);

  // const handleChange = async(e) =>{
  //     const id = document.getElementById('reqid').value
  //     e.preventDefault();
  //     for(let i=0;i<e.target.files.length;i++){
  //         const data = new FormData()
  //         data.append("images",e.target.files[i],id)
  //         const Uploadlink = await FileUpload(data)
  //         setUploadImage(img => [...img,Uploadlink])
  //     }
  // }

  const handleClick = async (e) => {
    e.preventDefault();
    const Requestid = document.getElementById("reqid").value;
    const Noofboxes = document.getElementById("noofboxes").value;
    const Nooffiles = document.getElementById("nooffiles").value;
    const Arriveddate = document.getElementById("arriveddate").value;
    const ArrivedTime = document.getElementById("arrivedtime").value;
    const Remarks = document.getElementById("remarks").value;
    const EntryBy = localStorage.getItem("User_ID");
    const Portalid = `portal${Math.floor(Math.random() * 100000)}`;
    // const Activity = document.getElementById("activity").value.split(",");
    // const Acivityname = Activity[0];
    // const Activitycode = Activity[1];

    if (!Requestid) {
      setMandatoryfield(true);
    } else {
      const result = await insertscannerportaldetails(
        Requestid,
        "RecordPickup",
        "",
        "",
        Arriveddate,
        ArrivedTime,
        "",
        "",
        Remarks,
        EntryBy,
        Noofboxes,
        Nooffiles,
        "",
        Portalid,
        "",
        "",
        "",
        localStorage.getItem("User_Name")
      );
      alert("Added Successfully");
      window.location.href = "/UserLogindetails";
    }
  };

  return (
    <>
      <div className="userReq">
        <Navbar />
        <div className="rec_user">
          <div className="svg_div">
            <img src={svg} />
          </div>
          <form>
            <h3 className="pb-3">
              Request for Pickup Basic Details{" "}
              <BsFillChatSquareQuoteFill
                style={{ margin: "0 0 -9px 0", fontSize: "30px" }}
              />
            </h3>
            <div className="form-group">
              <label>
                Request Id <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control "
                id="reqid"
                style={{ height: "32px" }}
              >
                <option value="" hidden>
                  Please Select RequestId
                </option>
                {requestid &&
                  requestid.map((item) => (
                    <option value={item.Requestid}>{item.Requestid}</option>
                  ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label> Date </label>
                <input type="date" className="form-control" id="arriveddate" />
              </div>
              <div className="form-group col-md-6">
                <label> Time </label>
                <input type="time" className="form-control" id="arrivedtime" />
              </div>
            </div>

            {/* <div className="form-group">
                            <label>Upload Image</label>
                            <input type="file" id='department' onChange={handleChange} multiple/>
                        </div> */}

            <div className="form-row">
              <div className="form-group col-md-6">
                <label> No of Boxes Ready </label>
                <input type="number" className="form-control" id="noofboxes" />
              </div>
              <div className="form-group col-md-6">
                <label> Total Files in Boxes </label>
                <input type="number" className="form-control" id="nooffiles" />
              </div>
            </div>

            {/* <div className="form-group">
              <label>Activity</label>
              <select
                className="form-control "
                id="activity"
                style={{ height: "32px" }}
              >
                <option defaultValue hidden>
                  Please Select Activity
                </option>

                {activity &&
                  activity.map((ele) => (
                    <option
                      value={`${ele.minor},${ele.revgl_code}`}
                    >{`${ele.minor},${ele.revgl_code}`}</option>
                  ))}
              </select>
            </div> */}

            <div className="form-group">
              <label>Remarks</label>
              <textarea
                className="form-control"
                placeholder="Comments"
                type="text"
                id="remarks"
              />
            </div>

            {mandatoryfield ? (
              <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
            ) : null}

            <div className="form-group">
              <button
                type="submit"
                className="dark_btn btn float-right mb-4"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="submit"
                className="maroon_btn btn mr-4 float-right mb-4"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PickupBasicdetails;

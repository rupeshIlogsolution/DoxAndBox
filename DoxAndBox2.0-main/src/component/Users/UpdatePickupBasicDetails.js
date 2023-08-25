import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getportalrequest, updateportalrequest } from "../../api/index";
import "./basicdetail.css";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import svg from "../Images/phoneicon.png";
import Footer from "../Navbar/Footer.js";

const UpdatePickupBasicDetails = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const portalrequest = await getportalrequest(
        localStorage.getItem("portalid")
      );
      setData(portalrequest);
    };
    fetchdata();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const Noboxes = document.getElementById("noofboxes").value;
    const Nooffiles = document.getElementById("nooffiles").value;
    // const Activity = document.getElementById("activity").value;
    const Remarks = document.getElementById("remarks").value;
    const result = await updateportalrequest(
      "",
      "",
      Noboxes,
      Nooffiles,
      "",
      Remarks,
      localStorage.getItem("portalid")
    );
    if (result) {
      alert("Update Successfully");
      window.location.href = "/UserLogindetails";
    }
  };
  return (
    <>
      <div className="userReq">
        <Navbar />

        <div className="rec_user">
          <div className="svg_div">
            <img src={svg} alt="bg-image" />
          </div>
          <form>
            <h3 className="pb-3">Update Pickup Basic Details<BsFillChatSquareQuoteFill style={{ margin: "0 0 -9px 0", fontSize: "30px" }} /></h3>

            <div className="form-group">
              <label htmlFor="request">Request Id</label>
              <input type="text" className="form-control" disabled id="request id" defaultValue={data.Requestid} />
            </div>
            <div className="form-group">
              <label htmlFor="date"> Date</label>
              <input type="text" className="form-control" disabled id="date" defaultValue={data.ARRIVEDDATE} />
            </div>

            {/* <div className="form-group">
              <label>Activity</label>
              <input
                type="text"
                className="form-control"
                disabled
                id="date"
                defaultValue={data.Activity}
              />
            </div> */}

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="noofboxes">No of Box</label>
                <input type="number" className="form-control" id="noofboxes" defaultValue={data.Noboxes} />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="nooffiles">No of Files</label>
                <input type="number" className="form-control" id="nooffiles" defaultValue={data.Nooffiles} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea className="form-control" placeholder="Comments" type="text" id="remarks" defaultValue={data.Remarks} />
            </div>

            <div className="form-group">
              <button type="submit" className="dark_btn btn float-right mb-4" onClick={handleClick} >
                Update
              </button>
              <button className="maroon_btn btn mr-4 float-right mb-4" type="submit" > Reset</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePickupBasicDetails;

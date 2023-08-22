import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import "./Navbar2.css";
import LOGOimg from "../../assets/doxlogo.png";
import { Totallocation } from "../../api/index";
import { HiMenu } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import logo from "../Images/logoWithoutText.png";
import SideBar2 from "./Sidebar2";
import {CgLogOut} from 'react-icons/cg';


function Navbar() {
  const [on, setOn] = React.useState(true);
  const [totallocation, setTotallocation] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await Totallocation(localStorage.getItem("CUST_ID"));

      setTotallocation(result);
      // if (localStorage.getItem("Dptname") == "null") {
      //   console.log("dhkdjf");
      // } else {
      //   console.log(localStorage.getItem("Dptname"));
      // }

      if (localStorage.getItem("Login_Warehouse_ID") === "CORP") {
        setShow(true);
      }
    };
    fetch();
  }, []);

  const handleClick = () => {
    window.location.href = "/";
    localStorage.clear();
  };

  const handleChange = (e) => {
    const string = e.target.value;
    const split = string.split(",");

    localStorage.setItem("Warehouse_ID", split[0]);
    localStorage.setItem("Wh_name", split[1]);

    window.location.reload();
  };

  const handleOn = () => {
    setOn(!on);
  };

  const auth = localStorage.getItem("Req_id");
  if (!auth) {
    return (
      <div>
        <nav className="Navbar">
          <div className="brand_slidericon d-flex">
            <HiMenu
              onClick={handleOn}
              style={{ cursor: "pointer", color: "white", fontSize: "37px" }}
            />
            <div className="d-flex justify-content-center w-75 mt-1">
              <img
                style={{ width: "50px", height: "50px", margin: "-7px 0 0 0" }}
                src={logo}
              />
              <p>DOX & BOX</p>
            </div>
          </div>
          <div className="nav_content ">
            <div
              className="mx-1"
              style={{ borderRight: "1px solid", padding: "0 20px" }}
            >
              &nbsp;
              {localStorage.getItem("Dptname") !== "null"
                ? localStorage.getItem("Dptname")
                : ""}
            </div>
            <div
              className="mx-4"
              style={{ borderRight: "1px solid", padding: "0 20px" }}
            >
              &nbsp;{localStorage.getItem("User_Name")}
            </div>
            <div className="profilediv2" style={{borderRight: "1px solid", padding: "0 20px"}}>
              <ImLocation style={{ fontSize: "20px", margin: "0 0 -3px 0" }} />
              <select
                style={{ border: "none", background: "none" }}
                onChange={handleChange}
              >
                <option hidden>{localStorage.getItem("Wh_name")} </option>

                {show
                  ? totallocation.map((ele) => (
                      <option
                        key={ele.WHid}
                        value={`${ele.WHid},${ele.WHname}`}
                        style={{ fontSize: "17px" }}
                      >
                        {ele.WHname}{" "}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className="profilediv2 text-danger" onClick={handleClick} style={{ display:"flex",cursor:"pointer", padding: "0 20px"}}>
              <CgLogOut style={{ fontSize: "28px", margin: "0 0 -3px 0" }} />Logout       
            </div>
          </div>
        </nav>
        <SideBar openClass={on} />
      </div>
    );
  } else {
    return (
      <div>
        <nav className="Navbar">
          <div className="brand_slidericon d-flex">
            <HiMenu
              onClick={handleOn}
              style={{ cursor: "pointer", color: "white", fontSize: "37px" }}
            />
            <div className="d-flex justify-content-center w-75 mt-1">
              <img
                style={{ width: "50px", height: "50px", margin: "-7px 0 0 0" }}
                src={logo}
              />
              <p>DOX & BOX</p>
            </div>
          </div>
          <div className="nav_content ">
            <div
              className="mx-4"
              style={{ borderRight: "1px solid", padding: "5px 20px" }}
            >
              &nbsp; {localStorage.getItem("User_Name")}
            </div>
            <div className="mx-4">
              <button className="btn btn-danger" onClick={handleClick}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        <SideBar2 openClass={on} />
      </div>
    );
  }
}

export default Navbar;

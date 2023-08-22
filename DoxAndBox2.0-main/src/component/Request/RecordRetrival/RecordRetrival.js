import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./RecordRetrival.css";
import {
  rmsRequest,
  ReportData,
  ReportdataBoxes,
  IdCount,
  UpdateIdCount,
  DepartmentData,
  Mail,
} from "../../../api/index";
import Select from "react-select";
import svg from "../../Images/phoneicon.png";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import Footer from "../../Navbar/Footer";

function RecordRetrival() {
  const [mandatoryfield, setMandatoryfield] = useState(false);
  const [totalValues, setTotalValues] = useState([1]);
  const [toogle, setToggle] = useState(true);
  const [data, setData] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [selectfiles, setSelectFiles] = useState([]);
  const [remarks, setRemark] = useState([]);
  const [typeretrival, setTypeRetrival] = useState([]);
  const [typedelivery, setTypeDelivery] = useState([]);
  const [selectbox, setSelectBox] = useState([]);
  const [desc, setDesc] = useState([]);
  const [filerequest, setFileRequest] = useState();
  const [BookingId, setBooKingId] = useState();
  const [count, setCount] = useState();
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const whid = localStorage.getItem("Warehouse_ID");
      const id = await IdCount(whid);
      console.log(id);
      const lastno = Number(id[0].RMSBookid) + 1;
      setCount(lastno);
      let BookingId =
        "BOOK" + "-" + whid + "-" + String(lastno).padStart(6, "0");
      setBooKingId(BookingId);

      if (localStorage.getItem("Dptname") !== "null") {
        return true;
      } else {
        const department = await DepartmentData(
          localStorage.getItem("CUST_ID"),
          whid
        );
        setDepartment(department);
      }
    };
    fetchdata();
  }, []);

  let options = data.map((ele) => {
    return { value: ele.Fileno, label: `${ele.Fileno}, ${ele.FileName}` };
  });

  let optionBox = boxes.map((ele) => {
    if (ele.Description) {
      return {
        value: `${ele.Boxno},${ele.Description}`,
        label: `${ele.Boxno} , ${ele.Description}`,
      };
    } else {
      return {
        value: `${ele.Boxno},${ele.Description}`,
        label: `${ele.Boxno}`,
      };
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    // const remark = document.getElementById('remark').value;
    const locationid = localStorage.getItem("Warehouse_ID");
    const requestid =
      locationid + "-" + Math.floor(Math.random() * 10000000) + "-" + "RR";
    const TYPE = document.getElementById("type").value;

    const fileid = locationid + Math.floor(Math.random() * 10000000);
    const Department = document.getElementById("department").value;
    const data = [];

    var today = new Date();
    var date = today.toLocaleDateString("en-US");

    if (!typeretrival || !typedelivery) {
      setMandatoryfield(true);
    } else {
      // console.log(selectfiles,remarks,typeretrival,typedelivery)
      if (filerequest === "Files") {
        selectfiles.map(async (file, index) => {
          data.push({
            Location: localStorage.getItem("Wh_name"),
            Date: date,
            filenumber: file,
            Department: Department,
            remark: remarks[index],
            typeofretrival: typeretrival[index],
            typeofdelivery: typedelivery[index],
            RequestType: "RecordRetrival",
            nooffiles: selectfiles.length,
          });
          const result = await rmsRequest(
            "RecordRetrival",
            "",
            "",
            "",
            "",
            file,
            typeretrival[index],
            typedelivery[index],
            "",
            "",
            "",
            remarks[index],
            localStorage.getItem("User_ID"),
            fileid,
            locationid,
            requestid,
            localStorage.getItem("CUST_ID"),
            TYPE,
            "",
            "",
            "",
            "",
            "",
            BookingId,
            ""
          );

          console.log(selectfiles.length - 1, index);
          if (selectfiles.length - 1 === index) {
            setTimeout(() => {
              window.location.href = "/Dashboard";
            }, 1000);
            const mail = await Mail(data);
            const countData = await UpdateIdCount(locationid, count);
          } else {
            return;
          }
        });

        //     const mail = await Mail(data)
        //    const countData = await UpdateIdCount(locationid,count)
        //    console.log(mail)
        //    console.log(countData)
      } else {
        selectbox.map(async (box, index) => {
          data.push({
            Location: localStorage.getItem("Wh_name"),
            Date: date,
            filenumber: box,
            Department: Department,
            remark: remarks[index],
            typeofretrival: typeretrival[index],
            typeofdelivery: typedelivery[index],
            RequestType: "RecordRetrival",
            nooffiles: selectfiles.length,
          });
          const result = await rmsRequest(
            "RecordRetrival",
            "",
            "",
            "",
            "",
            "",
            typeretrival[index],
            typedelivery[index],
            "",
            "",
            "",
            remarks[index],
            localStorage.getItem("User_ID"),
            fileid,
            locationid,
            requestid,
            localStorage.getItem("CUST_ID"),
            TYPE,
            "",
            "",
            "",
            box,
            desc[index],
            BookingId
          );

          if (selectfiles.length - 1 === index) {
            setTimeout(() => {
              window.location.href = "/Dashboard";
            }, 1000);
            const mail = await Mail(data);
            const countData = await UpdateIdCount(locationid, count);
          } else {
            return;
          }
        });
        const mail = await Mail(data);

        const countData = await UpdateIdCount(locationid, count);
        window.location.href = "/Dashboard";
      }
    }
  };

  const handleChangeType = async (e) => {
    document.getElementById("type").disabled = "true";

    if (e.target.value === "File") {
      setFileRequest("Files");
      setToggle(true);
      if (localStorage.getItem("Dptname")) {
        const result = await ReportData(
          localStorage.getItem("CUST_ID"),
          localStorage.getItem("Warehouse_ID"),
          localStorage.getItem("Dptname")
        );
        setData(result);
      } else {
        const result = await ReportData(
          localStorage.getItem("CUST_ID"),
          localStorage.getItem("Warehouse_ID"),
          "All"
        );
        setData(result);
      }
    } else {
      setFileRequest("Boxes");
      setToggle(false);
      if (localStorage.getItem("Dptname")) {
        const result = await ReportdataBoxes(
          localStorage.getItem("CUST_ID"),
          localStorage.getItem("Warehouse_ID"),
          localStorage.getItem("Dptname")
        );
        setData(result);
      } else {
        const result = await ReportdataBoxes(
          localStorage.getItem("CUST_ID"),
          localStorage.getItem("Warehouse_ID"),
          "All"
        );
        setBoxes(result);
      }
    }
  };
  const handleDepartment = async (e) => {
    const type = document.getElementById("type").value;

    if (type === "File") {
      setFileRequest("Files");
      setToggle(true);
      const result = await ReportData(
        localStorage.getItem("CUST_ID"),
        localStorage.getItem("Warehouse_ID"),
        e.target.value
      );
      setData(result);
    } else {
      setFileRequest("Boxes");
      setToggle(false);
      const result = await ReportdataBoxes(
        localStorage.getItem("CUST_ID"),
        localStorage.getItem("Warehouse_ID"),
        e.target.value
      );
      setBoxes(result);
      console.log(result);
    }
  };

  const handleChangeBox = (selectedOption) => {
    let method = selectedOption.value;
    let [box, description] = method.split(",");
    setSelectBox([...selectbox, box]);
    setDesc([...desc, description]);
  };

  const handleChange = (selectedOption) => {
    setSelectFiles([...selectfiles, selectedOption.value]);
  };

  const handleChangeremark = (e) => {
    const remark = document.getElementById("remark").value;
    setRemark([...remarks, remark]);
  };

  const handleChangeRetrival = (e) => {
    setTypeRetrival([...typeretrival, e.target.value]);
  };

  const handleChangeDelivery = (e) => {
    setTypeDelivery([...typedelivery, e.target.value]);
  };

  // const handleChangeWarehouse = async(e) => {
  //     console.log(e.target.value,localStorage.getItem('CUST_ID'))
  //     const result = await ReportData(localStorage.getItem('CUST_ID'),e.target.value)
  //     console.log(result)
  //     setData(result)
  // }

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalValues([...totalValues, 1]);
  };

  const handleRemove = (index) => {
    // e.preventDefault()

    var newvalue = [...totalValues];
    if (newvalue.length == 1) {
      setTotalValues(newvalue);
    } else {
      newvalue.splice(index, 1);
      setTotalValues(newvalue);
    }
  };

  return (
    <>
      <div className="generatorlogcontainer">
        <Navbar />
        <div className="rec_retrival">
          <div className="svg_div">
            <img src={svg} />
          </div>

          <form
            style={{
              margin: "0px 20px 0px 15px",
              boxShadow: "8px 8px 5px 1px grey",
              padding: "40px 15px 0px",
              minHeight: "70vh",
              borderRadius: "7px",
              background: "white",
            }}
          >
            <h3 className="my-4">
              Record Retrival{" "}
              <BsFillChatSquareQuoteFill
                style={{ margin: "0 0 -9px 0", fontSize: "30px" }}
              />
            </h3>
            <br />
            <div className="d-flex just justify-content-around raw mb-4">
              <div className="col-md-4">
                <label className="col-md-6">
                  {" "}
                  Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-control "
                  id="type"
                  onChange={handleChangeType}
                  style={{ height: "32px" }}
                >
                  <option defaultValue hidden>
                    Choose ...
                  </option>
                  <option>File</option>
                  <option>Box</option>
                </select>
              </div>

              <div className="col-md-5">
                <label className="col-md-7">
                  {" "}
                  Department <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-control "
                  id="department"
                  onChange={handleDepartment}
                  style={{ height: "32px" }}
                >
                  <option defaultValue="All" hidden>
                    {localStorage.getItem("Dptname") !== "null"
                      ? localStorage.getItem("Dptname")
                      : "Select"}
                  </option>
                  {department.map((element) => (
                    <option value={element.department}>
                      {element.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <table class="table col-md-5">
              <thead>
                <tr>
                  <th scope="col">File/Box</th>
                  <th scope="col">remark</th>
                  <th scope="col">Type Of Retrival</th>
                  <th scope="col">Type Of Delivery</th>
                </tr>
              </thead>
              <tbody>
                {totalValues.map((element, index) => (
                  <tr key={index}>
                    <td className="col-md-4">
                      {toogle ? (
                        <div id="fileshidden">
                          <Select
                            options={options}
                            className="col"
                            isMulti={false}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <div id="Boxeshidden">
                          <Select
                            options={optionBox}
                            className="col"
                            isMulti={false}
                            onChange={handleChangeBox}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        style={{
                          border: "none",
                          boxShadow: "1px 1px 10px 1px rgb(141, 140, 140)",
                        }}
                        className="form-control "
                        type="text"
                        id="remark"
                        placeholder="remark"
                        onBlur={handleChangeremark}
                      />
                    </td>
                    <td className="col-md-2">
                      <select
                        id="typeOfRetrival"
                        style={{ borderRadius: "4px", height: "33px" }}
                        onChange={handleChangeRetrival}
                      >
                        <option defaultValue hidden>
                          Choose ...
                        </option>
                        <option>Digital (Scan)</option>
                        <option>Physical-Returnable</option>
                        <option>Physical-Permanent Out</option>
                        <option>Photocopy</option>
                        <option>Audit on Site</option>
                      </select>
                    </td>
                    <td>
                      <select
                        id="deliverytype"
                        style={{ borderRadius: "4px", height: "33px" }}
                        onChange={handleChangeDelivery}
                      >
                        <option defaultValue hidden>
                          Choose ...
                        </option>
                        <option>Standard</option>
                        <option>Urgent</option>
                        <option>Express Delivery</option>
                      </select>
                    </td>
                    <td></td>
                    {/* <button className="btn btn-danger" onClick={(e)=>{e.preventDefault();handleRemove(index)}}>Remove</button> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn dark_btn" onClick={handleAdd}>
              Add
            </button>{" "}
            &nbsp;
            <button className="btn btn-danger" onClick={handleRemove}>
              Remove
            </button>
            <hr />
            {mandatoryfield ? (
              <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
            ) : null}
            <div className="form-group ">
              <button
                type="submit"
                className="dark_btn btn  float-right "
                onClick={handleClick}
              >
                Submit
              </button>

              <button
                type="submit"
                className="maroon_btn btn mr-4 float-right "
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

export default RecordRetrival;

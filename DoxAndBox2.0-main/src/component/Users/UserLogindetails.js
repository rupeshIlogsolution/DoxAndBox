import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  totalportalrequest,
  FileUpload,
  fileuploadindb,
} from "../../api/index";
import "./basicdetail.css";
import { FaFileUpload } from "react-icons/fa";
import Footer from "../Navbar/Footer.js";
import Datatable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function UserLogindetails() {
  const [totalrequest, setTotalRequest] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const Totallocationresult = await totalportalrequest(
        localStorage.getItem("User_ID"),
        "all"
      );
      setTotalRequest(Totallocationresult);
      setData(Totallocationresult);
    };
    fetchdata();
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    const Totallocationresult = await totalportalrequest(
      localStorage.getItem("User_ID"),
      e.target.value
    );
    setTotalRequest(Totallocationresult);
  };

  const handleChangefile = async (portalid, custid, files, requestid) => {
    let Uploadlinkdata = [];
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("images", files[i], requestid);
      const Uploadlink = await FileUpload(data);
      Uploadlinkdata.push(Uploadlink);
      if (i === files.length - 1) {
        UploadInDBImg(portalid, custid, Uploadlinkdata, requestid);
      }
    }
  };

  const UploadInDBImg = async (portalid, custid, img, requestid) => {
    img.forEach(async (values) => {
      const result = await fileuploadindb(
        portalid,
        requestid,
        custid,
        values,
        localStorage.getItem("User_ID")
      );
    });
  };

  const handleClick = (values) => {
    if (values.Requesttype === "ScanningRequest") {
      localStorage.setItem("portalid", values.Portalid);
      window.location.href = "/updatescanningbasicdetails";
    } else if (values.Requesttype === "RecordPickup") {
      localStorage.setItem("portalid", values.Portalid);
      window.location.href = "/updatepickupbasicdetails";
    }
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.RequestStatus === "Open",
      style: {
        backgroundColor: "#8A9A5B",
      },
    },
    {
      when: (row) => row.RequestStatus !== "Open",
      style: {
        backgroundColor: "red",
      },
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "12px",
        background: "#eee",
        color: "black",
      },
    },
    cells: {
      style: {
        fontSize: "12px",
        color: "white",
        width: "60px",
      },
    },
    rows: {
      style: {
        minHeight: "35px",
        fontSize: "10px",
      },
    },
  };

  const columns = [
    {
      name: "Req ID",
      selector: (row) => row.Requestid,
      sortable: true,
      cell: (row) => (
        <button
          className="btn bg-transparent text-primary"
          style={{ fontSize: "12px", overflow: "hidden" }}
          title="Edit Data"
          onClick={() => {
            handleClick(row);
          }}
        >
          {row.Requestid}
        </button>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.Arriveddate,
      sortable: true,
    },
    {
      name: "Request type",
      selector: (row) => row.Requesttype,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.custname,
      sortable: true,
    },

    {
      name: "Actions",
      sortable: true,
      selector: "null",
      cell: (row) => (
        <div>
          <input
            type="file"
            id="department"
            onChange={(e) => {
              e.preventDefault();
              handleChangefile(
                row.Portalid,
                row.custid,
                e.target.files,
                row.Requestid
              );
            }}
            style={{ display: "none" }}
            multiple
          />
          <button
            className="btn bg-transparent"
            title="Upload Image"
            onClick={() => {
              document.getElementById("department").click();
            }}
          >
            <FaFileUpload style={{ fontSize: "20px", color: "blue" }} />
          </button>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <Navbar />
      <div className=" container " style={{ paddingTop: "80px" }}>
        <div class="card w-100  border-0" style={{ minHeight: "81vh" }}>
          <div class="card-header  bg-info">
            <h6 className="text-bold text-white">{`Welcome to Dox & Box ${localStorage.getItem("User_Name")}`}</h6>
          </div>
          <div class="card-body">
            <DataTableExtensions {...tableData}>
              <Datatable
                columns={columns}
                data={data}
                pagination
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}
              />
            </DataTableExtensions>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserLogindetails;

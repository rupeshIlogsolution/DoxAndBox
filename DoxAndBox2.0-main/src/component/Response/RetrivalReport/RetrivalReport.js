import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { rmsReports } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Navbar/Footer'
import './RetrivalReport.css';
import { DatePicker } from "antd";
import { MdEditNote } from 'react-icons/md';
import Moment from "moment";

import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const columns = [
  {
    name: "Allocate Date",
    selector: row => row.Allocatedate,
    sortable: true
  },
  {
    name: "File Number",
    selector: row => row.Fileno,
    sortable: true
  },
  {
    name: "Pickup Number",
    selector: row => row.pickupno,
    sortable: true
  },
  {
    name: "Request Type",
    selector: row => row.requesttype,
    sortable: true
  },
  {
    name: "Status",
    selector: row => row.Status,
    sortable: true
  }


];


function RetrivalReport() {
  const customStyles = {
    title: {
      style: {
        fontColor: 'red',
        fontWeight: '900',

      }
    },
    rows: {
      style: {
        minHeight: '35px',
      }
    },
    headCells: {
      style: {
        fontSize: '14px',
        background: '#900d10',
        color: 'white',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        background: 'rgb(242,242,242)',
        borderBottom: "1px solid silver",
      },
    },
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle, setToggle] = useState(true)



  useEffect(() => {

    async function fetchData() {
      var myDate = new Date();
      var day = myDate.getDate();
      var month = myDate.getMonth() + 1;
      var year = myDate.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var startDate = year + "-" + month + "-" + "01";
      var endDate = year + "-" + month + "-" + day;
      // You can await here
      const response = await rmsReports('Retrival', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), startDate, endDate)

      setData(response)
      if (response) {
        setLoading(false);
      }

    }
    fetchData();
  }, [])

  const tableData = {
    columns, data
  };

  const setfun = async (e) => {

    const val1 = Moment(e[0]).format("YYYY-MM-DD");
    const val2 = Moment(e[1]).format("YYYY-MM-DD");
    // const arry = [val1, val2];
    setToggle(false)

    const response = await rmsReports('Retrival', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), val1, val2)
    setData(response)
    if (response) {
      setLoading(false);
    }

  }

  return (
    <>
    <Navbar />
    <div className="InvoicesinProgress_retRep">
      
      <div className='reports_div_retRep'>
        {loading ? (
          <div class="loader"></div>

        ) : (
          <div className=" reportdata_retRep" >
            <h3>Retrival Report<MdEditNote style={{fontSize:"40px",margin:"-10px 0"}}/></h3>
            <div  style={{display:"flex",justifyContent:"space-around"}}>
            {
              toogle ? <h4>Current Month</h4> : null

            }
            <RangePicker onChange={setfun} />
            </div>

            <div className="DataTable" style={{ marginTop: "15px" }}>
              <DataTableExtensions {...tableData} >
                <Datatable
                  columns={columns}
                  data={data}
                  pagination
                  customStyles={customStyles}
                />
              </DataTableExtensions>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default RetrivalReport

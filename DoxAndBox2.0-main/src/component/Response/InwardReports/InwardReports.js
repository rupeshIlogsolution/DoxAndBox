import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { rmsReports } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Navbar/Footer'
import './inwardReports.css'
import { DatePicker } from "antd";
import Moment from "moment";
import "antd/dist/antd.css";
import { MdEditNote } from 'react-icons/md';
const { RangePicker } = DatePicker;


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


const columns = [
  {
    name: "Referance No",
    selector: row => row.ActivityReferenceNo,
    sortable: true
  },
  {
    name: "Box No",
    selector: row => row.Boxno,
    sortable: true
  },
  {
    name: "Date of Activity",
    selector: row => row.Dateofactivity,
    sortable: true
  },
  {
    name: "Department",
    selector: row => row.Department,
    sortable: true
  },
  {
    name: "File Name",
    selector: row => row.Filename,
    sortable: true
  },
  {
    name: "File UI DNO",
    selector: row => row.FileUIDno,
    sortable: true
  },
  {
    name: "Invoice",
    selector: row => row.Invoice_no,
    sortable: true
  },
  {
    name: "Location",
    selector: row => row.ItemLocation,
    sortable: true
  },
  {
    name: "Warehouse",
    selector: row => row.Location,
    sortable: true
  },
  {
    name: "Mode",
    selector: row => row.Mode,
    sortable: true
  }

];


function InwardReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle,setToggle]=useState(true)


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

      var department 

      if(localStorage.getItem("Dptname") !== 'null'){
        department = localStorage.getItem("Dptname")


    }else{
      department = 'not_null'


    }

      const response = await rmsReports('Inward', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),startDate,endDate,department)
      
      console.log(response)
      setData(response)
      if(response){
        setLoading(false);
      }

    }
    fetchData();
  }, [])

  const tableData = {
    columns, data
  };

  const setfun = async(e) => {

    const val1 = Moment(e[0]).format("YYYY-MM-DD");
    const val2 = Moment(e[1]).format("YYYY-MM-DD");
    // const arry = [val1, val2];
    setToggle(false)

    var department 
    if(localStorage.getItem("Dptname") !== 'null'){
      department = localStorage.getItem("Dptname")
  }else{
    department = 'Not_null'
  }

    const response = await rmsReports('Inward', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2,department)
    setData(response)
    if(response){
      setLoading(false);
    }

  }

  return (
    
    <>
    <Navbar />
    <div className="InvoicesinProgress_inward">
      
      <div className='reports_div_inward'>
      {loading?(
                 <div class="loader"></div>

      ):(
      <div className=" reportdata_inward">
        <h3>Inward Report <MdEditNote style={{fontSize:"40px",margin:"-10px 0"}}/></h3>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        {
          toogle?<h4 >Current Month</h4>:null

        }
        <RangePicker onChange={setfun} />
        </div>

        <div className="DataTable">
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

export default InwardReports

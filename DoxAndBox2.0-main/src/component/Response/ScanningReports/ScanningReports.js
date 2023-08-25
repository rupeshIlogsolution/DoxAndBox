import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { rmsReports,TotalScanReportCount } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Navbar/Footer'
import { DatePicker } from "antd";
import Moment from "moment";
import "antd/dist/reset.css";
import './ScanningRep.css'
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
    name: 'Scanning Date',
    selector: 'DateofScan',
    sortable: true
  },
  {
    name: 'No of Pages Scan',
    selector: 'PagesScan',
    sortable: true
  },
  {
    name: 'Department',
    selector: 'Department',
    sortable: true
  },
  {
    name: 'No of Files',
    selector: 'FileScan',
    sortable: true
  },
  // {
  //   name: 'Employee Name',
  //   selector: 'EmployeeName',
  //   sortable: true
  // },
  // {
  //   name: 'Man Power',
  //   selector: 'Manpower',
  //   sortable: true
  // },
  // {
  //   name: 'File Type',
  //   selector: 'filetype',
  //   sortable: true
  // },
  {
    name: 'File UID Number',
    selector: 'FileUIDNo',
    sortable: true
  },
  {
    name: 'File Name',
    selector: 'Filesname',
    sortable: true
  },
  {
    name: 'Box No',
    selector: 'boxno',
    sortable: true
  },
  {
    name: 'Total Pages scan on date',
    selector: 'dailypagesscan',
    sortable: true
  }
];



function ScanningReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle, setToggle] = useState(true)
  const [pagescan,setPageScan] = useState()
  const [Totalfile,setTotalFile] = useState()


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
      if(localStorage.getItem("Dptname")){
         department = localStorage.getItem("Dptname")
      }else{
         department = 'Not_null'
      }

      const response = await rmsReports('Scanning', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), startDate, endDate,department)
      const Scancount = await TotalScanReportCount(localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),startDate,endDate,department)
      console.log(Scancount[0].TotalFile)
      setPageScan(Scancount[0].Pagescan)
      setTotalFile(Scancount[0].TotalFile)
      setData(response)
      console.log(response)
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
    setToggle(false)

    var department 
    if(localStorage.getItem("Dptname") !== 'null'){
      department = localStorage.getItem("Dptname")
    }else{
      department = 'not_null'
    }

    const response = await rmsReports('Scanning', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), val1, val2,department)

    const Scancount2 = await TotalScanReportCount(localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2,department)
    setPageScan(Scancount2[0].Pagescan)


    setData(response)
    if (response) {
      setLoading(false);
    }
  }

  return (
    <>
    <Navbar />
    <div className="InvoicesinProgress_scanning">
      
      <div className='reports_div_scanning'>
      {loading ? (
        <div class="loader"></div>

      ) : (
        <div className=" reportdata" >
          <h3 style={{marginBottom:"20px"}}>Scanning Report <MdEditNote style={{fontSize:"40px",margin:"-10px 0"}}/></h3>
          <div className="reportDataInside">
          {
            toogle ?
            <>
            <div className='d-flex'>
            <h4 > Pages scanned - Current Month </h4>
             <h3 style={{margin:"-3px 10px",color:"#901918"}}>
              {pagescan} 
              </h3>
            </div>
            <div className='d-flex'>
            <h4> Files - Current Month </h4> 
            <h2 style={{margin:"-3px 10px",color:"#901918"}}>
              {Totalfile}
              </h2>
            </div>
            </>

            : 
            <>
            <div className='d-flex'>
            <h4>Pages scanned </h4>
            <h3 style={{margin:"-3px 10px",color:"#901918"}}>
              {pagescan}
              </h3>
            </div>
            <div className='d-flex'>
            <h4 >Files scanned</h4>
            <h3 style={{margin:"-3px 10px",color:"#901918"}}>
              {Totalfile}
              </h3>
              </div>
            </>

            
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

export default ScanningReports

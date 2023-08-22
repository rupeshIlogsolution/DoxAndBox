import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { RequestReport } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Navbar/Footer'
import '../response.css';



const columns = [
  {
    name: "Activity",
    selector: row => row.activity,
    sortable: true
  },
  {
    name: "On Site",
    selector: row => row.onsite,
    sortable: true
  }, 
  {
    name: "Remark",
    selector: row => row.remark,
    sortable: true
  },
  {
    name: "Status",
    selector: row => row.status,
    sortable: true
  }
];
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


function OtherReport() {
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

      const response = await RequestReport(localStorage.getItem('CUST_ID'),'OtherRequest')
      
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



  return (
    <div className="InvoicesinProgress">
      <Navbar />
      <div className='reports_div'>
      {loading?(
                   <div class="loader"></div>

      ):(
      <div className=" reportdata"  >
        <h3 className="my-4">Shredding Request Report</h3>
     

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
  )
}

export default OtherReport

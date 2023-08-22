import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { RequestReport } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';



const columns = [
  {
    name: "File Name",
    selector: 'file_name',
    sortable: true
  },
  {
    name: "On Site",
    selector: 'onsite',
    sortable: true
  }, 
  {
    name: "Date",
    selector: 'ActivityDate',
    sortable: true
  }, 
  {
    name: "Remark",
    selector: 'remark',
    sortable: true
  },
  {
    name: "Status",
    selector: 'status',
    sortable: true
  }
];


function ShreddingRequest() {
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

      const response = await RequestReport(localStorage.getItem('CUST_ID'),'ShreddingRequest')
      
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
                  <h1 style={{display:"flex",justifyContent:"center",alignItems:"center" }}>Loading...</h1>

      ):(
      <div className=" reportdata"  >
        <h3 className="text-dark">Shredding Request Report</h3>
     

        <div className="DataTable">
          <DataTableExtensions {...tableData} >
            <Datatable
              columns={columns}
              data={data}
              pagination
            />
          </DataTableExtensions>
        </div>
      </div>
      )}
      </div>
    </div>
  )
}

export default ShreddingRequest

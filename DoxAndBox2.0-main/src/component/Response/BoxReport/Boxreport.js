import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { BoxReports } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Navbar/Footer'
import '../response.css';



const columns = [
    {
        name: "File No",
        selector: row => row.Fileno,
        sortable: true
      },
 
  {
    name: "File Name",
    selector: row => row.Filename,
    sortable: true
  }, {
    name: "Box No",
    selector: row => row.Boxno,
    sortable: true
  },
 
  {
    name: "Item Location",
    selector: row => row.Location,
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


function BoxReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchData() {


      const response = await BoxReports(localStorage.getItem('Boxno'),localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'))
      
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
    <>
    <div className="InvoicesinProgress">
      <Navbar />
      <div className='reports_div'>
      {loading?(
                   <div class="loader"></div>
      ):(
      <div className=" reportdata"  >
        <h3 className="my-4">File Details Report</h3>
     

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

export default BoxReport

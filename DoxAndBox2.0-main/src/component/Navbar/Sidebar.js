import React, { useState,useEffect } from 'react';
import './Sidebar.css'
import { Totallocation } from '../../api/index'
import { MdDashboard,MdReport,MdArrowDropDown,MdEditNote } from 'react-icons/md';
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RiUserFill } from 'react-icons/ri';
import {CgLogOut} from 'react-icons/cg';


const SideBar = ({ openClass }) => {
  const [recorddiv, setRecorddiv] = useState(false);
  const [reportdiv, setReportdiv] = useState(false);
  const [RequestStatusReport, setRequestStatusReport] = useState(false);
  const [show, setShow] = useState(false)


  const [profilrdiv, setProfilrdiv] = useState(false);
  const [totallocation, setTotallocation] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const result = await Totallocation(localStorage.getItem('CUST_ID'))
      console.log('wharehouse', result)

      setTotallocation(result)

      if (localStorage.getItem('Login_Warehouse_ID') === 'CORP') {
        setShow(true)
      }
    }
    fetch()
  }, [])


  const handlerecord = () => {
    setRecorddiv(!recorddiv);
    setReportdiv(false);
    setProfilrdiv(false);

  }

  const handlereport = () => {
    setRecorddiv(false);
    setReportdiv(!reportdiv);
    setProfilrdiv(false);
  }
  const handlereprofile = () => {
    setRecorddiv(false);
    setProfilrdiv(!profilrdiv);
    setReportdiv(false);
    
  }

  const handlerequestStatusReport = () => {
    setRecorddiv(false);
    setReportdiv(false);
    setProfilrdiv(false);
    setRequestStatusReport(!RequestStatusReport)
  }
  
  const handleClick = () => {
    window.location.href = '/'
    localStorage.clear();
  }

  const handleChange = (e) => {
    const string = e.target.value
    const split = string.split(",")
    console.log(split)

    localStorage.setItem('Warehouse_ID', split[0])
    localStorage.setItem('Wh_name', split[1])


    window.location.reload()
  }
  return (
    <nav className={openClass === true ? 'closeslidernav slidernav' : ' slidernav'}>
      <ul className="navlist">
        <li>
          <a className="menu-item" href="/Dashboard" style={{padding:"10px 130px 10px 0"}}>
            <MdDashboard style={{fontSize:"20px" ,margin:"-2px 5px"}}/>Dashboard
          </a>
        </li>

        
        <li onClick={handlerecord}>
          <a className="menu-item" href="#" style={{padding:"10px 131px 10px 0"}}>
           
           <BsFillChatSquareQuoteFill style={{fontSize:"17px" ,margin:"-2px 6px"}}/>Request<MdArrowDropDown style={{fontSize:"22px",marginBottom:"-6px"}}/>
          </a>

        </li>
        {recorddiv ?
          <ul className="innerul" id='reportinnerdiv'  >
            <a href='/RecordPickup'><li style={{borderTop:"1px solid #2f2f2f"}}>Record Pickup</li></a>
            <a href='/RecordRetrival'><li>Record Retrieval</li></a>
            <a href='/ScanningRequest'> <li>Scanning Request</li></a>
            <a href='/Shredding'> <li>Shredding</li></a>
            <a href='/OtherRequest'>  <li>Other</li></a>
          </ul>
          : null}

{/* <li>
          <a onClick={handlerequestStatusReport} className="menu-item"  href='#' style={{padding:"10px 25px 10px 0"}}>
             <MdEditNote style={{fontSize:"28px",margin:"-3px 0 -5px"}}/>Request Status Report<MdArrowDropDown style={{fontSize:"22px",marginBottom:"-6px"}}/>

          </a>
        </li> */}
        {/* {RequestStatusReport ?
          <ul className="innerul" id='reportinnerdiv' >
            <a href="/RecordPickupReport"> <li style={{borderTop:"1px solid #2f2f2f"}}>Pickup Report</li></a>
            <a href="/RecorRetrivalReport"> <li>Retrieval Report</li></a>
            <a href="/ShreddingRequestReport"> <li>Shredding Report</li></a>
            <a href="/ScanningRequestReport"> <li>Scanning Report</li></a>
            <a href="/OtherRequestReport"> <li>Other Report</li></a>

          </ul>
          : null} */}

        <li>
          <a onClick={handlereport} className="menu-item" href='#' >

            
            <MdEditNote style={{fontSize:"28px",margin:"-3px 0 -5px"}}/> Reports <MdArrowDropDown style={{fontSize:"22px",marginBottom:"-6px"}}/>

          </a>
        </li>
        {reportdiv ?
          <ul className="innerul" id='reportinnerdiv' >
            <a href="/InwardReports"> <li style={{borderTop:"1px solid #2f2f2f"}}>Inward Report</li></a>
            <a href="/RetrivalReports"> <li>Retrieval Report</li></a>
            <a href="/ScanningReports"> <li>Scanning Report</li></a>
            <a href="/StockReports"> <li>Stock Report</li></a>
          </ul>
          : null}

         

          
        <li >
          <a onClick={handlereprofile} className="menu-item" href='#' style={{padding:"10px 124px 10px 0"}}>
           <RiUserFill style={{fontSize:"20px",margin:"-2px 5px"}}/> Account<MdArrowDropDown style={{fontSize:"22px",marginBottom:"-6px"}}/>
          </a>
        </li>
        {profilrdiv ?
          <ul className="innerprofileul" id='reportinnerdiv' >
            <a href="/Profile"> <li style={{borderTop:"1px solid #2f2f2f"}}>Profile</li></a>
            <a href="/Changepassword"> <li>Change Password</li></a>
            {/* <a href="#" onClick={handleClick}> <li>Logout</li></a> */}
          
          </ul>
          : null}
          <li >
          <a onClick={handleClick} className="menu-item" href='#' style={{padding:"10px 124px 10px 0px"}}> 
           <CgLogOut style={{fontSize:"25px",color:"red",margin:"-7px 7px"}}/> Logout
          </a>
        </li>
           <li>
          <div className="profilediv2 mr-5">
          <ImLocation style={{fontSize:"20px",margin:"-2px 0px"}}/>
          <select style={{ border: "none", background: "none", color:"white"}} onChange={handleChange}>
          
            <option hidden>{localStorage.getItem('Wh_name')} </option>

            {show ?
              totallocation.map((ele) => (
                <option key={ele.WHid} value={`${ele.WHid},${ele.WHname}`} style={{ fontSize: "17px" }}>{ele.WHname} </option>
              )) : null
            }


          </select>

        </div>

          </li>

      </ul>
    </nav>
  );
};

export default SideBar;
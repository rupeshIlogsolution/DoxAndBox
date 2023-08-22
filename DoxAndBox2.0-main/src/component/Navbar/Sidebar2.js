import React, { useState,useEffect } from 'react';
import './Sidebar.css'
import { Totallocation } from '../../api/index'
import { MdDashboard,MdReport,MdArrowDropDown,MdEditNote } from 'react-icons/md';
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RiUserFill } from 'react-icons/ri';
import {CgLogOut} from 'react-icons/cg';



const SideBar2 = ({ openClass }) => {
  const [recorddiv, setRecorddiv] = useState(false);


  const handleClick = () => {
    window.location.href = '/'
    localStorage.clear();
  }

  return (
    <nav className={openClass === true ? 'closeslidernav slidernav' : ' slidernav'}>
      <ul className="navlist">
        <li>
          <a className="menu-item" href="/UserLogindetails" style={{padding:"10px 130px 10px 0"}}>
            <MdDashboard style={{fontSize:"20px" ,margin:"-2px 5px"}}/>Dashboard
          </a>
        </li>

        
        <li>
          <a className="menu-item" href="/ScanningBasicDetails">
           Scanning Request
          </a>

        </li>

        <li>
          <a className="menu-item" href="/PickupBasicdetails">
           Pickup Request
          </a>

        </li>
        <li >
          <a onClick={handleClick} className="menu-item" href='#' style={{padding:"10px 10px 10px 0px"}}> 
           <CgLogOut style={{fontSize:"25px",color:"red",margin:"-7px 7px"}}/> Logout
          </a>
        </li>



     

                   
   
   
           <li>
       

          </li>

      </ul>
    </nav>
  );
};

export default SideBar2;
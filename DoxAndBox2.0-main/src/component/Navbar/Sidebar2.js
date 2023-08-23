import React from 'react';
import './Sidebar.css'
import { MdDashboard} from 'react-icons/md';
import {CgLogOut} from 'react-icons/cg';


const SideBar2 = ({ openClass }) => {

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
          <a className="menu-item" href="/ScanningBasicDetails" style={{padding:"10px 70px 10px 0"}}>
          Scanning Request</a>
        </li>
        <li>
          <a className="menu-item" href="/PickupBasicdetails" style={{padding:"10px 70px 10px 0"}}> Pickup Request </a>
        </li>
        <li >
          <a onClick={handleClick} className="menu-item" href='#' style={{padding:"10px 10px 10px 0px"}}> 
           <CgLogOut className='text-danger' style={{fontSize:"25px",margin:"-7px 7px"}}/> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar2;
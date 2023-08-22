import Navbar from '../Navbar/Navbar'
import React, { useEffect, useState } from 'react';
import './dashboard.css'
import { Dashboardetails, Dashboardrequest, DashbaordetailsPie, dashbaorScannedPages } from '../../api/index';
import { BsFillCalendarCheckFill, BsCheckAll,BsBoxArrowInDownLeft,BsBoxArrowUpRight } from 'react-icons/bs';
import { FaHeartbeat, FaBox, FaFile } from 'react-icons/fa';
import Footer from '../Navbar/Footer.js'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";


function Dashboard() {
    const [data, setData] = useState({})
    const [barvalue, setBarvalue] = useState([])
    const [pievalue, setPievalue] = useState([])
    const [ScanResult, setScanResult] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const ScanData = [
        {
            "name": "Total Pages",
            "value": ScanResult.TotalPages
        },
        {
            "name": "Scanned Pages",
            "value": ScanResult.ScannedPages
        }
    ];

    const onPieEnter = (index) => {
        console.log(index.name)
        window.location.href = `/${index.name}Report`
    }

    const COLORS = ["#0088FE", "#00C49F"];

    useEffect(() => {
        const data = async () => {
            const res1 = await Dashboardetails(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setData(res1)

            const dashboardpie = await DashbaordetailsPie(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setPievalue(dashboardpie)

            const res3 = await Dashboardrequest()
            setBarvalue(res3)

            const ScanRes = await dashbaorScannedPages(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setScanResult(ScanRes)
        }
        data()
    }, [])

    const auth = localStorage.getItem('CUST_ID')
    if(auth){
    return (
        <>
            <div className="dashboardcontainer" >
                <Navbar />
                <div className='dashboardwrapper'>
                    <div className='dashboardstatuscard' >
                        <h4 className='dash_heading text-light'>Files <FaFile style={{  background: "rgba(255, 255, 255,0.4)", color: "rgb(255, 255, 255)", fontSize: "28px", padding: "5px", borderRadius: "5px",marginBottom:"-6px" }} /></h4>
                        <div className='row1'>

                            <div className='card1' id="inbound">
                                <div className='d-flex'>
                                    <BsBoxArrowInDownLeft style={{ background: "#564535", color: "#db8d46", fontSize: "40px", padding: "5px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-light mx-3 mt-2'>Inbound</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid white"}}>
                                         <h1 className='text-light'>{data.InwardFileMonth}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-light'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-light'>{data.CurrentMonthFile}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-light'>Current Month</p>
                                    </div>
                                </div>
                            </div>
                            

                            <div className='card1' id="outbound">
                                <div className='d-flex'>
                                    <BsBoxArrowUpRight style={{ background: "#f1e1f7", color: "#bb6bd9", fontSize: "40px", padding: "7px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-dark mx-3 mt-2'>Outbound</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid gray"}}>
                                         <h1 className='text-dark'>{data.TotalOUT}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-dark'>{data.OUTCURRENTMONTH}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Current Month</p>
                                    </div>
                                </div>
                            </div>


                            <div className='card1' id="active">
                                <div className='d-flex'>
                                    <BsCheckAll style={{ background: "rgba(48, 230, 34,0.2)", color: "#48cf3e", fontSize: "40px", padding: "3px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-success mx-3 mt-2'>Active</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid gray"}}>
                                         <h1 className='text-dark'>{data.LTActivefile}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-dark'>{data.Current_month_activefile}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Current Month</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <h4 className='dash_heading'>Boxes <FaBox  style={{  background: "rgba(130, 130, 130,0.3)", color: "rgb(64, 64, 64)", fontSize: "28px", padding: "5px", borderRadius: "5px",marginBottom:"-6px" }} />
                        </h4>
                        <div className='row2'>
                        <div className='card1' id="inbound">
                                <div className='d-flex'>
                                    <BsBoxArrowInDownLeft style={{ background: "#564535", color: "#db8d46", fontSize: "40px", padding: "5px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-light mx-3 mt-2'>Inbound</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid white"}}>
                                         <h1 className='text-light'>{data.TotalLIFETIMEInwardbox}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-light'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-light'>{data.CurrentInwardbox}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-light'>Current Month</p>
                                    </div>
                                </div>
                            </div>

                            <div className='card1' id="outbound">
                                <div className='d-flex'>
                                    <BsBoxArrowUpRight style={{ background: "#f1e1f7", color: "#bb6bd9", fontSize: "40px", padding: "7px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-dark mx-3 mt-2'>Outbound</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid gray"}}>
                                         <h1 className='text-dark'>{data.outboxLifetime}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-dark'>{data.CurrentOutBox}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Current Month</p>
                                    </div>
                                </div>
                            </div>

                            <div className='card1' id="active">
                                <div className='d-flex'>
                                    <BsCheckAll style={{ background: "rgba(48, 230, 34,0.2)", color: "#48cf3e", fontSize: "40px", padding: "3px", borderRadius: "5px" }} />
                                    <p style={{fontSize:"15px",fontWeight:"600"}}className='text-success mx-3 mt-2'>Active</p>
                                </div>
                                <div className='content d-flex justify-content-center' style={{marginTop:"-8px"}}>
                                    <div style={{padding:"0 12%",borderRight:"1px solid gray"}}>
                                         <h1 className='text-dark'>{data.Lifettimeactivebox}</h1>
                                         <p style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Life Time</p>
                                    </div>
                                    <div style={{padding:"0 12%"}}>
                                         <h1 className='text-dark'>{data.CurrentMonthActiveBOX}</h1>
                                         <p  style={{fontSize:"15px",marginTop:"-14px"}}className='text-dark'>Current Month</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='row3'>
                        {/* <div className='graph' style={{ background: "white" }}>
                                <h5 className='text-dark mx-5 mb-3'>Pages Scanned Summary</h5>
                                <ResponsiveContainer width="100%">
                                    <PieChart width={700} height={180} margin={{ top: 10, bottom: 18 }}>
                                        <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.8)", borderRadius: "3px" }} />
                                        <Pie labelLine={false} data={ScanData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="rgb(94, 4, 69)" label>
                                            {ScanData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend layout="vertical" verticalAlign="top" align="right" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div> */}

                            <div className='graph' style={{ background: "#e0e0e0" }}>
                                <h5 className='text-secondary mx-5 mb-3'>Pages Scanned Summary</h5>
                                <ResponsiveContainer >
                                    <BarChart width={600} height={280} data={ScanData} margin={{ right: 45, bottom: 13 }}>
                                        <CartesianGrid />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.8)", borderRadius: "3px" }} />
                                        {/* <Legend /> */}
                                        <Bar dataKey="value" fill="black" barSize={20}>
                                        {ScanData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                        {/* <Legend /> */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>


                            <div className='graph' style={{ background: "#e0e0e0" }}>
                                <h5 className='text-secondary mx-5 mb-3'>Bar Chart - Dox & Box</h5>
                                <ResponsiveContainer >
                                    <BarChart width={600} height={280} data={barvalue} margin={{ right: 45, bottom: 13 }}>
                                        <CartesianGrid />
                                        <XAxis dataKey="Month" />
                                        <YAxis />
                                        <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.8)", borderRadius: "3px" }} />
                                        {/* <Legend /> */}
                                        <Bar dataKey="Active" fill="red" barSize={8} />
                                        {/* <Legend /> */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
        }
        else{
            return (
                <>
                     <div className="dashboardcontainer" >
                <Navbar />
                </div>
                </>
            )
        }
}

export default Dashboard;
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { ProfileDetails, GenerateTwofa, Verify2fa } from "../../api";
import './profile.css'
import { HiUser } from 'react-icons/hi';
import Footer from '../Navbar/Footer'

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [tfadata, setTfadata] = useState([]);
    const [verify, setVerify] = useState('');


    useEffect(() => {
        const profile = async () => {
            const data = await ProfileDetails(localStorage.getItem("CUST_ID"));
            console.log(data)
            setProfile(data);

            const tfadataapi = await GenerateTwofa(data.custname, "Dox And Box");
            setTfadata(tfadataapi)
        }
        profile();
    }, []);

    const handletfatoggle = () => {
        const checkdata = document.getElementById('ckeckboxtfa').checked;
        if (checkdata === true) {
            document.getElementById('tfadiv').style.display = 'flex';
        }
        else {
            document.getElementById('tfadiv').style.display = 'none';
        }
    }

    const handleverify = async (e) => {
        e.preventDefault()
        const inputtoken = document.getElementById('tokeninp').value;
        const vetfytokendata = await Verify2fa(tfadata.secret, inputtoken, localStorage.getItem('CUST_ID'))
        if (vetfytokendata === 'Verify') {
            setVerify(true)
        }
        else if (vetfytokendata === 'NotVerify') {
            setVerify(false)
        }
        else {
            setVerify('')
        }
    }

    return (
        <>
            <div className="TotalProfilediv">
                <Navbar />
                <div className="profile_div">
                    <div className="profile_div_inside">
                        <div className="prof_icon_div">
                            <HiUser className="prof_icon" style={{}} />
                            <h4>{profile.custname}</h4>
                            <h5>Member Since :- {profile.custdoe ? profile.custdoe:'NA'}</h5>
                        </div>
                        <div className="prof_content">
                            <h4>Contact Information</h4>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email </label>
                                    <p>{profile.custemail}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Mobile </label>
                                    <p>{profile.custcontactno ? profile.custcontactno : 'NA'}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address 1 </label>
                                <p>{profile.custadd}</p>
                            </div>
                            <div className="form-group">
                                <label>Address 2</label>
                                <p>{profile.custadd1 ? profile.custadd1 : 'NA'}</p>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Country</label>
                                    <p>{profile.custcountry}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>State</label>
                                    <p>{profile.custstate}</p>

                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>City</label>
                                    <p>{profile.custcity}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Pincode </label>
                                    <p>{profile.custpin}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row mt-4">
                        <label htmlFor="designation" className="col-md-4 col-form-label">2 Factor Authentication </label>
                        <div className="col form-group">
                            <input type="checkbox" className="form-control col-md-1 " id='ckeckboxtfa' onChange={handletfatoggle} style={{ height: "20px", width: "20px", marginTop: "5px" }} />
                        </div>

                    </div>

                    <div className="form-row" id="tfadiv" style={{ display: "none"}}>
                        <div className="col-md form-group" >
                            <img src={tfadata.qr} alt='' /><br />
                            <div className="col form-group" style={{width:"50%",margin:"10px 0" }} >
                                <input type='number' id='tokeninp' className="form-control col-md-7"
                                    placeholder='Enter Token' style={{background:'rgb(255, 254, 254)',border: 'none',boxShadow: '1px 1px 10px 1px rgb(141, 140, 140)'}}/>
                                <button className='btn maroon_btn mx-3'
                                    onClick={handleverify}
                                >Verify</button>
                                {verify === true ?
                                    <h5 style={{ color: "green" }}>Verify</h5>
                                    : verify === false ? <h5 style={{ color: "red" }}>Wrong Token</h5>
                                        : <p></p>}
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
    )
}

export default Profile;
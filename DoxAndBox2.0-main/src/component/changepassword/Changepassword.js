import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'
import './changepass.css'
import svg from '../Images/phoneicon.png'
import { PasswordChange } from '../../api/index'
import { HiLockClosed } from 'react-icons/hi';
import Footer from '../Navbar/Footer'


function Changepassword() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [showpass, setShowpass] = useState(false);
    const [showpass2, setShowpass2] = useState(false);
    const [showpass3, setShowpass3] = useState(false);


    const toggleicon = () => {
        setShowpass(!showpass);
    }
    const toggleicon2 = () => {
        setShowpass2(!showpass2);
    }
    const toggleicon3 = () => {
        setShowpass3(!showpass3);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const uid_id = document.getElementById('userID').value;
        const uid_pass = document.getElementById('userpassword').value;
        const newpassword = document.getElementById('newpassword').value;
        const confirmpassword = document.getElementById('confirmpassword').value;

        if (!uid_id || !uid_pass || !newpassword || !confirmpassword) {
            setMandatoryfield(true)
        }
        else {
            if (newpassword === confirmpassword) {
                const result = await PasswordChange(uid_id, uid_pass, localStorage.getItem('Warehouse_ID'), newpassword);
                if (result === 'PasswordChanged') {
                    alert('Password Changed Successfully')
                    window.location.href = '/Dashboard'
                } else {
                    alert('Invalid User ID or Password')
                }
            }
            else {
                alert('Password does not match')
            }
        }
    }

    return (
        <>
            <div className="changepasscontainer">
                <Navbar />
                <div className='change_password'>
                    <h3 className='pb-3'>Change Your Password <HiLockClosed style={{ margin: "0 0 -9px 0", fontSize: "30px" }} /></h3>
                    <form>
                        <br />
                        <label htmlFor='userID'>User Id <span className='text-danger'>*</span></label>
                        <div className="input-group">
                            <input id="userID" type='text' className="form-control" name="userID" placeholder="UserID" required />
                        </div><br />
                        <label htmlFor='userpassword'>Current Password <span className='text-danger'>*</span></label>
                        <div className="input-group">
                            <span className="input-group-addon" onClick={toggleicon}>
                                {showpass ? <i className="glyphicon glyphicon-eye-open"></i>
                                    : <i className="glyphicon glyphicon-eye-close"></i>}</span>

                            <input id="userpassword" type={showpass ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />
                        </div><br />

                        <label htmlFor='newpassword'>New Password <span className='text-danger'>*</span></label>
                        <div className="input-group">
                            <span className="input-group-addon" onClick={toggleicon2}>
                                {showpass2 ? <i className="glyphicon glyphicon-eye-open"></i>
                                    : <i className="glyphicon glyphicon-eye-close"></i>}</span>
                            <input id="newpassword" type={showpass2 ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />
                        </div><br />
                        <label htmlFor='confirmpassword'>Confirm Password <span className='text-danger'>*</span></label>
                        <div className="input-group">
                            <span className="input-group-addon" onClick={toggleicon3}>
                                {showpass3 ? <i className="glyphicon glyphicon-eye-open"></i>
                                    : <i className="glyphicon glyphicon-eye-close"></i>}</span>

                            <input id="confirmpassword" type={showpass3 ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />

                        </div><br />
                        {
                            mandatoryfield && <p className='text-danger'>Please! fill the mandatory field.</p>
                        }

                        <div className="form-group" >
                            <button type="submit" className="btn dark_btn float-right mb-5 mt-3" onClick={handleClick} id="subnitbtn">Change Password</button>
                            <button className="btn maroon_btn mr-4 float-right mb-5 mt-3" onClick={() => { window.location.href = '/Dashboard' }}>Cancel</button>
                        </div>
                    </form>
                    <div className='svg_div'>
                        <img src={svg} alt='Bg Images'/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Changepassword;
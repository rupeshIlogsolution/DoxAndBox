import React, { useState } from 'react'
import './Login.css'
// import Image from '../../assets/icons/icon-512x5122.png'
import { UserLogin } from '../../api/index'
import loginimg from '../Images/loginimg.svg'
import logo from '../Images/logo.png'
import { RiUserFill, RiLockFill } from 'react-icons/ri';
import { BsEyeFill,BsFillEyeSlashFill } from 'react-icons/bs';
import Footer from '../Navbar/Footer'


function Login() {
	const [showpassword, setShowpassword] = useState(true)
	const [showerror, setShowerror] = useState(false)
	const [mandatorydata, setMandatorydata] = useState(false)

	const handleClickChangeicon = () => {
		setShowpassword(!showpassword)
	}

	const handleClick = async (e) => {
		e.preventDefault()
		const uid_id = document.getElementById('user').value;
		const uid_pass = document.getElementById('password').value;
		if (!uid_id || !uid_pass) {
			setMandatorydata(true)
			setShowerror(false)
		}
		else {
			const result = await UserLogin(uid_id, uid_pass)
			if (result) {

				console.log(result)
				if(result.Requestid){
					console.log(result)
					localStorage.setItem('CUST_ID', result.Custid)
					localStorage.setItem('Wh_name', result.whid)
					// localStorage.setItem('Login_Warehouse_ID', result.WHID)
					localStorage.setItem('User_ID', result.Allotempid)
					localStorage.setItem('User_Name', result.Allotempname)
					localStorage.setItem('Req_id', result.Requestid)
					// localStorage.setItem('Dptname', result.Dptname)
					// localStorage.setItem('Employee',result.uName)	
					window.location.href = '/UserLogindetails'
				}else{
					localStorage.setItem('CUST_ID', result.CUST_ID)
					localStorage.setItem('Warehouse_ID', result.WHID)
					localStorage.setItem('Login_Warehouse_ID', result.WHID)
					localStorage.setItem('User_ID', result.UID)
					localStorage.setItem('User_Name', result.cust_name)
					localStorage.setItem('Wh_name', result.uwh)
					localStorage.setItem('Dptname', result.Dptname)
					localStorage.setItem('Employee',result.uName)	
					 window.location.href = '/Dashboard'
			}
			}
			else {
				setShowerror(true)
				setMandatorydata(false)
			}
		}
	}
	return (
		<>
			<div className="logincontainer" >
				<div className='login_div'>
					<div className='login_img_div'>
						<img src={loginimg} />
						<p style={{ marginTop: "40px", color: "white", fontSize: "25px" }}>Sign In to Explore Dox & Box</p>
						<hr style={{background:"white",marginTop:"-16px"}}/>
					</div>
					<div className='login_content_div'>
						<form className='login_box'>
							<div className="logo">
								<img src={logo} style={{ margin: "15px 45px " }} />
								<h1 style={{ color: "rgb(47, 47, 47)" }}>DOX - Analytics</h1>
							</div>
							<div>
								<label>Username</label><br />
								<div className='inputs'>
									<RiUserFill style={{ fontSize: "30px" }} required />
									<input id="user" type="email" name="user" autocomplete="off"/>
								</div>
							</div>
							<div style={{ marginTop: "10px" }}>
								<label>Password</label><br />
								<div className='inputs'>
									<RiLockFill style={{ fontSize: "30px" }} required />
									<input type={showpassword ? 'password' : 'text'} id="password" name="password" />
								</div>
							</div>
							<div onClick={handleClickChangeicon} style={{ display: "flex", cursor: "pointer", marginTop: "10px" }}>
								<p >Show Password</p>
								{showpassword ? <BsFillEyeSlashFill style={{ margin: "2px", fontSize: "20px", color: "rgb(47, 47, 47)" }} />
								:<BsEyeFill style={{ margin: "2px", fontSize: "20px", color: "rgb(47, 47, 47)" }} />}
								
							</div>
							{mandatorydata ? <p style={{ color: "red" }}>Please! Fill the mandatory field...</p> : null}
							{showerror ? <p style={{ color: "red" }}>Invalid UserId & Password</p> : null}
							<button  onClick={handleClick}>LOGIN</button>
						</form>
					</div>
				</div>
				
			</div>
			<Footer/>
		</>
	)
}

export default Login

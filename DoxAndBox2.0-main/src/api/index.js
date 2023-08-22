import axios from 'axios';

export const UserLogin = async (uid_id,uid_pass) => {
    const url = `https://portalbackend.doxandbox.com/api/UserLogin`
    return axios.post(url, {uid_id,uid_pass}).then(response => response.data).catch(error => console.log(error));
}

export const PasswordChange = async (uid_id,uid_pass,whid,new_password) => {
    const url = `https://portalbackend.doxandbox.com/api/userpasswordchange`
    return axios.post(url, {uid_id,uid_pass,whid,new_password}).then(response => response.data).catch(error => console.log(error));
}

export const ProfileDetails = async (uid_id) => {
    const url = `https://portalbackend.doxandbox.com/api/profiledetails`
    return axios.post(url, {uid_id}).then(response => response.data).catch(error => console.log(error));
}

export const rmsReports = async (reportType,custId,Whid,startDate,endDate,department) => {
    const url = `https://portalbackend.doxandbox.com/api/reports`
    return axios.post(url, {reportType,custId,Whid,startDate,endDate,department}).then(response => response.data).catch(error => console.log(error));
}

export const rmsRequest = async (request_type,location,noof_files,request_date,request_time,file_name,retrival_type,delivery_type,noof_pages,onsite,activity,remark,entry_by,FILEID,WHID,requestid,custid,TYPE,Contactperson,Personno,Deparment,Boxno,DESCN,Bookingid,city) => {
    console.log(request_type,location,noof_files,request_date,request_time,file_name,retrival_type,delivery_type,noof_pages,onsite,activity,remark,entry_by,FILEID,WHID,requestid,custid,TYPE,Contactperson,Personno,Deparment,Boxno,DESCN,Bookingid)

    const url = `https://portalbackend.doxandbox.com/api/request`
    return axios.post(url, {request_type,location,noof_files,request_date,request_time,file_name,retrival_type,delivery_type,noof_pages,onsite,activity,remark,entry_by,FILEID,WHID,requestid,custid,TYPE,Contactperson,Personno,Deparment,Boxno,DESCN,Bookingid,city}).then(response => response.data).catch(error => console.log(error));
}

export const ReportData = async (uid_id,location_id,department) => {
    const url = `https://portalbackend.doxandbox.com/api/reportdata`
    return axios.post(url, {uid_id,location_id,department}).then(response => response.data).catch(error => console.log(error));
}

export const Mail = async (requestData) => {
    // console.log(requestData)
    const url = `https://portalbackend.doxandbox.com/api/mail`
    return axios.post(url, {requestData}).then(response => response.data).catch(error => console.log(error));
}

export const Totallocation = async (custid) => {
    const url = `https://portalbackend.doxandbox.com/api/totallocation`
    return axios.post(url,{custid}).then(response => response.data).catch(error => console.log(error));
}

export const Dashboardetails  = async (CUSTID,wh) => {
    const url = `https://portalbackend.doxandbox.com/api/dashboardetails`
    return axios.post(url, {CUSTID,wh}).then(response => response.data).catch(error => console.log(error));
}

export const ShreddingDupliacte  = async (files,CUSTID,WH) => {
    const url = `https://portalbackend.doxandbox.com/api/shreddingduplicate`
    return axios.post(url, {files,CUSTID,WH}).then(response => response.data).catch(error => console.log(error));
}

export const ReportdataBoxes = async (uid_id,location_id,department) => {
    const url = `https://portalbackend.doxandbox.com/api/reportdataboxes`
    return axios.post(url, {uid_id,location_id,department}).then(response => response.data).catch(error => console.log(error));
}

export const Dashboardrequest = async () =>{
    const url = `https://portalbackend.doxandbox.com/api/bargraph`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const DashbaordetailsPie = async (CUSTID,wh) =>{
    const url = `https://portalbackend.doxandbox.com/api/piegraph`
    return axios.post(url,{CUSTID,wh}).then(response => response.data).catch(error => console.log(error));
}

export const RequestReport = async (cust_id,request_type) => {
    const url = `https://portalbackend.doxandbox.com/api/requestreport`
    return axios.post(url, {cust_id,request_type}).then(response => response.data).catch(error => console.log(error));
}

export const BoxReports = async (Boxno,CUSTID,WH) => {
    const url = `https://portalbackend.doxandbox.com/api/boxreport`
    return axios.post(url, {Boxno,CUSTID,WH}).then(response => response.data).catch(error => console.log(error));
}

export const GenerateTwofa = async (email,org) => {
    console.log(email,org)
    const url = `https://portalbackend.doxandbox.com/api/Twofa`
    return axios.post(url, {email,org}).then(response => response.data).catch(error => console.log(error));
}

export const Verify2fa = async (secret, otp,userid) => {
    console.log(secret,otp,userid)
    const url = `https://portalbackend.doxandbox.com/api/VerifyTwo`
    return axios.post(url, { secret,otp,userid }).then(response => response.data).catch(error => console.log(error));
}

export const TotalScanReportCount = async (custid,wh,startdate,enddate) => {
    console.log(custid,wh,startdate,enddate)
    const url = `https://portalbackend.doxandbox.com/api/totalscanreportcount`
    return axios.post(url, {custid,wh,startdate,enddate}).then(response => response.data).catch(error => console.log(error));
}

export const IdCount = async (whid) => {
    const url = `https://portalbackend.doxandbox.com/api/idcount`
    return axios.post(url, {whid}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateIdCount = async (whid,Idcount) => {
    const url = `https://portalbackend.doxandbox.com/api/updateidcount`
    return axios.post(url, {whid,Idcount}).then(response => response.data).catch(error => console.log(error));
}

export const dashbaorScannedPages = async (custid,whid) =>{
    const url = `https://portalbackend.doxandbox.com/api/dashbaorscannedpages`
    return axios.post(url,{custid,whid}).then(response => response.data).catch(error => console.log(error));
}

export const DepartmentData = async (uid_id,location_id) =>{
    const url = `https://portalbackend.doxandbox.com/api/departmentdata`
    return axios.post(url,{uid_id,location_id}).then(response => response.data).catch(error => console.log(error));
}

export const FileUpload = async (images) => {
    const url = `https://portalbackend.doxandbox.com/api/FileUpload`
    return axios.post(url, images).then(response => response.data).catch(error => console.log(error));
}


export const lastcount = async (whid) => {
    const url = `https://portalbackend.doxandbox.com/api/lastcount`
    return axios.post(url, {whid}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCount = async (whid,Idcount) => {
    const url = `https://portalbackend.doxandbox.com/api/updatecount`
    return axios.post(url, {whid,Idcount}).then(response => response.data).catch(error => console.log(error));
}

export const insertscannerportaldetails = async (Requestid,Requesttype,StartReading,Endreading,Arriveddate,ArrivedTime,Imagelink,Totalpagesscan,Remarks,EntryBy,Noboxes,Nooffiles,Activity,Portalid,Assetid,Assetname,ActivityGLcode,username) => {
    const url = `http://localhost:8008/api/insertscannerportaldetails`
    return axios.post(url, {Requestid,Requesttype,StartReading,Endreading,Arriveddate,ArrivedTime,Imagelink,Totalpagesscan,Remarks,EntryBy,Noboxes,Nooffiles,Activity,Portalid,Assetid,Assetname,ActivityGLcode,username}).then(response => response.data).catch(error => console.log(error));
}

export const scannerportaldatamorethanone = async (EntryBy,Arriveddate,Requesttype,Requestid) => {
    const url = `https://portalbackend.doxandbox.com/api/scannerportaldatamorethanone`
    return axios.post(url, {EntryBy,Arriveddate,Requesttype,Requestid}).then(response => response.data).catch(error => console.log(error));
}

export const totalportalrequest = async (EntryBy,requesttype) => {
    const url = `https://portalbackend.doxandbox.com/api/totalportalrequest`
    return axios.post(url, {EntryBy,requesttype}).then(response => response.data).catch(error => console.log(error));
}

export const totalscannerdetails = async (Requestid) => {
    const url = `https://portalbackend.doxandbox.com/api/totalscannerdetails`
    return axios.post(url,{Requestid}).then(response => response.data).catch(error => console.log(error));
}

export const getportalrequest = async (Portalid) => {
    const url = `https://portalbackend.doxandbox.com/api/getportalrequest`
    return axios.post(url,{Portalid}).then(response => response.data).catch(error => console.log(error));
}

export const updateportalrequest = async (Endreading,Totalpagesscan,Noboxes,Nooffiles,Activity,Remarks,Portalid) => {
    const url = `https://portalbackend.doxandbox.com/api/updateportalrequest`
    return axios.post(url,{Endreading,Totalpagesscan,Noboxes,Nooffiles,Activity,Remarks,Portalid}).then(response => response.data).catch(error => console.log(error));
}

export const Activityrequest = async () => {
    const url = `https://portalbackend.doxandbox.com/api/activityrequest`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}

export const Requestidforuser = async (empid,reqtype) => {
    const url = `https://portalbackend.doxandbox.com/api/requestidforuser`
    return axios.post(url,{empid,reqtype}).then(response => response.data).catch(error => console.log(error));
}


export const fileuploadindb = async (portalid,requestid,custid,Imagelink,EntryBy) => {
    const url = `https://portalbackend.doxandbox.com/api/fileuploadindb`
    return axios.post(url, {portalid,requestid,custid,Imagelink,EntryBy}).then(response => response.data).catch(error => console.log(error));
}

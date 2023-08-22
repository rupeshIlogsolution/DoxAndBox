import './App.css';
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './component/Login/Login';
import Dashboard from './component/Dashboard/Dashboard';
import RecordPickup from './component/Request/RecordPickup/RecordPickup';
import RecordRetrival from './component/Request/RecordRetrival/RecordRetrival';
import ScanningRequest from './component/Request/ScanningRequest/ScanningRequest';
import Shredding from './component/Request/Shredding/Shredding';
import OtherRequest from './component/Request/Other/OtherRequest';
import ScanningReports from './component/Response/ScanningReports/ScanningReports';
import InwardReports from './component/Response/InwardReports/InwardReports';
import RetrivalReports from './component/Response/RetrivalReport/RetrivalReport';
import StockReports from './component/Response/StockReports/StockReports';
import Profile from './component/Profile/Profile';
import PrivatRoute from './component/HOC/PrivateRoute';
import Changepassword from './component/changepassword/Changepassword';
import RecorRetrival from './component/Response/RecordRetrival/RecordRetrival'
import PickupReports from './component/Response/PickupReports/PickupReport';
import OtherReport from './component/Response/OtherRequestReport/OtherRequest';
import ShreddingRequest from './component/Response/ShreddingReports/ShreddingRequest';
import ScanningRequestReport from './component/Response/ScanningRequestReport/ScanningRequest';
import BoxReport from './component/Response/BoxReport/Boxreport'
import ScanningBasicdetails from './component/Users/ScanningBasicdetails';
import PickupBasicdetails from './component/Users/PickupBasicDetails';
import UserLogindetails from './component/Users/UserLogindetails';
import UpdateScanningBasicdetails from './component/Users/UpdateScanningBasicdetails';
import UpdatePickupBasicDetails from './component/Users/UpdatePickupBasicDetails';
// import PagenotFound from './component/Home/Home';

function App() {
  return (
    <>
        <Router>
                <Route path="/" exact component={Login}/>
                <PrivatRoute path="/Profile" exact component={Profile}/>
                <PrivatRoute path="/Dashboard"   component={Dashboard} />
                <PrivatRoute path="/RecordPickup"   component={RecordPickup}/>
                <PrivatRoute path="/RecordRetrival"  component={RecordRetrival}/>
                <PrivatRoute path="/ScanningRequest"   component={ScanningRequest}/>
                <PrivatRoute path="/Shredding"   component={Shredding}/>
                <PrivatRoute path="/OtherRequest"   component={OtherRequest}/>
                <PrivatRoute path="/ScanningReports"   component={ScanningReports}/>
                <PrivatRoute path="/InwardReports"   component={InwardReports}/>
                <PrivatRoute path="/RetrivalReports"   component={RetrivalReports}/>
                <PrivatRoute path="/StockReports"   component={StockReports}/>
                <PrivatRoute path="/Changepassword"   component={Changepassword}/>
                <PrivatRoute path="/RecorRetrivalReport"   component={RecorRetrival}/>
                <PrivatRoute path="/RecordPickupReport"   component={PickupReports}/>
                <PrivatRoute path="/OtherRequestReport"   component={OtherReport}/>
                <PrivatRoute path="/ShreddingRequestReport"   component={ShreddingRequest}/>
                <PrivatRoute path="/ScanningRequestReport"   component={ScanningRequestReport}/>
                <PrivatRoute path="/BoxReport"   component={BoxReport}/>
                <PrivatRoute path="/ScanningBasicDetails"   component={ScanningBasicdetails}/>
                <PrivatRoute path="/PickupBasicdetails"   component={PickupBasicdetails}/>
                <PrivatRoute path="/UserLogindetails"   component={UserLogindetails}/>
                <PrivatRoute path="/updatescanningbasicdetails"   component={UpdateScanningBasicdetails}/>
                <PrivatRoute path="/updatepickupbasicdetails"   component={UpdatePickupBasicDetails}/>

                {/* <Route path="*"  exact component={PagenotFound}/> */}
             
        </Router>
    </>
  );
}

export default App;

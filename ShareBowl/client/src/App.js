import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./component/Home/Home"
import SignUpIn from './component/Authentication/SignUpIn';
import Activate from "./component/Authentication/Activate.js"
import Welcome from "./component/Welcome/Welcome.js"
import ResetPw from "./component/Authentication/ResetPw.js"
import ForgotPw from  "./component/Authentication/ForgotPw.js"
import { useSelector } from 'react-redux';
import CheckActivate from './component/Authentication/CheckActivate';
import ChangePassword from './component/Authentication/ChangePassword';
import Organize  from './component/Organize/Organize';
import Navbar from './component/Navbar/Navbar';
import  Logout from './component/Authentication/Logout'
import OrganizerSignUp from './component/Authentication/OrganizerSignUp';
import NotFound from './component/Error/NotFound';
import CheckForget from './component/Authentication/CheckForget';
import OrganizeHome from './component/Organize/OrganizeHome';
import ActivateCompany from './component/Authentication/ActivateCompany';
import ChangeCompanyPassword from './component/Authentication/ChangeCompanyPassword';
import Product from './component/Product/Product';
import SuccessfulLogout from './component/Authentication/SuccessfulLogout';
import Settings from './component/Dashboard/Settings';
import Inventory from './component/Dashboard/Inventory';
import Orders from './component/Dashboard/Orders';
import Update from './component/Dashboard/Update';
import Browse from './component/Browse/Browse';
import React, {useEffect, useState} from 'react';  
import ConfirmRegistration from './component/Cart/ConfirmRegistration';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const {isAuthenticated, user} = useSelector(state=>state.user)
  const navLink = user?.role === 'company' ? "/organize" : "/organize/home";

  
  return (
   <div>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* //check if activated */}
        {isAuthenticated && !user.isActivated &&  <Route exact path = '/checkActivate' element = {<CheckActivate/>}/> }
        <Route exact path = '/' element = {<Welcome/>}/>
        <Route exact path = '/home' element = {<Home/>}/>
        <Route exact path = '/browse' element = {<Browse/>}/>
        <Route exact path = '/organize/home' element = {<OrganizeHome/>}/>
        {/* //Listing page only for organizers */}
        {
          user?.role === 'company' ?
          <Route exact path ='/organize' element = {<Organize/>}/>
          :
          <Route exact path ='/organize' element = {<OrganizeHome/>}/>

        }
        <Route exact path = '/organizer/register' element={<OrganizerSignUp/>}/>
        <Route exact path = '/checkForget' element = {<CheckForget/>}/>
        <Route exact path = '/signin' element = {<SignUpIn/>}/>
        <Route exact path = '/logout' element = {<Logout/>}/>
        <Route exact path='/logout/successful' element={<SuccessfulLogout/>}/>
        {user?.role =="user" && <Route exact path = '/api/v1/account/activate/:token' element = {<Activate/>}/>}
        {user?.role =="company" && <Route exact path = '/api/v1/company/account/activate/:token' element = {<ActivateCompany/>}/>}
        <Route exact path = '/api/v1/password/forgot/' element = {<ForgotPw/>}/>
        <Route exact path = '/api/v1/password/reset/:token' element = {<ResetPw/>}/>
        {user?.role =="user" && <Route exact path = '/changePassword' element={<ChangePassword/>}/>}
        {user?.role =="company" && <Route exact path = '/changeCompanyPassword' element={<ChangeCompanyPassword/>}/>}

        <Route exact path ="/product/:id" element={<Product/>}/>
        {user?.role ==="user" && <Route exact path='/confirm' element={<ConfirmRegistration/>}/>}
        {user?.role =="company" &&<Route exact path='/update/:id' element={<Update/>}/>}
        

        {
          isAuthenticated && user?.role === "company" &&
         <>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </>
        }
        
        <Route path='settings' element={<Settings/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    </ThemeProvider>
   </div>
  )
}

export default App;

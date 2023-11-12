// import { Paper,Container, TextField, Grid, Button } from '@mui/material'
// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// import Steps from './Steps'



// import {
//     ADD_TO_CART,
//     REMOVE_FROM_CART,
//     SAVE_SHIPPING_INFO,
//     UPDATE_CART,
//     SHOW_CART_ITEMS,
//     CLEAR_ERRORS
// }from "../../constants/cartConstants"
// import { useDispatch } from 'react-redux'

// const Shipping = () => {
//     const [fName, setfName] = useState("")
//     const [lName, setlName] = useState("")
//     const [address1, setAddress1] = useState("");
//     const [address2, setAddress2] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState]= useState("")
//     const [zip, setZip] = useState();
//     const [phoneNumber, setPN] = useState();

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const formRef = React.useRef();
    

//     const handleSubmit = (e) => {
//         dispatch({
//             type:SAVE_SHIPPING_INFO,
//             payload:{
//                 firstName:fName,
//                 lastName:lName,
//                 address:address1,
//                 city:city,
//                 state:state,
//                 zip:zip,
//                 phoneNo:phoneNumber
//             }
//         })
//         navigate("/payment")

//     }
//   return (
//     <Container className='max-w-2xl'>
//     <Steps activeSteps={0}/>
//       <Paper elevation={3} className="flex-col p-10 align-middle mb-10">
//         <div className='p-[20px] mb-[20px] text-center gap-[30px]'>
//             <p>Shipping Address</p>
//                 </div>
//             <form action="" ref={formRef} onSubmit={handleSubmit}>
//                 <Grid container spacing ={2} className='gap-[30px]'>
//                     <div className='grid grid-cols-2 gap-[30px]'>
//                         <TextField required label="First Name"  value={fName} onChange = {(e)=>{setfName(e.target.value)}}/>
//                         <TextField required label="Last Name" value={lName} onChange = {(e)=>{setlName(e.target.value)}}/>
//                     </div>
//                     <TextField required fullWidth label="Address Line 1" value={address1} onChange = {(e)=>{setAddress1(e.target.value)}}/>
//                     {/* <TextField fullWidth label="Address Line 2" value={address2} onChange = {(e)=>{setAddress2(e.target.value)}}/> */}
//                     <TextField required fullWidth label="City" value={city} onChange = {(e)=>{setCity(e.target.value)}}/>
//                     <TextField required fullWidth label="State" value={state} onChange = {(e)=>{setState(e.target.value)}}/>
//                     <div className='grid grid-cols-2 gap-[30px]'>
//                         <TextField required fullWidth label="Zip Code" value={zip} onChange = {(e)=>{setZip(e.target.value)}}/>
//                         <TextField required fullWidth label="Phone Number" value={phoneNumber} onChange = {(e)=>{setPN(e.target.value)}}/>
//                     </div>
//                 </Grid>
//                 <div className='mb-5 mt-3'>
//                     <Button className="text-white bg-[#658864] normal-case float-right" onClick={handleSubmit}>Next</Button>
//                     </div>
//                 </form>
//             </Paper>

//             </Container>
//   )
// }

// export default Shipping
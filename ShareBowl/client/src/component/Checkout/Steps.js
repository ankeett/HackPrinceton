// import { Typography } from '@mui/material'
// import React from 'react'
// import {LocalShipping, LibraryAddCheck, AccountBalance} from "@mui/icons-material"
// import {Stepper, Step, StepLabel} from "@mui/material"

// const CheckoutSteps = ({activeSteps}) => {
//     const steps = [
//         {
//             label:<Typography>Shipping Details</Typography>,
//             icons: <LocalShipping/>
//         },
//         {
//             label:<Typography>Payment</Typography>,
//             icons:<AccountBalance/>
//         },
//         {
//             label:<Typography>Confirm Order</Typography>,
//             icons: <LibraryAddCheck/>

//         },
        
//     ]

//     const stepStyles = {
//         boxSizing:"border-box",
//     };
//   return (
//     <>
//         <Stepper alternativeLabel activeSteps = {activeSteps} style = {stepStyles}>
//             {steps.map((item, index)=> (
//                 <Step
//                     key = {index}
//                     active = {activeSteps === index ? true:false}
//                     completed = {activeSteps >= index ? true:false}
//                 >
//                     <StepLabel
//                         style={{
//                             color: activeSteps >= index ? "green" : "rgba(0, 0, 0, 0.649)",
//                         }}
//                                 icon = {item.icons}>{item.label}</StepLabel>


//                 </Step>
//             ))}

//         </Stepper>

//     </>
//   )
// }

// export default CheckoutSteps
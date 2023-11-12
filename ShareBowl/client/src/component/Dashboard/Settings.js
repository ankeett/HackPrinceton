import { TextField,Button,Container,Paper } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../../MetaData'

const Settings = () => {
  const {user} = useSelector(state=>state.user);
  return (
    <>
    <MetaData title = "Profile"/>
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} className="flex flex-col align-middle p-10">
      <h1 className="text-2xl font-semibold ">Profile</h1>
      <div className='flex flex-col justify-center text-center w-[300px] gap-4 mt-10'>
        <TextField value={user.name} helperText="Name" className='decoration-black' disabled/>
        <TextField  value={user.email} helperText="Email" className='decoration-black' disabled/>
        <TextField value="*********" helperText="Password" className='decoration-black' disabled/>

        <p>--Options--</p>

        <div className='flex flex-col gap-[30px]'>
          {user.role === "company" ?
              <div className='flex flex-row justify-between'>
                <a href='/inventory'><Button className='w-32 text-white bg-[#658864] normal-case hover:scale-105'>Your Events</Button></a>
                <a href='/orders'><Button className='w-32 text-white bg-[#658864] normal-case hover:scale-105'>Check Status</Button></a>
              </div>
            :
            <></>
          }
          <div className='flex flex-row justify-between'>
                {user.role === "company"?
                <a href='/changeCompanyPassword'><Button className='text-white bg-[#658864] normal-case hover:scale-105'>Change Password</Button></a>
                :      <a href='/changePassword'><Button className='text-white bg-[#658864] normal-case hover:scale-105'>Change Password</Button></a>}
          <a href='/api/v1/password/forgot/'><Button className='text-white bg-[#658864] normal-case hover:scale-105'>Forgot Password</Button></a>
          </div>
        </div>

        
        
        <a href='/logout'><Button className='text-white bg-[#658864] normal-case hover:scale-105'>Logout</Button></a>
     


        </div>
      </Paper>
    </Container>

      
    </>
  )
}

export default Settings
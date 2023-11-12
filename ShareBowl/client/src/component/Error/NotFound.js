import { CardMedia,Paper,Grid,Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../MetaData';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
    <MetaData title = "Not Found"/>
    <Grid container component="main" className='items-center justify-center' >
  <Paper  className=' shadow-none max-w-3xl'>
      <CardMedia className='object-contain'
                    component="img"
                    height={300}
                    width={10}
                    image={require('../../images/404.png')}
                    alt="Construction"
                />
    <h2 className='text-center'>Not Found!</h2>
        <p className='text-center'>The page you are looking for isn't available.</p>
        <Button onClick={()=>{navigate('/home')}} fullWidth className='text-white bg-[#658864] rounded-lg normal-case'>Go to HomePage</Button>
    </Paper>
    </Grid>
    </>
  )
}

export default NotFound
import {Container,Paper, Typography,CardMedia} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout,loadUser } from '../../actions/userActions';

const SuccessfulLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isAuthenticated, user} = useSelector(state=>state.user);
    
    useEffect(()=>{
        dispatch(logout());
        dispatch(loadUser());
     
    },[dispatch, isAuthenticated])

  return (
    <div>
        <Container component = 'main' maxWidth ='xs'>
            <Paper elevation={3} className="flex-col align-middle p-10">
                <CardMedia
                    component="img"
                    height="230"
                    image={require('../../images/logout.png')}
                    alt="Buy"
                />
                <div className='p-[20px]  mb-[20px] text-center'>
                    <Typography>Thank You!</Typography>
                </div>
                
                <Typography>You have successfully logged out from the system.</Typography>
                <Typography className='text-center'>Redirecting...</Typography>
                

            </Paper>
        </Container>

    </div>
  )
}

export default SuccessfulLogout
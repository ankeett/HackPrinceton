import {Container,Paper, Typography,CardMedia} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout,loadUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

const Logout = () => {
    const dispatch = useDispatch();
    const {isLoading, isAuthenticated, user} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const handleYes = ()=>{
        navigate('/logout/successful');
    }
    const handleNo = () => {
        navigate(-1);
    }
    
  return (
    <div>
        <Container component = 'main' maxWidth ='xs'>
            <Paper elevation={3} className="flex-col align-middle p-10">
                <CardMedia
                    component="img"
                    image={require('../../images/logout.png')}
                    alt="logout"
                />
                <div className='p-[20px]  mb-[20px] text-center'>
                    <Typography>Do you really want to Log Out?</Typography>
                </div>
                <div className='flex flex-row items-center justify-center gap-[30px]'>
                <Button variant="outline-success" onClick={handleYes}>Sure</Button>
                <Button variant="outline-danger" onClick={handleNo}>Cancel</Button>
                </div>
            </Paper>
        </Container>

    </div>
  )
}

export default Logout
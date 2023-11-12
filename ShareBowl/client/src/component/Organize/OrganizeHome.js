import { Grid,Paper,CardMedia,Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout,loadUser } from '../../actions/userActions';

const OrganizeHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, isAuthenticated, user} = useSelector(state=>state.user);


  const handleSignUp = () => {
    
    //it doesn't navigate to seller/register if it is already signed in, it goes to home
    dispatch(logout());
    window.location.replace('/organizer/register')

    //navigate('/seller/register')
  }
  const handleSignIn = () => {
    //TODO logout first then sign in
    if (isAuthenticated){
      dispatch(logout());
    }
    window.location.replace('/signin')
  }
  
  
  return (
    <Grid container component="main" className='items-center justify-center' >
  <Paper  className=' shadow-none max-w-3xl'>
    <h2 className='text-center'>Welcome to ShareBowl Organizer!</h2>
      <CardMedia className='object-contain'
                    component="img"
                    height={300}
                    width={10}
                    image={require('../../images/seller.png')}
                    alt="Construction"
                />
        <p className='text-center'>Let's get you signed in as an organizer and start organizing with ShareBowl.</p>
        <div className='flex flex-col mt-16 gap-8 align-middle justify-center'>
        <Button fullWidth onClick={handleSignIn} className='text-white bg-[#658864] rounded-lg normal-case'>Sign In</Button>
        <Button fullWidth onClick={handleSignUp} className='text-white bg-[#658864] rounded-lg normal-case'>Sign Up as an Organizer</Button>
        </div>

    </Paper>
    </Grid>
  )
}

export default OrganizeHome
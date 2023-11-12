import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  clearErrors, login, register } from '../../actions/userActions';
import { Grid, Paper, Typography, TextField, Button, InputAdornment,IconButton,Container  } from '@mui/material';
import  LockRoundedIcon from '@mui/icons-material/LockRounded';
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import ForgotPw from './ForgotPw';
import { loginCompany } from '../../actions/companyAction';
import MetaData from '../../MetaData';
import InstantMessage from '../Error/InstantError';
const SignUpIn = () => {
  const formRef = React.useRef();
  const dispatch = useDispatch();
  
  //state values for register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [hasErrors, setHasErrors]= useState("");

  //state if the user wants to register or sign in
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const switchMode = () => {
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
    }
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);
    const navigate = useNavigate();
    const {error, isLoading, isAuthenticated, user } = useSelector(state => state.user);
    //handleSubmit for both logn and register
    const handleSubmit= (e) => {
        e.preventDefault();
        formRef.current.reportValidity()
        if(isSignUp){
            if(pw!=cpw){
                //alert('Passwords do not match');
                setHasErrors('Passwords do not match');
            }
            else{
                dispatch(register(name, email, pw));
            }
        }
        else{
            dispatch(login(email, pw));
        }
    }
  useEffect(() => {
    if (error){
      
      // dispatch(clearErrors());
    }

    if (isAuthenticated && user.isActivated){
      navigate("/home")
    }
    else if (isAuthenticated){
      navigate("/checkActivate")
    }

    if (hasErrors!==''){
      const timeout = setTimeout(() => {

     setHasErrors('');

      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }

    
    
  }, [isAuthenticated, user, dispatch, error, hasErrors])
  

  return (
    <div>
      {/* login form */}
      <MetaData title = "Join for a Bowl"/>
      <Container component="main" maxWidth='xs'>
        <Paper elevation={3} className="flex-col align-middle p-10">
            <div className='p-[20px] mb-[20px] text-center'>
                <LockRoundedIcon/>
                <Typography>{isSignUp ? "Join for a Bowl" : "Pick a Bowl"}</Typography>
            </div>

            <form action="" ref={formRef} onSubmit={handleSubmit}>
                <Grid container spacing ={2} className='gap-[30px]'>
                    {
                        isSignUp &&(
                            <>
                                <TextField type="text" name="name" id="name" label="Name" autoFocus required fullWidth onChange={(e)=>{setName(e.target.value)}}/>

                            </>
                        )
                    }
                    <TextField required label="Email" type="email" name="email" inputProps={{
    autocomplete: 'new-password',
    form: {
      autocomplete: 'off',
    },
  }} id="lemail" fullWidth autoFocus onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField required={true} label="Password" name="password"  id="pw"  fullWidth onChange={(e)=>{setPw(e.target.value)}} type={showPassword ?"text":"password"}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}                  
                    /> 

                {isSignUp === false && 
                <>
                <Link to='/api/v1/password/forgot/' component={<ForgotPw/>}>Forgot Password?</Link>
                </>
            }   
          {isSignUp && (
            <>
                <TextField label="Confirm Password" type="password" name="cpassword" id="cpw"  onChange={(e)=>{setCpw(e.target.value)}} required fullWidth/>
            </>
          )}
        </Grid>

        <div className='flex flex-col mt-16 gap-4 align-middle justify-center'>
            <Button onClick={handleSubmit} className='text-white bg-[#658864] rounded-lg normal-case hover:scale-105'>{isSignUp ? 'Sign Up':'Sign In'}</Button>
            <Button onClick={switchMode} className='text-white bg-[#658864] rounded-lg normal-case hover:scale-105'>{isSignUp ? "Already have an account? Pick a Bowl" : "Don't have an account? Join for a Bowl"}</Button>
            {
              isSignUp && (
                <>
                {/* <Button onClick={handleSwitchRole} className='text-white bg-[#658864] rounded-lg normal-case'>Sign Up as a Seller</Button> */}
                <Link to='/organizer/register'>Join as ShareBowl Organizer</Link>
                </>
              )
            }
        </div>
        </form>
        </Paper>
      </Container>

      {
      error ?  <InstantMessage severity= "error" message = {error}/> : ''
      }

      {
        hasErrors?  <InstantMessage severity= "error" message = {hasErrors}/> : ''
      }
      
      
    </div>
  )
}
export default SignUpIn

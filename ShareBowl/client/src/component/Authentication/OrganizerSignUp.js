import React,{useState,useEffect,useRef} from 'react'
import { Grid, Paper, Typography, TextField, Button, InputAdornment,IconButton,Container, filledInputClasses  } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {registerCompany, clearErrors} from '../../actions/companyAction';
import  LockRoundedIcon from '@mui/icons-material/LockRounded';
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PhoneInput from 'react-phone-number-input';
import CustomPhoneNumber from '../Phone/PhoneNumber'
import 'react-phone-number-input/style.css'
import Geocode from "react-geocode";
import MetaData from '../../MetaData';
import InstantMessage from '../Error/InstantError';

const OrganizerSignUp = () => {
    const {error, isLoading, isAuthenticated, user } = useSelector(state => state.user);

    Geocode.setApiKey('AIzaSyB6212bDmstvwdAx-RlpqG5AooLW46yyew');
    Geocode.setLocationType("ROOFTOP");

    const Location = () =>{
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        })
        if(!lat){
            alert('Location Permission denied! Try Again')
        }
        Geocode.fromLatLng(lat, long).then(
            (response) => {
              const address = response.results[0].formatted_address;
              setAddress(address);
            },
            (error) => {
              console.error(error);
            }
        );
    }
    const dispatch = useDispatch();

    //state values for register
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [cpw, setCpw] = useState("");
    const [company, setCompany] = useState("");
    const [phone,setPhone] = useState("");
    const [lat,setLat] = useState();
    const [long, setLong] = useState();
    const [address, setAddress] = useState("");
    const [url, setUrl] = useState();
    const [hasErrors, setHasErrors]= useState("");


     //state if the user wants to register or sign in
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);
    const formRef = useRef();
    //handleSubmit for both logn and register
    const handleSubmit= (e) => {
        e.preventDefault();
        formRef.current.reportValidity()
        if(pw!==cpw){
            //alert('Passwords do not match');
            setHasErrors("Passwords do not match")
        }
        else{
          Geocode.fromAddress(address).then(
            (response) => {
              const {lat,lng} = response.results[0].geometry.location;
              setLat(lat)
              setLong(lng)
             
              dispatch(registerCompany(company,email,pw,phone,lat,long,url));

            },
            (error) => {
              console.error(error);
            }
          );
        }
    }


    const navigate = useNavigate();
    const handleSwitchRole = ()=>{
        navigate('/signin');
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)

       

    }

    useEffect(() => {


        if (error){
          // alert(error);
          // setHasErrors(error);
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
        <MetaData title = "Join as a ShareBowl Organizer"/>
        <Container component="main" maxWidth='xs'>
        <Paper elevation={3} className="flex-col align-middle p-10">
            <div className='p-[20px] mb-[20px] text-center'>
                <LockRoundedIcon/>
                <Typography>ShareBowl Organizer</Typography>
            </div>
            

            <form ref={formRef} action="" onSubmit={handleSubmit}>
                
                <Grid container spacing ={2} className='gap-[30px]'>
                    <TextField label="Company Name" type="name" name="company" inputProps={{
    autocomplete: 'new-password',
    form: {
      autocomplete: 'off',
    },
  }}  autoFocus id="company"  onChange={(e)=>{setCompany(e.target.value)}} required fullWidth/>
                    <TextField label="Email" required type="email" name="email" id="email" inputProps={{
    autocomplete: 'new-password',
    form: {
      autocomplete: 'off',
    },
  }} value={email} fullWidth  onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField label="Password" required name="password" id="pw"  value={pw}  fullWidth onChange={(e)=>{setPw(e.target.value)}} type={showPassword ?"text":"password"}
                        InputProps={{
                            autocomplete: 'new-password',
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
                <TextField label="Confirm Password" type="password" name="cpassword" id="cpw"  onChange={(e)=>{setCpw(e.target.value)}} required fullWidth/>
                <PhoneInput className='w-[800px]'placeholder="Enter your phone number" value={phone} onChange={setPhone} country="US" inputComponent={CustomPhoneNumber}/> 
                <TextField required fullWidth label="Address" name='address' type='text' value={address} onChange={handleAddress}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton 
                                aria-label = 'toggle location'
                                onClick={Location}
                                >
                                    <MyLocationIcon/>
                                </IconButton>

                            </InputAdornment>
                        )
                        
                    }}
                
                />
                <TextField type="url" label="Link to website" fullWidth onChange={(e)=>{setUrl(e.target.value)}}/>

        </Grid>

        <div className='flex flex-col mt-16 gap-8 align-middle justify-center'>
            <Button onClick={handleSubmit} className='text-white bg-[#658864] rounded-lg normal-case hover:scale-105'>Sign Up</Button>
            <Button onClick={handleSwitchRole} className='text-white bg-[#658864] rounded-lg normal-case hover:scale-105'>Join for a Bowl</Button>
    
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

export default OrganizerSignUp
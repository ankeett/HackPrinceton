import React, {useState, useEffect,  forwardRef} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../../actions/userActions';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const InstantMessage = ({severity,message}) =>  {

  const [showAlert, setShowAlert] = React.useState(true);

  const handleClose = () => {
    setShowAlert(false);

  };
  const dispatch = useDispatch();

  useEffect(() => {
   
    if (showAlert == false) {
      const timeout = setTimeout(() => {
        console.log(showAlert);
      setShowAlert(true);
      dispatch(clearErrors());

      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
     
    }
  }, [showAlert]);

    
     
        
    
       
    return (
      
        <>
        
        
        <Snackbar open={showAlert}>
            <Alert  onClose={handleClose} severity={severity}>{message}</Alert>

      </Snackbar>
      
      </>
    )
}
export default InstantMessage
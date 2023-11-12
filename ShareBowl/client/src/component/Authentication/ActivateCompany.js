import React, {useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  activateCompany,clearErrors } from '../../actions/companyAction';

const ActivateCompany = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();

    const {error, success, isLoading, isActivated, user} = useSelector(state=>state.user);

    useEffect(()=>{
      
        dispatch(activateCompany(token));
        
    }, [])

    useEffect(()=>{
       

        if (error){
            dispatch(clearErrors);
            navigate("/signin")
        }

        if (success){
            navigate("/home");
        }

    }, [dispatch, error, success, user, isActivated, isLoading])
  return (
    <div>Activate Company</div>
  )
}

export default ActivateCompany
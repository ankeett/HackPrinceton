import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { TextField,Button,Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import Review from './Review';
import { createReview, deleteMyReview } from '../../actions/productAction';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';


import { getMyReview } from '../../actions/userActions';

 const Comment = (props)=> {
    const dispatch = useDispatch();
    const params = useParams();
    const {myReview} = useSelector(state=>state.review);


  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

    


  useEffect(()=>{
    if (myReview.length === 0){
        dispatch(getMyReview(params.id));
        console.log("0000000")

    }
    else{
        setRating(myReview[0]);
        setReview(myReview[1]);
        console.log("1111111")


    }
    
  },[myReview])



  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(params.id, rating, review));
    
  }

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteMyReview(params.id));
  }
  return (
    
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
          <Divider style={{margin: '20px 0'}}/>
        <Typography component="legend">Leave your review</Typography>

        <div className='flex flex-col'>
        <Rating
        name="simple-controlled"
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => {
        setRating(newValue);
        }}
        />
        <TextField  value={review} multiline = {true} placeholder = "Write your review..." size = "medium" onChange = {(e)=>{
          setReview(e.target.value);

        }} />

        </div>  

        {myReview.length != 0 && myReview[2] === 1 ?
            <Button className=' float-right mt-2' onClick={deleteHandler} ><small>{<DeleteIcon/>}</small></Button> :<></>
        }
        <br />

        <Button className='text-white bg-[#658864] normal-case mt-4' onClick={reviewHandler}>Submit</Button>
     
      
    </Box>
  );
}

export default Comment;

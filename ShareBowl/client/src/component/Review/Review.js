import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

 const Review = (props)=> {
  

  useEffect(()=>{
    console.log(props.rating)
  }, [])
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      
      <Rating
        name="simple-controlled"
        value={props.rating}
        precision={0.5}
        onChange={(event, newValue) => {
        props.setRating(newValue);
        }}
      />

       
     
      
    </Box>
  );
}

export default Review;

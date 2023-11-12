import React , {useEffect, useState} from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAProduct } from '../../actions/productAction';
import { Rating } from '@mui/material';
const ShowReviews = (props) => {
    const dispatch = useDispatch();
    const {isLoading, error, success, product} = useSelector(state=>state.productRed);
    
    const {user} = useSelector(state=>state.user);
  useEffect(()=>{
        dispatch(fetchAProduct(props.id));
    },[])

  return (
   <>
    

    <h2 className='mb-4'>Reviews</h2>
    
    {product.numOfReview === 0? <p>No reviews</p> :
    product.reviews?.map((review, index)=>{
        if (review.user === user.id){
            props.setMyComment(review.comment);
            props.setMyRating(review.rating)
        }
        return <div>
            

        <div className='flex flex-col'> 
        <div className='flex flex-row gap-3'>
          <strong>{review.name}</strong>
          <Rating className='mb-1'
              name="simple-controlled"
              value={review.rating}
              precision={0.5}
              disabled = {true}
          />
          </div>
          <p> &emsp; {review.comment}</p>
        </div>
        </div>
    })
    }

   </>
  )
}

export default ShowReviews
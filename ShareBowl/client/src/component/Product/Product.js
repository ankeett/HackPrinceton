import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Container,Paper,Typography,Divider, Button, } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchAProduct } from '../../actions/productAction';
import "./ProductDetail.css"
import { addItemsToCart } from '../../actions/cartActions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MetaData from '../../MetaData';
import Carousel from "react-material-ui-carousel";
import Comment from "../Review/Comment";

import ShowReviews from '../Review/ShowReviews';

const Product = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const {isLoading, error, success, product} = useSelector(state=>state.productRed);
    const {user} = useSelector(state=>state.user)
    const {cartItems} = useSelector((state)=>state.cart);
    const navigate = useNavigate();

    const [myRating, setMyRating] = useState(0);
    const [myComment, setMyComment] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [updateCartText, setUpdateCartText] = useState("")
    useEffect(()=>{
        dispatch(fetchAProduct(params.id));
        cartItems.map((cart)=>{
          if (cart.productId === params.id){
            setQuantity(cart.quantity);
            setUpdateCartText("Update")
          }
        })

    },[dispatch, error, success])

    const increaseQuantity=()=>{
      // setQuantity(prevState=>prevState+1);

        if (product.stock <= quantity) return;
        console.log(product.stock)
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity=()=>{
      // setQuantity(prevState=>prevState-1);
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
      dispatch(addItemsToCart(params.id, quantity, true));
      
  }


  return (
    <Container className='max-w-4xl'>
      <MetaData title = {product.name}/>
        <Paper className="m-[50px] p-[50px] rounded-[15px]" elevation={6}>

        {product ? 
        <div>
          <Carousel className='Carousel'>
                {product.images && product.images.map((item, i)=>(
                    <img className = "CarouselImage"
                    key = {item.url}
                    src = {item.url}
                    alt = {`${i} Slide`}
                    />
                ))}
            </Carousel>
        <div>
          <Typography variant="h3" component="h2">{product.name}</Typography>
          <Typography gutterBottom variant="body1" component="p">{product.description}</Typography>
          {/* <Divider className="mt-[20px]"/> */}
          {/* <Typography gutterBottom variant="body1" component="p">Price: ${product.price}</Typography> */}

          <Divider style={{margin: '20px 0'}}/>

        </div>

        {
          user?.role == "user" &&
        
          <div className="flex flex-col">
                  <div>
                      {/* <Button onClick={decreaseQuantity}><RemoveIcon/></Button> */}
                      {/* <input className="mx-2 border text-center w-8" type="text" readOnly value={quantity}/> */}
                      {/* <Button onClick = {increaseQuantity}><AddIcon/></Button> */}
                  <Button disabled = {product.stock < 1 ? true :false} onClick={addToCartHandler} className="text-white bg-[#658864] rounded-lg normal-case"> {updateCartText} Register</Button>
                  </div>
          </div>
        }


        {
          user?.role == "user" &&
            <Comment rating  myComment = {myComment} myRating = {myRating}/>
            
        }

      <hr />
        <ShowReviews id = {params.id} myComment = {myComment} myRating = {myRating} />

      </div>
      :<>Product Does not exist</>
}


    </Paper>
    </Container>
  )
}

export default Product
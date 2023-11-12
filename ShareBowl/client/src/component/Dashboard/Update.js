import { Container,Paper, Typography,TextField,InputAdornment,Grid,Button,MenuItem } from '@mui/material'
import React,{useState,useEffect,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { createProduct,clearErrors, updateProduct } from '../../actions/productAction';
import InstantMessage from '../Error/InstantError';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAProduct } from '../../actions/productAction';
import { updateOrder } from '../../actions/orderActions';
import MetaData from '../../MetaData';

const Update = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();
    const productId = id;
    const { success, product, isUpdated} = useSelector(state=>state.productRed);


  const formRef = React.useRef();
  const [name,setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [stock, setStock] = useState(0);
  const [image,setImage] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [hasErrors, setHasErrors]= useState("");

  useEffect(()=>{
    if (product && product._id !== productId){
        dispatch(fetchAProduct(productId))
    }
    else{
      console.log("UY")
    setName(product.name)
    setDescription(product.description)
    setCategory(product.category)
    setSubCategory(product.subcategory)
    setStock(product.stock)
    setImage(product.images) 
    
    }

   
},[product])
  
   
  const handleSubmit = (e) =>{
    console.log("HERE")

    e.preventDefault();
    formRef.current.reportValidity()
    dispatch(updateProduct(productId,name, description,subcategory,stock, image, newImages));
  }

  const handleImages = (e)=>{
   
    const files = Array.from(e.target.files);
    setNewImages([]);
    files.forEach((file)=>{
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState=== 2){
                setNewImages((old)=>[...old, reader.result]);
            }
        }

        reader.readAsDataURL(file);
    });
}

const categories =[
  { 
    value:"Canned Goods"
  },
  {
    value:"Dry Goods"
  },
  
  {
    value:"Non-Perishable Proteins"
  },
  {
    value:"Grains"
  },
  {
    value:"Dairy and Alternatives"
  },

  {
    value:"Fruits and vegetables"
  },
  {
    value:"Frozen Foods"
  },
  {
    value: "Beverages"
  },
  {
    value: "Snack Items"
  },
  {
    value: "Specialty or Dietary-Specific Items"
  },
]
  const {isLoading, isAuthenticated, user} = useSelector(state => state.user);
  const {error} = useSelector(state => state.productRed);
  useEffect(()=>{
    if(error){
      setHasErrors(error)
      dispatch(clearErrors())
    }
  },[isAuthenticated, user, dispatch, error])

  return (
    <Container className='max-w-2xl'>
      <MetaData title = "Update Event"/>
    { product && 
        <Paper elevation={3} className="flex-col p-10 align-middle ">
        <div className='p-[20px] mb-[20px] text-center'>
          <Typography className='text-center'>Update an Event Listing</Typography>
        </div>
        <form action="" ref={formRef}>
            <Grid container spacing ={2} className='gap-[30px]'>
                <TextField required fullWidth name='name' label="Name" type='text' value={name || ""} onChange = {(e)=>{setName(e.target.value)}} 
                />
                <TextField required fullWidth name='description' maxLength="2" label="Description" value={description || ""} multiline onChange = {(e)=>{setDescription(e.target.value)}} inputProps={{ maxLength: 250 }}/>
                

                <TextField fullWidth name='subcategory' label="SubCategory" value={subcategory || ""} onChange = {(e)=>{setSubCategory(e.target.value)}}/>
                <TextField required type="number"  fullWidth name='stock' label="Stock" value={stock} onChange = {(e)=>{setStock(e.target.value)}} InputProps={{inputProps:{min:0}}}/>
                <input type="file" fullWidth name='image' multiple accept="image/*" onChange = {handleImages}/>
                <div className='grid grid-cols-2 gap-6'>
                 
                {newImages &&
                    newImages.map((img,index)=>{
                      return(
                        <div key={index} className="">
                            <img src={img} height='200' width='200'/>
                            <button type = 'button' onClick={()=>setNewImages(newImages.filter((e)=> e !== img))}>Remove</button>
                        </div>
                      )
                    })
                  }
                   {image &&
                    image.map((img,index)=>{
                      return(
                        <div key={index} className="">
                            <img src={img.url} height='200' width='200'/>
                            <button type = 'button' onClick={()=>setImage(image.filter((e)=> e !== img))}>Remove</button>
                        </div>
                      )
                    })
                  }

                </div>
            </Grid>
            <div className='flex flex-col mt-16 gap-8 align-middle justify-center'>
              <Button fullWidth onClick={handleSubmit} className='text-white bg-[#658864] rounded-lg normal-case'>Submit</Button>
            </div>
        </form>
      </Paper>
    }
    </Container>
    
    
  )
}

export default Update
import { Container,Paper, Typography,TextField,InputAdornment,Grid,Button,MenuItem } from '@mui/material'
import React,{useState,useEffect,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { createProduct,clearErrors } from '../../actions/productAction';
import Review from '../Review/Review'
import InstantMessage from '../Error/InstantError';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';

const Organize = () => {  
  const formRef = React.useRef();
  const [name,setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [stock, setStock] = useState(0);
  const [height, setHeight]= useState(0);
  const [width,setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [images,setImages] = useState([]);
  const [hasErrors, setHasErrors]= useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const handleSubmit = (e) =>{
    e.preventDefault();
    formRef.current.reportValidity()

    dispatch(createProduct(name, description,category,subcategory,stock,images));
    
  }

  const handleImages = (e)=>{
   
    const files = Array.from(e.target.files);
    setImages([]);
    console.log(files);
    files.forEach((file)=>{
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState=== 2){
                setImages((old)=>[...old, reader.result]);
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
  console.log(error);
  useEffect(()=>{
    if(error){
      setHasErrors(error)
      dispatch(clearErrors())
    }
  },[isAuthenticated, user, dispatch, error])

  return (
    <Container className='max-w-2xl'>
      <MetaData title = "Create a Product"/>
      <Paper elevation={3} className="flex-col p-10 align-middle ">
        <div className='p-[20px] mb-[20px] text-center'>
          <Typography className='text-center'>Create a Listing</Typography>
        </div>
        <form action="" ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing ={2} className='gap-[30px]'>
                <TextField required fullWidth name='name' label="Name" type='text' onChange = {(e)=>{setName(e.target.value)}}
                />
                <TextField required fullWidth name='description' maxlength="2" label="Description" multiline onChange = {(e)=>{setDescription(e.target.value)}} inputProps={{ maxLength: 250 }}/>
                {/* <TextField required type="number" fullWidth name='price' label="Price" onChange = {(e)=>{setPrice(e.target.value)}}
                  InputProps={{
                    startAdornment:(
                        <InputAdornment position="start">  
                          $
                        </InputAdornment>
                    ),
                    inputProps:{min:0, step: 0.01}
                  }}    
                /> */}
                <TextField required defaultValue="" fullWidth name='category' label="Category" select onChange = {(e)=>{setCategory(e.target.value)}}>
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField fullWidth name='subcategory' label="SubCategory" onChange = {(e)=>{setSubCategory(e.target.value)}}/>
                <TextField required type="number"  fullWidth name='stock' label="Max Visitors" onChange = {(e)=>{setStock(e.target.value)}} InputProps={{inputProps:{min:0}}}/>
                <input type="file" fullWidth name='image' multiple accept="image/png image/jpeg image/webp" onChange = {handleImages}/>
                <div className='grid grid-cols-2 gap-6'>
                {images &&
                      images.map((img,index)=>{
                        return(
                          <div key={index} className="">
                              <img src={img} height='200' width='200'/>
                              <button onClick={()=>setImages(images.filter((e)=> e !== img))}>Remove</button>
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
    {
      hasErrors ?  <InstantMessage severity= "error" message = {hasErrors} /> : ''
    }
    </Container>
  )
}

export default Organize
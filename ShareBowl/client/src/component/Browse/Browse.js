import React, { useState,useEffect } from 'react'
import {Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProducts} from '../../actions/productAction'
import Post from './Post'
import { TextField, Paper,Button,InputAdornment,IconButton, FormControlLabel, Switch} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import Review from '../Review/Review'
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import GoogleMapReact from 'google-map-react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Loading from '../Loader/loading'
import MetaData from '../../MetaData'

import { styled } from '@mui/material/styles';

const AnyReactComponent = ({ text }) => <LocationOnIcon />;

const Browse = () => {
  const dispatch = useDispatch();
  const [advanced,setAdvanced] = useState(false);
  const [price,setPrice] = useState([0,5000])
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lat,setLat] = useState();
  const [long, setLong] = useState();
  const [radius,setRadius] = useState(30000);
  const [selectedLat, setSelectedLat] = useState(0.0);
  const [selectedLong, setSelectedLong] = useState(0.0);
  const [search, setSearch] = useState(false)
  const [keyword,setKeyword] = useState("");
  const [keywordFinal, setKeywordFinal] = useState("");
  const [map,setMap] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeywordFinal(keyword);
    setSearch(true);

    setMap(false);
    setChecked(false);
    
  }
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  }
  const handleAdvanced = (e)=>{
    e.preventDefault();
    setAdvanced((prevAdvanced)=>!prevAdvanced);
    setMap(false);
    setChecked(false);
  }

  const handleCancelSearch = (e) => {
    e.preventDefault();
    setKeywordFinal("")
    setKeyword("");
    setSearch(false)
    setMap(false)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
    setCurrentPage(1);
}
  const {isLoading, error, success, product, count, productLocation} = useSelector(state=>state.productRed);
  const {user}=useSelector(state=>state.user);

  useEffect(()=>{    

   
      if (!advanced){

      
      dispatch(fetchProducts(keyword, currentPage, price, category, rating, radius, selectedLat, selectedLong));

    }
    
  },[keywordFinal, advanced])
  
  const onOptionChange = e => {
    setCategory(e.target.value);
  }

  const handleReset = () =>{
    //setPrice([0,5000]);
    setCategory("");
    setRating(0);
    setRadius(30000);
  }
  const handleLocation = () =>{
      navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setSelectedLat(lat);
      setSelectedLong(long);
      setMap((prevMap)=>!prevMap);

    })
    setChecked((prevState)=>!prevState);

  }
  
  const defaultProps = {
    center: {
      lat: lat,
      lng: long
    },
    zoom: 11,
    size:{width:300,height:140}
  };

  const renderMarkers = (map, maps, latt, long,title) => {
    
    let marker = new maps.Marker({
    position: { lat: latt, lng: long },
    map,
    title: title
    });
    return marker;
   };

   const [selectedOption, setSelectedOption] = useState('all');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  
  return (
    <>
    
    <MetaData title = "Browse Events"/>    

    <div className='m-[50px]'>
      <TextField className='text-center' value={keyword}  onChange={handleChange} fullWidth varient ="outlined" label='Search'
      InputProps={{
        endAdornment:(
            <InputAdornment position="end">
                <IconButton        
                >
                  
                    <Button onClick = {handleSearch}>
                      
                      <SearchIcon /> 
                    </Button>
                    
                </IconButton>
            {search ?     <IconButton> 
                    <Button onClick={handleCancelSearch}>
                    <CancelIcon/>

                    </Button>
                    
                    
                </IconButton>
                : <></>
            }
            </InputAdornment>
        )
    }}        
    />
    <div className='flex flex-row float-right m-[20px] gap-5'>
      <FormControlLabel
            value="bottom"
            control={<IOSSwitch checked={checked} onClick={handleLocation} sx={{ m: 1 }} />}
            
            label="Map"
            labelPlacement="end"
          />    
    </div>
    <Button className='float-right m-[20px] text-white bg-[#658864] normal-case' onClick = {handleAdvanced} >Advanced Search?</Button>
    {
      advanced ? 
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
        <Paper className="m-[50px] p-[50px] rounded-[15px] w-2/6" elevation={6}>
          <div className='text-end cursor-pointer' onClick={handleAdvanced}><CancelIcon/></div>   
          <nav className='text-center'>
            <strong>Filters</strong>
            <Divider className='m-2'/>
          </nav>

          <div className='m-auto'>
          {/* <div className='flex flex-col mt-[10px]'>
            Price Range

            <Slider className ='w-80'
              getAriaLabel={() => 'Price range'}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              max={5000}
            />

            <div className='flex flex-row gap-[30px]'>
              <TextField label='min' value={price[0]}
                InputProps={{
                  startAdornment:(
                      <InputAdornment position="start">  
                        $
                      </InputAdornment>
                  )
                }}
              />
        
              {/* <TextField label='max' value={price[1]}
                InputProps={{
                  startAdornment:(
                      <InputAdornment position="start">  
                        $
                      </InputAdornment>
                  )
                }}
              /> *
            </div> */}
          {/* /</div> */}
          
          <div className='mt-[20px] flex flex-col gap-2'>
            <p className='-mb-1'>Item type:</p>
          <div>
              <input
              type="radio"
              name="category"
              value="Canned Goods"
              id="Canned Goods"
              checked={category === "Canned Goods"}
              onChange={onOptionChange}
              />
            <label htmlFor="Canned Goods">Canned Goods</label>
          </div>
          
          <div>
          <input
            type="radio"
            name="category"
            value="Dry Goods"
            id="Dry Goods"
            checked={category === "Dry Goods"}
            onChange={onOptionChange}
          />
          <label htmlFor="Dry Goods">Notes</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Non-Perishable Proteins"
              id="Non-Perishable Proteins"
              checked={category === "Non-Perishable Proteins"}
              onChange={onOptionChange}
            />
            <label htmlFor="Non-Perishable Proteins">Non-Perishable Proteins</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Grains"
              id="Grains"
              checked={category === "Grains"}
              onChange={onOptionChange}
            />
            <label htmlFor="Grains">Grains</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Dairy and Alternatives"
              id="Dairy and Alternatives"
              checked={category === "Dairy and Alternatives"}
              onChange={onOptionChange}
            />
            <label htmlFor="Dairy and Alternatives">Dairy and Alternatives</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Fruits and vegetables"
              id="Fruits and vegetables"
              checked={category === "Fruits and vegetables"}
              onChange={onOptionChange}
            />
            <label htmlFor="Fruits and vegetables">Fruits and vegetables</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Frozen Foods"
              id="Frozen Foods"
              checked={category === "Frozen Foods"}
              onChange={onOptionChange}
            />
            <label htmlFor="Frozen Foods">Frozen Foods</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Beverages"
              id="Beverages"
              checked={category === "Beverages"}
              onChange={onOptionChange}
            />
            <label htmlFor="Beverages">Beverages</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Snack Items"
              id="Snack Items"
              checked={category === "Snack Items"}
              onChange={onOptionChange}
            />
            <label htmlFor="Snack Items">Snack Items</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Specialty or Dietary-Specific Items"
              id="Specialty or Dietary-Specific Items"
              checked={category === "Specialty or Dietary-Specific Items"}
              onChange={onOptionChange}
            />
            <label htmlFor="Specialty or Dietary-Specific Items">Specialty or Dietary-Specific Items</label>
          </div>
       
          <div>   
          <input
            type="radio"
            name="category"
            value="All"
            id="All"
            checked={category === ""}
            onChange={()=> setCategory("")}
          />
          <label htmlFor="All">All</label>
          </div> 
          </div>
            <Divider className='m-2'/>
          <TextField className='mr-[10px] mt-[10px]' label="Radius" type= 'number' value={radius} onChange={(e)=>{
            
            setRadius(e.target.value)
            navigator.geolocation.getCurrentPosition((position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
              setSelectedLat(lat);
              setSelectedLong(long);
        
            })
            }} InputProps={{inputProps:{min:0}}}/>
          <Divider className='m-2'/>
          <p className='-mb-1'>Ratings:</p>
          <Review rating={rating}  setRating = {setRating} />
          <div className=' flex flex-row gap-5 float-right'>
          <Button className=' text-white bg-[#658864] rounded-lg normal-case' onClick={handleReset}>Reset</Button>
          <Button className=' text-white bg-[#658864] rounded-lg normal-case' onClick={handleAdvanced}>Show results</Button>
          </div>
          </div>
        </Paper>
      </div>
      : ""
    }

  {
map ? 
<div className = 'mt-[80px] mb-9 grid grid-flow-row-dense grid-cols-2 grid-rows-1 shadow-black w-full gap-7' style={{ height: '80vh' }}>
    <GoogleMapReact className="w-[300px]" bootstrapURLKeys={{ key: "AIzaSyB6212bDmstvwdAx-RlpqG5AooLW46yyew"}} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} 
      onClick={(e) => {
        setSelectedLat(e.lat);
        setSelectedLong(e.lng);
        
      <AnyReactComponent lat={e.lat} lng={e.lng} text="Marker" />;
    }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        
         renderMarkers(map, maps, lat, long, "My Location")

         for (let i = 0; i < product.length; i++){
            renderMarkers(map, maps, productLocation[i][1],productLocation[i][0] ,product[i].name )

         }
      
      }}
    >       
    
          
      </GoogleMapReact>

      <div>

        
       { isLoading? <Loading/>:
   <Grid container component='main' className='flex flex-row gap-8 items-right justify-right h-[600px] overflow-y-auto '>        {
          product && product.map((p)=>(
            <Post key = {p._id} user = {user || ''} p = {p}/>
            ))
          }

      </Grid>}
      </div>

      </div>
      : 
      

      isLoading? <Loading/>:
      <Grid container component='main' className='flex flex-row gap-8 items-right justify-right'>
      {
        Array.isArray(product) && product.map((p)=>(
          <Post key = {p._id} user = {user || ''} p = {p}/>
          ))
        }

    </Grid>
  }
    </div>

    </>
  )
}

export default Browse
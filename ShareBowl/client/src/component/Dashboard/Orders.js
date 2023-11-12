import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { showMyOrders, showOrders, updateOrder } from '../../actions/orderActions';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { Paper,Button,Divider, TextField, MenuItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'
import MetaData from '../../MetaData';
import Pagination from "react-js-pagination";

import "./Products.css"


const Orders = () => {
  const dispatch = useDispatch();
  const {isLoading, error, success, order, count} = useSelector(state=>state.orderRed);
  const {user} = useSelector(state=>state.user)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  useEffect(()=>{    
    if (user?.role === "company"){
      dispatch(showOrders(currentPage));

    }
    else if (user?.role === "user"){
      console.log("My orderd")
      dispatch(showMyOrders(currentPage));
    }
  },[dispatch, currentPage])

  const [advanced, setAdvanced] = useState(false)
  const [id, setID] = useState();
  const [status,setStatus] = useState();

    const handleAdvanced =()=>{
      setAdvanced((prevAdvanced)=>!prevAdvanced);
    }

    const handleSubmit=(e)=>{
      dispatch(updateOrder(id,status))
      window.location.reload();
    }

  return (
    <>
    <MetaData title = "Status"/>
    <h1 className="text-2xl font-semibold ">Status</h1>

    <table className="shadow-lg bg-white border-collapse">
    <tbody>
    <tr>
      <th className="bg-blue-100 border text-left px-8 py-4">Event Id</th>
      {user?.role === "company" &&
      <th className="bg-blue-100 border text-left px-8 py-4">Buyer Id</th>}

      {user?.role === "user" &&
            <th className="bg-blue-100 border text-left px-8 py-4">Organizer Id</th>}

      <th className="bg-blue-100 border text-left px-8 py-4">Item Status</th>
      {user?.role === "company" &&
      <th className="bg-blue-100 border text-left px-8 py-4">*</th>
      }
    </tr>
   
    { order && order?.map((item,index)=>(
      <tr key={index}>
        <td className="border px-8 py-4"><Link to={`/product/${item.productId}`}>{item.productId}</Link></td>
        {user?.role === "company" &&
        <td className="border px-8 py-4">{item.userId}</td>}

      {user?.role === "user" &&
      <td className="border px-8 py-4">{item.companyId}</td>}

        <td className="border px-8 py-4">{item.status}</td>
        {user?.role === "company" &&

        <td className="border px-8 py-4"><Button onClick={()=>{
          setID(item._id);
          setStatus(item.status);
          handleAdvanced();
        }}>{<SettingsIcon/>}</Button></td> 
        
        }
        {/* change it later */}

      </tr>


    ))}

</tbody>
  </table>
  {
    advanced ?
     <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
    <Paper className="m-[50px] p-[50px] rounded-[15px] " elevation={6}>
      <div className='text-end cursor-pointer' onClick={handleAdvanced}><CancelIcon/></div>   
      <nav className='text-center'>
        <strong>Update the Status</strong>
        <Divider className='m-3'/>
      </nav>
      <TextField fullWidth select label="Status" defaultValue={status} onChange={(e)=>{setStatus(e.target.value)}}>
        <MenuItem value="Processing">Processing</MenuItem>
        <MenuItem value="Confirmeed">Confirmed</MenuItem>
      </TextField>
      <Button className="text-white bg-[#658864] normal-case hover:scale-105 mt-3" onClick={handleSubmit}>Submit</Button>
      </Paper>
      </div>
          : ""
  }

              <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage = {itemsPerPage}
                    totalItemsCount = {count}
                    onChange = {setCurrentPageNo}
                    nextPageText = "Next"
                    prevPageText = "Prev"
                    firstPageText = "1st"
                    lastPageText = "Last"
                    itemClass = "page-item"
                    linkClass = "page-link"
                    activeClass = "pageItemActive"
                    activeLinkClass = "pageLinkActive"

                />
                </div>
    </>
  )
}

export default Orders
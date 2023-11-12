import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {showAllInventory} from '../../actions/orderActions'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import {deleteProduct} from '../../actions/productAction'
import MetaData from '../../MetaData';
import Pagination from "react-js-pagination";
import { red } from '@mui/material/colors';
import "./Products.css"

const Inventory = () => {
  const dispatch = useDispatch();
  const {isLoading, error, success, product, count} = useSelector(state=>state.productRed);
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  useEffect(()=>{    
    dispatch(showAllInventory(currentPage));
  },[dispatch, currentPage])


  const removeProduct = (id)=>{
    dispatch(deleteProduct(id));
    // window.location.reload();
  }


  return (
    <div>
      <MetaData title = "Your Events"/>
    <h1 className="text-2xl font-semibold ">Events</h1>

    <table className="shadow-lg bg-white border-collapse">
    <tbody>
    <tr>
      <th className="bg-blue-100 border text-left px-8 py-4">Name</th>
      <th className="bg-blue-100 border text-left px-8 py-4">Category</th>
      <th className="bg-blue-100 border text-left px-8 py-4">SubCategory</th>
      <th className="bg-blue-100 border text-left px-8 py-4">Max People</th>
      <th className="bg-blue-100 border text-left px-8 py-4"></th>
      <th className="bg-blue-100 border text-left px-8 py-4"></th>

    </tr>
   
    { product && product.map((p,index)=>(
      <tr key={index}>
        <td className="border px-8 py-4">{p.name}</td>
        <td className="border px-8 py-4">{p.category}</td>
        <td className="border px-8 py-4">{p.subcategory}</td>
        <td className="border px-8 py-4">{p.stock}</td>
        <td className="border px-8 py-4"><Link to={`/update/${p._id}`}>{<SettingsIcon/>}</Link></td> 
        <td className="border px-8 py-4"><Button onClick = {()=>{ removeProduct(p._id)}}>{<DeleteIcon sx={{ color: red[500] }}/>}</Button></td> 
        
        {/* change it later */}
      </tr>
    ))}

</tbody>
  </table>
  
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

    </div>
  )
}

export default Inventory
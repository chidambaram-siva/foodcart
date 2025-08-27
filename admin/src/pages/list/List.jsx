import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
 import { toast } from "react-toastify";
import { useState } from 'react';
import "./List.css"


const List = () => {
  const [list,setList] = useState([]);
  const ListFood = async()=>{
    try {
      const response = await axios.get(`http://localhost:4000/api/food/get`);
      if(response.data.success){
        setList(response.data.data)
      }

    } catch (error) {
      toast.error("error")
    }

  }
  const removeFooditem=async(foodId)=>{
    const remove = await axios.post(`http://localhost:4000/api/food/remove`,{id:foodId})
    await ListFood();
    if(remove.data.success){
      toast.success(remove.data.success)

    }
    else{
      toast.error(remove.data.error)
    }
  }

  useEffect(()=>{
    ListFood();
  },[])
  return (
    <div>
         <div className="list add flex-col">
          <p>List Items</p>
            <div className="list-table">
              <div className="list-table-format title">
                <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
              </div>
              {list.map((item,index)=>{
                  return (
                    <div key={index} className='list-table-format'>
                      <img src={`http://localhost:4000/image/`+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>{item.price}</p>
                      <p onClick={()=>removeFooditem(item._id)} className='cursor'>X</p>

                    </div>
                  )

                  
              })}
            </div>
          
         </div>
    </div>
  )
}

export default List

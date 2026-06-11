import { createContext, useEffect, useState} from "react";
import axios from "axios"
import { url } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [token,setToken]=useState({});
  const [CartItems ,setCartItems]=useState({});
  const [food_list , setFoodlist]=useState([]);
  
  const addItems=async(id)=>{
    if(!CartItems[id]){
      setCartItems((prev)=>({...prev,[id]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
    }
    if(token){
      await axios.post(`${url}/api/cart/add`,{id}, {headers:{token}} )
    } 
  }
  
  const removeItems=async(id)=>{
   
      setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
       if(token){
      await axios.post(`${url}/api/cart/remove`,{id}, {headers:{token}} )
    }
  }
  const gettotalAmount =()=>{
    let totalAmount = 0;
    for(const id in CartItems){
      if(CartItems[id]>0){
        const itemInfo = food_list.find((product)=>product._id==id)
        totalAmount+=itemInfo.price*CartItems[id]
      }
    }
    return totalAmount;
  }
  const getQuantity =()=>{
    let totalQuantity = 0;
    for(const id in CartItems){
      if(CartItems[id]>0){
        totalQuantity+=CartItems[id]
      }
    }
    return totalQuantity;
  }
  const fetchFoodlist= async()=>{
   const response = await axios.get(`${url}/api/food/get`);
         if(response.data.success){
           setFoodlist(response.data.data)
         }
  }
  const loadCartData = async(token)=>{
    const response = await axios.get(`${url}/api/cart/get`,{headers:{token}})
    setCartItems(response.data.cartData)
  }
  useEffect(()=>{
    async function loaddata() {
      await fetchFoodlist()
      
    
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }}
    loaddata();
  },[])
  
  const contextValue = {
    food_list,
    removeItems,
    addItems,
    CartItems,
    gettotalAmount,
    getQuantity,
    token,
    setToken,


  };


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

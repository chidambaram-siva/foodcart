import React from 'react'
import "./Exploremenu.css"
import { menu_list } from '../../assets/assets'


const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore'>
        <h1>Explore the food</h1>
        <p className='description'>Explore an endless variety of meals, snacks, and treats. Whether you love spicy street food, creamy desserts, or healthy bowls</p>
        <div className='explore-items'>
            {menu_list.map((menu,index)=>{
                return <div key={index} className="explore-list" onClick={()=>{setCategory(prev=>prev===menu.menu_name?"All":menu.menu_name)}}>
                    <img className={category===menu.menu_name?"active":""} src={menu.menu_image} alt="" />
                    <p>{menu.menu_name}</p>
                </div>
                })}
        </div>
        <hr />
    </div>
  )
}

export default Exploremenu

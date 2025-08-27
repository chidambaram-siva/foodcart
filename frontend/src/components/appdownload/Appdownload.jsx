import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'

const Appdownload = () => {
  return (
    <div id='app'>
        <div className="appdownload" >
            <p>For better Experience download <br /> Tomato</p> 
            <div className='appdownload-img'>
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
      
    </div>
  )
}

export default Appdownload

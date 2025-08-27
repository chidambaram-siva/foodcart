import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import { useState } from "react";
import axios from "axios";
 import { toast } from "react-toastify";


const Add = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image:"",
    
  });
  const EventHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          
        });
        setImage("");
        toast.success(response.data.message);

      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("Please fill all the details");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-img flex-col">
            <p>Upload images</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              name="image"
              
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              type="text"
              value={data.name}
              onChange={EventHandler}
              placeholder="Food Name"
              name="name"
            />
          </div>
          <div className="add-product-desc flex-col">
            <p>Product Description</p>
            <textarea
              name="description"
              value={data.description}
              onChange={EventHandler}
              id=""
              rows="6"
              placeholder="Write The Content Here"
            ></textarea>
          </div>
          <div className="add-price-category flex-col">
            <div className="category">
              <p>Product Category</p>
              <select
                name="category"
                value={data.category}
                onChange={EventHandler}
                id=""
              > 
                <option value="">Select</option>
                <option value="salad">salad</option>
                <option value="rolls">rolls</option>
                <option value="desert">desert</option>
                <option value="sandwich">sandwich</option>
                <option value="cake">cake</option>
                <option value="pure veg">pure veg</option>
                <option value="pasta">pasta</option>
                <option value="noodles">noodles</option>
              </select>
            </div>
            <div className="price">
              <p>Product Price</p>
              <input
                type="Number"
                value={data.price}
                onChange={EventHandler}
                placeholder="$20"
                name="price"
              />
            </div>
          </div>

          <button type="submit"> ADD </button>
        </form>
      </div>
    </div>
  );
};

export default Add;

import React, { useState, useEffect } from "react";
import MetaData from "../../components/layout/MetaData";
import Sidebar from "../../components/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { createNewProdct } from "./newProductSlice";

const NewProductView = () => {
  const {loading} = useSelector(state => state.newProduct);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: '',
    description: "",
    category: "Electronics",
    countInStock: "",
    seller: "",
  });
  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  }

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", productInfo.name);
    formData.set("price", productInfo.price);
    formData.set("description", productInfo.description);
    formData.set("category", productInfo.category);
    formData.set("countInStock", productInfo.countInStock);
    formData.set("seller", productInfo.seller);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProdct(formData));
    
    // clear images
    setImages([]);
    setImagesPreview([]);
    document.getElementById("customFile").value = "";

    setProductInfo({
      name: "",
      price: "",
      description: "",
      category: "Electronics",
      countInStock: "",
      seller: "",
    });

  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  
  
  return (
    <>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              className="shadow-lg"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name_field"
                  className="form-control"
                  value={productInfo.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="number"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={productInfo.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  name="description"
                  value={productInfo.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  name="category"
                  id="category_field"
                  value={productInfo.category}
                  onChange={handleChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Food">Food</option>
                  <option value="Books">Books</option>
                  <option value="Clothes/Shoes">Clothes/Shoes</option>
                  <option value="Beauty/Health">Beauty/Health</option>
                  <option value="Sports">Sports</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  name="countInStock"
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={productInfo.countInStock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={productInfo.seller}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  onChange={handleFileChange}
                  multiple
                />
                <label className="form-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3 w-100"
                disabled={loading ? true : false}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductView;

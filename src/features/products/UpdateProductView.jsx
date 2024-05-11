import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MetaData from "../../components/layout/MetaData";
import Sidebar from "../../components/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails} from "./productDetailsSlice";
import { clearError, reset, updateProduct } from "./updateProductSlice";

const UpdateProductView = () => {
  const {loading, product,} = useSelector(state => state.productDetails);
  const {success, error} = useSelector(state => state.updateProduct);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: '',
    description: "",
    category: "Electronics",
    countInStock: "",
    seller: "",
    images: [],
  });

  
  
  const [newImages, setNewImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if(success) {
      toast.success('Product updated successfully');
      dispatch(reset());
      dispatch(fetchProductDetails(productId));
      navigate('/admin/products');
    }
    if(error) {
      toast.error(error);
      dispatch((clearError()));
    }

    if (!loading && !product || product._id !== productId) {
      dispatch(fetchProductDetails(productId));
    } else {
      setProductInfo({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        countInStock: product.countInStock,
        seller: product.seller,
        images: product.images,
      });
      setImagesPreview([]);
      product.images.forEach(image => {
        setImagesPreview((oldArray) => [...oldArray, image.url]);
      });
      }
  }, [product, success, error]);
  


  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  }



const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setNewImages([]);
  setImagesPreview([]);
  files.forEach( file => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setNewImages((oldArray) => [...oldArray, reader.result]);
        setImagesPreview((oldArray) => [...oldArray, reader.result]);
      }
    }
    reader.readAsDataURL(file);
  })
}
  
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  if(newImages.length > 0) {
    formData.set("name", productInfo.name);
    formData.set("price", productInfo.price);
    formData.set("description", productInfo.description);
    formData.set("category", productInfo.category);
    formData.set("countInStock", productInfo.countInStock);
    formData.set("seller", productInfo.seller);
    newImages.forEach((image) => {
      formData.append("images", image);
    });
  } else {
    formData.set("name", productInfo.name);
    formData.set("price", productInfo.price);
    formData.set("description", productInfo.description);
    formData.set("category", productInfo.category);
    formData.set("countInStock", productInfo.countInStock);
    formData.set("seller", productInfo.seller);
  }
  dispatch(updateProduct({id: productId, updateOptions: formData}));
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

              <div className="mt-3">
              <label className="form-label" htmlFor="customFile">
                  Choose Images
                </label>
                <input
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  onChange={handleFileChange}
                  multiple
                />
                
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProductView;

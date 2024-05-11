import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import ProductView from "../features/products/ProductView";
import { fetchProducts } from "../features/products/productSlice";
import Loader from "./layout/Loader";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function Home() {
  const { products, loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ]

  useEffect(() => {
    dispatch(fetchProducts({ keyword, pagination: currentPage, price, category, rating }));
  }, [currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (products.error) {
    toast.error(products.error);
  }
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      {loading ? (
        <Loader />
      ) : (
        products.products && (
          <>
            <div className="container container-fluid">
              <h1 id="products_heading">Latest Products</h1>
              <section id="products" className="container mt-5">
                <div className="row">
                  {keyword ? (
                    <>
                      <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                          <Range
                            marks={{
                              1: `$1`,
                              1000: `$1000`,
                            }}
                            min={1}
                            max={1000}
                            defaultValue={[1, 1000]}
                            tipFormatter={(value) => `$${value}`}
                            tipProps={{
                              placement: "top",
                              visible: true,
                            }}
                            value={price}
                            onChange={(price) => setPrice(price)}
                          />
                          <hr className="my-3" />
                          <div className="mt-5">
                            <h4 className="mb-3">Categories</h4>
                            <ul className="pl-0">
                              {categories.map((category) => {
                                return (
                                  <li
                                    style={{ cursor: "pointer", listStyleType: "none" }}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                  >
                                    {category}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <hr className="my-5" />
                          <div className="mt-5">
                            <h4 className="mb-3">Ratings</h4>
                            <ul className="pl-0">
                              {[5,4,3,2,1].map((star) => {
                                return (
                                  <li
                                    style={{ cursor: "pointer", listStyleType: "none" }}
                                    key={star}
                                    onClick={() => setRating(star)}
                                  >
                                    <div className="rating-outer">
                                      <div
                                        className="rating-inner"
                                        style={{ width: `${star * 20}%` }}
                                      ></div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                      </div>
                    </div>
                      <div className="col-6 col-md-9">
                        <div className="row">
                          {products.products.map((product) => {
                            return (
                              <ProductView key={product._id} product={product} col={4}/>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {products.products.map((product) => {
                        return (
                          <ProductView key={product._id} product={product} col={3}/>
                        );
                      })}
                    </>
                  )}
                </div>
              </section>
              { products.resPerPage < products.productsCount && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={products.resPerPage}
                    totalItemsCount={products.productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
}

export default Home;

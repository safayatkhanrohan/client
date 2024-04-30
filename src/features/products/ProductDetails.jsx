import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "./productDetailsSlice";
import toast from "react-hot-toast";
import Carousel from "react-bootstrap/Carousel";

import Loader from "../../components/layout/Loader";
import MetaData from "../../components/layout/MetaData";
import { useParams } from "react-router-dom";
import { addTocart } from "../cart/cartSlice";
function ProductDetails() {
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const [productCount, setProductCount] = useState(1);

  const decreaseProductCount = () => {
    if(productCount > 1) {
      setProductCount(productCount - 1)
    }
  }
  const increaseProductCount = () => {
    if(productCount < product.countInStock) {
      setProductCount(productCount + 1)
    }else {
      toast.error('You have reached the maximum stock limit');
    }
  }
  const { id: ProductId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetails(ProductId));
  }, []);
  if (error) {
    toast.error(error);
  }
  const addToCartHandler = () => {
    dispatch(addTocart({ id: ProductId, quantity: productCount }));
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            <MetaData title={product.name} />
            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${product.rating * 20}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numReviews})</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseProductCount}>-</span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={productCount}
                    readOnly
                  />
                  <span className="btn btn-primary plus" onClick={increaseProductCount}>+</span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={
                      product.countInStock > 0 ? "greenColor" : "redColor"
                    }
                  >
                    {product.countInStock > 0 ? "In stock" : "Out of stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"
                >
                  Submit Your Review
                </button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>
                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default ProductDetails;

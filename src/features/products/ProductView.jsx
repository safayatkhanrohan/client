import { Link } from "react-router-dom";

import { clearError, fetchProducts } from "./productSlice";
function ProductView({ product, col }) {
  return (
    <>
      <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`} key={product._id}>
        <div className="card p-3 rounded">
          <img className="card-img-top mx-auto" src={product.images[0].url} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none"
              >
                {product.name}
              </Link>
            </h5>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${product.rating * 20}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numReviews})</span>
            </div>
            <p className="card-text">${product.price}</p>
            <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductView;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../components/layout/MetaData";
import Sidebar from "../../components/admin/Sidebar";

import { clearErrors, deleteReview, getReviews, reset } from "./reviewSlice";

const ProductReview = () => {
  const { reviews, error, success } = useSelector((state) => state.review);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review deleted successfully.");
      dispatch(reset());
      dispatch(getReviews(productId));
    }
  }, [success, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

    const deleteReviewHandler = (reviewId) => {

        dispatch(deleteReview({productId, reviewId}));
    };


  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <>
        <MetaData title={"Product Reviews"} />
        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>

          <div className="col-12 col-md-10">
            <>
              <div className="row justify-content-center mt-5">
                <div className="col-5">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="productId_field">Enter Product ID</label>
                      <input
                        type="text"
                        id="productId_field"
                        className="form-control"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </div>

                    <button
                      id="search_button"
                      type="submit"
                      className="btn btn-primary btn-block py-2 w-100"
                    >
                      SEARCH
                    </button>
                  </form>
                </div>
              </div>

              {reviews && reviews.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              ) : (
                <p className="mt-5 text-center">No Reviews.</p>
              )}
            </>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductReview;

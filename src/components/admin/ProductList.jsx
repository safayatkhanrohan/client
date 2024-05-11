import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from 'mdbreact'
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { clearError, clearMessage, deleteProduct, getAdminProducts } from "../../features/products/productSlice";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

const ProductList = () => {
  const { allProducts, loading, error, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProducts());
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [message]);





  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    allProducts.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.countInStock,
        actions: (
          <>
            <Link to={`/admin/product/${product._id}`} className="btn btn-primary">
            <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger px-2 py-1 ms-2"
            onClick={() => dispatch(deleteProduct(product._id))}>
            <i className="fa fa-trash"></i>
            </button>
          </>

        ),
      });
    });
    return data;
  };
  return (
    <div className="row">
      <MetaData title={"All Products"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-5">All Products</h1>
        {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setProducts()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
      </div>
    </div>
  );
};

export default ProductList;

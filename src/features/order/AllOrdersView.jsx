import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import Metadata from "../../components/layout/MetaData";
import { clearErrors, getAllOrders } from "./allOrderSlice";
import { clearMessage, deleteOrder } from "./orderSlice";

const AllOrderView = () => {
  const { orders, loading, error } = useSelector(
    (state) => state.allOrders
  );
  const {message} = useSelector(state => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger px-2 py-1 ms-2"
              onClick={() => dispatch(deleteOrder(order._id))}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <div className="container container-fluid">
      <Metadata title={"My Orders"} />
      <h1 className="my-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </div>
  );
};

export default AllOrderView;

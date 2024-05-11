import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUserOrders, clearErrors } from './orderSlice';
import { MDBDataTable } from 'mdbreact'
import Loader from '../../components/layout/Loader';
import Metadata from '../../components/layout/MetaData';
import { Link } from 'react-router-dom';

const ListOrder = () => {
    const {orders, loading, error} = useSelector(state => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLoggedInUserOrders());
    }, [dispatch, error]);
    if (error) {
        toast.error(error);
        dispatch(clearErrors());
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green'}}>{order.orderStatus}</p> : <p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Link to={`/order/${order._id}`} className="btn btn-primary">
                    <i className="fa fa-eye"></i>
                </Link>
            })
        });
        return data;
    }
  return (
    <div className="container container-fluid">
        <Metadata title={'My Orders'}/>
        <h1 className="my-5">My Orders</h1>
        {loading ? <Loader/> : (
            <MDBDataTable
                data={setOrders()}
                className='px-3'
                bordered
                striped
                hover
            />
        )}
        
    </div>
  )
}

export default ListOrder
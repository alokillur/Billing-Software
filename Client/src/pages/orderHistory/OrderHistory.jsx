import './OrderHistory.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { latestOrder } from '../../service/OrderService';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrder();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();  
    }, []);

    const formatItems = (items) => {
        if (!items) return 'No items';
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    if(loading) {
        return <div className='text-center py-4'>Loading orders...</div>;
    }

    if(orders.length === 0) {
        return <div className='text-center py-4'>No orders found</div>;
    }

    return (
        <div className='order-history-container'>
            <h2 className='mb-2 text-light'>All Orders</h2>
            
            <div className="table-responsive">
                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName} <br />
                                <small className='text-muted'>{order.phoneNumber}</small></td>
                                <td>{formatItems(order.items)}</td>
                                <td>₹{order.grandTotal.toFixed(2)}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>{order.paymentDetails?.status || "PENDING"}</span>
                                </td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};  

export default OrderHistory;
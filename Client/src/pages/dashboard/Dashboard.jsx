import './Dashboard.css';
import { getDashboardData } from '../../service/Dashboard';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if(loading) {
    return <div className='loading'>Loading dashboard...</div>
  }

  if(!data) {
    return <div className='error'>Error fetching data</div>
  }

  console.log(data);

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-icon">
                <i className="bi bi-currency-rupee"></i>
              </div>
              <div className="stats-content">
                <h3>Today's Sales</h3>
                <p>₹{(data.todaySales || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-icon">
                <i className="bi bi-cart-check"></i>
              </div>
              <div className="stats-content">
                <h3>Today's Orders</h3>
                <p>{data.todayOrderCount}</p>
              </div>
            </div>
          </div>
          <div className="recent-orders-card">
              <h3 className="recent-orders-title">
                <i className="bi bi-clock-history"></i>
                Recent Orders
              </h3>
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map(order => (
                    <tr key={order.orderId || order.id}>
                      <td>{(order.orderId || order.id).substring(0, 10)}...</td>
                      <td>{order.customerName}</td>
                      <td>₹{order.grandTotal.toFixed(2)}</td>
                      <td>
                        <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>{order.paymentMethod}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${(order.paymentDetails?.status || "PENDING").toLowerCase()}`}>{order.paymentDetails?.status || "PENDING"}</span>
                      </td>
                      <td>{new Date(order.createdAt || order.orderDate).toLocaleString([], {hour: '2-digit', minute: '2-digit'})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;

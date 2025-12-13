import React, { useContext, useState } from 'react';
import './Explore.css';
import AppContext from '../../context/AppContext';
import DisplayCategory from '../../components/displayCategory/DisplayCategory';
import DisplayItems from '../../components/displayItems/DisplayItems';
import CustomerForm from '../../components/customerForm/CustomerForm';
import CartItems from '../../components/cartItems/CartItems';
import CartSummary from '../../components/cartSummary/CartSummary';

function Explore() {

  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <>
      <div className="explore-container text-light" style={{overflowY:'auto'}}>
        <div className="left-column">
          <div className="first-row">
            <DisplayCategory categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          </div>
          <hr className='horizontal-line'/>
          <div className="second-row">
            <DisplayItems selectedCategory={selectedCategory}/>
          </div>
        </div>
        <div className="right-column">
          <div className="customer-form-container flex-shrink-0">
              <CustomerForm customerName={customerName} setCustomerName={setCustomerName} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}/>
          </div>
          <hr className='my-3 text-light'/>
          <div className="cart-items-container flex-grow-1" style={{overflowY:'auto'}}>
              <CartItems />
          </div>
          <div className="cart-summary-container flex-shrink-0">
              <CartSummary />
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore;

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

  return (
    <>
      <div className="explore-container text-light" style={{overflowY:'auto'}}>
        <div className="left-column">
          <div className="first-row">
            <DisplayCategory categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          </div>
          <hr className='horizontal-line'/>
          <div className="second-row">
            <DisplayItems />
          </div>
        </div>
        <div className="right-column">
          <div className="customer-form-container" style={{height:'15%'}}>
              <CustomerForm />
          </div>
          <hr className='my-3 text-light'/>
          <div className="cart-items-container" style={{height:'55%', overflowY:'auto'}}>
              <CartItems />
          </div>
          <div className="cart-summary-container" style={{height:'30%'}}>
              <CartSummary />
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore;

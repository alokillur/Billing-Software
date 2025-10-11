import React, { useContext } from 'react';
import './Explore.css';
import AppContext from '../../context/AppContext';

function Explore() {

  const { categories } = useContext(AppContext);
  console.log(categories);

  return (
    <>
      <div className="explore-container text-light" style={{overflowY:'auto'}}>
        <div className="left-column">
          <div className="first-row">
            {/* ${categories} */}
            categories
          </div>
          <hr className='horizontal-line'/>
          <div className="second-row">
            items
          </div>
        </div>
        <div className="right-column">
          <div className="customer-form-container" style={{height:'15%'}}>
              customer form
          </div>
          <hr className='my-3 text-light'/>
          <div className="cart-items-container" style={{height:'55%', overflowY:'auto'}}>
              cart items
          </div>
          <div className="cart-summary-container" style={{height:'30%'}}>
              cart summary
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore;

import './Category.css';

import React from 'react'

function Category({category, isSelected, onclick}) {
  return (
    <div>
      <div className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover" style={{backgroundColor: category.color, cursor: 'pointer'}} onClick={onclick}>
        <div style={{position: 'relative', marginRight: '15px'}}>
          <img src={category.imgUrl} alt={category.name} className="category-image" />
        </div>
        <div style={{minWidth: 0}}>
          <h6 className="text-white mb-0 text-truncate" title={category.name}>{category.name}</h6>
          <p className='text-white mb-0'>{category.items} Items</p>
        </div> 
        {isSelected && <div className="active-category"></div>} 
      </div>
    </div>
  )
}

export default Category;

import './DisplayItems.css';

import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import Item from '../items/Item';
import SearchBox from '../searchBox/SearchBox';

function DisplayItems({selectedCategory}) {
  const {items} = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item => {
    if(!selectedCategory) {
      return true;
    } else {
      const itemCategoryId = item.category?.categoryId || item.categoryId || item.category;
      return itemCategoryId === selectedCategory;
    }
  }).filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="p-3">
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div className=''></div>
          <div>
            <SearchBox onSearch={setSearchQuery}/>
          </div>
        </div>
        <div className="row g-3">
          {filteredItems.map((item, index) => (
            <div key={index} className="col-xxl-4 col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <Item 
              itemName = {item.name}
              itemPrice = {item.price}
              itemImage = {item.imgUrl}
              itemId = {item.itemId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayItems;

import React from 'react'
import './ManageItems.css'
import ItemForm from '../../components/itemForm/ItemForm';
import ItemList from '../../components/itemList/ItemList';

function ManageItems() {
  return (
    <>
      <div className="items-container text-light">
        <div className="left-container">
            <ItemForm />
        </div>

        <div className="right-container">
            <ItemList />
        </div>
      </div>
    </>
  )
}

export default ManageItems;

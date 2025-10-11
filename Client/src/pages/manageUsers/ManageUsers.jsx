import React from 'react'
import './ManageUsers.css'
import UserForm from '../../components/userForm/UserForm';
import UserList from '../../components/userList/UserList';


function ManageUsers() {
  return (
    <>
      <div className="users-container text-light">
        <div className="left-container">
            <UserForm />
        </div>

        <div className="right-container">
            <UserList />
        </div>
      </div>
    </>
  )
}

export default ManageUsers;

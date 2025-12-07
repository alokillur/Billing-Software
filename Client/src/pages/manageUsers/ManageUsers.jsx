import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/userForm/UserForm';
import UserList from '../../components/userList/UserList';
import { fetchUsers } from '../../service/UserService';
import toast from 'react-hot-toast';


function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchUsersFunction() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsersFunction();
  }, [])
  return (
    <>
      <div className="users-container text-light">
        <div className="left-container">
            <UserForm setUsers={setUsers}/>
        </div>

        <div className="right-container">
            <UserList users={users} setUsers={setUsers}/>
        </div>
      </div>
    </>
  )
}

export default ManageUsers;

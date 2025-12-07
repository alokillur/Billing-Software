import React, { useState } from 'react'
import { addUser } from '../../service/UserService'
import toast from 'react-hot-toast';

function UserForm({setUsers}) {
  const[loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER"
  })

  const onchangeHandler = (e) => {
    const value =  e.target.value;
    const name = e.target.name;
    setData((data) => ({...data, [name]:value}));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const repsonse = await addUser(data)
      setUsers((prevUsers) => [...prevUsers, repsonse.data]);
      toast.success("User Added!");
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
      })
    } catch(error) {
      console.log(error);
      toast.error("Error adding user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-12 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className='form-label'>
                                 Name
                            </label>
                            <input type="text" id='name' name='name' 
                            className='form-control' 
                            placeholder='John Doe' onChange={onchangeHandler} value={data.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='form-label'>
                                 Email address
                            </label>
                            <input type="email" id='email' name='email' 
                            className='form-control' 
                            placeholder='yourname@example.com' onChange={onchangeHandler} value={data.email}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pawword" className='form-label'>
                                 Password
                            </label>
                            <input type="password" id='password' name='password' 
                            className='form-control' 
                            placeholder='**************' onChange={onchangeHandler} value={data.password}/>
                        </div>
                        <button className="mb-3 btn btn-warning w-100" type='submit' disabled={loading}>{loading ? "Loading..." : "Save"}</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserForm

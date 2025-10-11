import React from 'react'

function UserForm() {
  return (
    <>
      <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className='form-label'>
                                 Name
                            </label>
                            <input type="text" id='name' name='name' 
                            className='form-control' 
                            placeholder='Alok Illur' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='form-label'>
                                 Email address
                            </label>
                            <input type="email" id='email' name='email' 
                            className='form-control' 
                            placeholder='yourname@example.com' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pawword" className='form-label'>
                                 Password
                            </label>
                            <input type="password" id='password' name='password' 
                            className='form-control' 
                            placeholder='**************' />
                        </div>
                        <button className="mb-3 btn btn-warning w-100" type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserForm

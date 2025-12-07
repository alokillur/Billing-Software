import toast from 'react-hot-toast';
import './Login.css';
import { useState, useContext } from 'react';
import { loginService } from '../../service/AuthService';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({...data, [name]:value}));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginService(data);
      if (response.status === 200) {
        toast.success("Login successful");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setAuthData(response.data.token, response.data.role);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error)
      toast.error("Email/Password is incorrect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        <div className='bg-light d-flex align-items-center justify-content-center  login-background'>
          <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
            <div className='card-body'>
              <div className="text-center">
                <h1 className='card-title'>Sign in</h1>
                <p className='card-text text-muted'>Sign in to your account</p>
              </div>
              <div className="mt-4">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-4">
                    <label htmlFor="email" className='form-label text-muted'>
                        Email address
                    </label>
                    <input type="email" id='email' name='email' className='form-control' placeholder='yourname@example.com' required  onChange={onChangeHandler} value={data.email}/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className='form-label text-muted'>
                      Password
                    </label>
                    <input type="password" id='password' name='password' className='form-control' placeholder='**************' required onChange={onChangeHandler} value={data.password}/>
                  </div>

                  <div className="d-grid">
                    <button className='btn btn-dark btn-lg' type='submit' disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_conf: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => {
    return state.auth;
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleOnChange = e => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    if (password !== password_conf) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        password_conf
      };

      dispatch(register(userData));
    }
  };

  const { name, email, password, password_conf } = formData;

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaRegUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={handleOnSubmit}>
          <div className='form-group'>
            <input className='form-control' type='text' id='name' name='name' value={name} placeholder='Please enter your name' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='email' id='email' name='email' value={email} placeholder='Please enter your email' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password' name='password' value={password} placeholder='Please enter your password' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password_conf' name='password_conf' value={password_conf} placeholder='Please confirm your password' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Register;
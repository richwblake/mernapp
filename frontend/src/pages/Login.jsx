import { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

const navigate = useNavigate();
const dispatch = useDispatch();

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
    dispatch(login(formData));
  };

  const { isLoading, isError, isSuccess, user, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user ) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch, user, message]);

  const { email, password } = formData;

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaArrowAltCircleRight /> Login
        </h1>
        <p>Please Sign in</p>
      </section>
      <section className='form'>
        <form onSubmit={handleOnSubmit}>
          <div className='form-group'>
            <input className='form-control' type='email' id='email' name='email' value={email} placeholder='Please enter your email' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password' name='password' value={password} placeholder='Please enter your password' onChange={handleOnChange}/>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login;
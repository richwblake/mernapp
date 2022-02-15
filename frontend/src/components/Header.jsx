import { FaRegUser, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const displayHeaderButtons = () => {
    return user ? 
    <li>
      <button className='btn' onClick={handleLogout}>
        <FaRegUser /> Logout
      </button>
    </li> 
    : 
    <>
      <li>
          <Link to='/login'>
            <FaArrowAltCircleRight /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaRegUser /> Register
          </Link>
        </li>
     </> 
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Goali</Link>
      </div>
      <ul>
        {displayHeaderButtons()}
      </ul>
    </header>
  )
}

export default Header;
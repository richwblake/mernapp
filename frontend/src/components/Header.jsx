import { FaRegUser, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Goali</Link>
      </div>
      <ul>
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
      </ul>
    </header>
  )
}

export default Header;
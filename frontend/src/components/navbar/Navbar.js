import { useHistory, useLocation } from 'react-router-dom';
import http from '../../axios';
import Cookies from 'universal-cookie';

export const Navbar = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const location = useLocation();
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleLogoutClick = async () => {
    try {
      const response = await http.post('/users/logout');

      if (response.status === 200) {
        cookies.remove('token');
        history.push('/');
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <ul>
        <li
          onClick={() => {
            history.push('/');
          }}
        >
          Home
        </li>

        {!token && (
          <>
            <li
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </li>
            <li
              onClick={() => {
                history.push('/register');
              }}
            >
              Register
            </li>
          </>
        )}

        {token && <li onClick={handleLogoutClick}>Logout</li>}
      </ul>
    </nav>
  );
};

export default Navbar;

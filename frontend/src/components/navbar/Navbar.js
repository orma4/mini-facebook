import { useHistory, useLocation } from 'react-router-dom';
import http from '../../axios';
import Cookies from 'universal-cookie';
import SearchUsers from '../search-users/SearchUsers';
import { Button, Grid, Paper, Stack, Divider, styled } from '@mui/material';

const StyledNavbar = styled('nav')`
  padding: 10px;
  transition: all 10s;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin: 2rem 0 4rem;
`;

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
        history.push('/login');
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledPaper>
      <StyledNavbar>
        {!token && (
          <Stack
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
          >
            <Button
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                history.push('/register');
              }}
            >
              Register
            </Button>
          </Stack>
        )}

        {token && (
          <Grid container justifyContent='space-between'>
            <Button
              onClick={() => {
                history.push('/');
              }}
            >
              Mini-Facebook
            </Button>

            <SearchUsers />

            <Button onClick={handleLogoutClick}>Logout</Button>
          </Grid>
        )}
      </StyledNavbar>
    </StyledPaper>
  );
};

export default Navbar;

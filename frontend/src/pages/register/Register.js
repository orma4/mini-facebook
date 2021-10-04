import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../ui';
import { Button } from '@mui/material';
import http from '../../axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const Register = () => {
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      history.push('/');
    }
  });

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      const { data } = await http.post('/users/register', {
        fullName,
        email,
        password,
      });

      if (data.token) {
        const dateToRemoveCookie = new Date().setTime(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        cookies.set('token', data.token, {
          path: '/',
          expires: new Date(dateToRemoveCookie),
        });

        history.push('/wall');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label='Full Name' name='fullName' control={control} />
        <TextField label='Email' name='email' control={control} type='email' />
        <TextField
          label='Password'
          name='password'
          control={control}
          type='password'
        />
        <Button type='submit' variant='contained'>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;

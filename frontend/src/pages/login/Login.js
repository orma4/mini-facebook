import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../ui';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import http from '../../axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText } from '@mui/material';
import Cookies from 'universal-cookie';

export const Login = () => {
  const [serverError, setServerError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema) });
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      history.push('/wall');
    }
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await http.post('/users/login', {
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

        cookies.set('userId', data.userId, {
          path: '/',
        });

        history.push('/');
      }
    } catch (e) {
      setServerError(e.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Email'
          name='email'
          control={control}
          type='email'
          helperText={errors?.email?.message}
        />
        <TextField
          label='Password'
          name='password'
          control={control}
          type='password'
          helperText={errors?.password?.message}
        />
        <Button type='submit'>Login</Button>

        {serverError && <FormHelperText error>{serverError}</FormHelperText>}
      </form>
    </div>
  );
};

export const loginFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Required Field'),
  password: yup
    .string()
    .min(2, 'Required Field')
    .max(20, 'Maximum 20 characters long')
    .required('Required Field'),
});

export default Login;

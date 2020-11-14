import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, InputAdornment, TextField, Typography } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import Spinner from '../components/Spinner';

import useFormField, { FormFieldProps } from '../hooks/useFormField';
import { ReduxState } from '../redux';
import { LoginFormData } from '../services/types';
import { authReset, userLogin } from '../redux/actions/AuthActions';

const isValidEmail = (value: string) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value.toLowerCase(),
  );

export const validateFormField = (name: string, value: string, comparedValue?: string): string => {
  if (!value) {
    return 'Required!';
  }
  switch (name) {
    case 'email':
      const validEmail = isValidEmail(value);
      return !validEmail ? `${value} is not a valid email` : '';
    case 'password':
      const validPassword = value.length >= 6;
      return !validPassword ? 'Password must be at least 6 characters' : '';
    case 'name':
      const validName = value.length >= 3 && value.length <= 100;
      return !validName ? 'Name must be 3-100 characters' : '';
    case 'passwordAgain':
      const validPasswordAgain = value === comparedValue;
      return !validPasswordAgain ? "Password doesn't match!" : '';
    default:
      return '';
  }
};

const validateForm = (form: { [key: string]: FormFieldProps<string> }): boolean =>
  Object.entries(form)
    .map(([name, field]) => {
      const error = validateFormField(name, field.value);
      field.setError(error);
      return !error;
    })
    .reduce((res, field) => res && field, true);

const createAuthFormData = (
  form: { [key in keyof LoginFormData]: FormFieldProps<string> },
): LoginFormData =>
  Object.fromEntries(Object.entries(form).map(([name, field]) => [name, field.value])) as {
    [K in keyof LoginFormData]: string;
  };

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, data: userData } = useSelector((state: ReduxState) => state.auth);

  const email = useFormField<string>('');
  const password = useFormField<string>('');

  useEffect(() => {
    if (userData) {
      history.push('/');
    }
  }, [history, userData]);

  const handleChange = (
    formField: FormFieldProps<string>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    formField.handleChange(value);
    if (formField.error && value) {
      formField.setError(validateFormField(name, value));
    }
    if (error) {
      dispatch(authReset());
    }
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const form = { email, password };
    if (!validateForm(form)) {
      return;
    }
    const formData = createAuthFormData(form);
    dispatch(userLogin(formData));
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.spacingTop} />
      <Typography variant='h4' color='primary' className={classes.brand}>
        Punguza
      </Typography>
      <Typography variant='h5' color='primary'>
        Welcome!
      </Typography>
      <Box mt={3}>
        <form onSubmit={onSubmit} method='POST'>
          <TextField
            id='email'
            name='email'
            placeholder='Email'
            className={classes.textField}
            value={email.value}
            onChange={(e) => handleChange(email, e)}
            autoComplete='username'
            error={Boolean(email.error)}
            helperText={email.error}
            margin='normal'
            type='text'
            required
            fullWidth
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonRoundedIcon color='primary' />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id='password'
            name='password'
            placeholder='Password'
            className={classes.textField}
            value={password.value}
            onChange={(e) => handleChange(password, e)}
            autoComplete='current-password'
            error={Boolean(password.error)}
            helperText={password.error}
            margin='normal'
            type='password'
            required
            fullWidth
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <LockRoundedIcon color='primary' />
                </InputAdornment>
              ),
            }}
          />
          <Box height={16} display='flex' justifyContent='center'>
            <Typography variant='caption' color='error' className={classes.error}>
              {error ?? ' '}
            </Typography>
          </Box>
          <Button
            className={classes.loginBtn}
            fullWidth
            variant='contained'
            color='primary'
            type='submit'
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <Spinner size={24} color='white' /> : 'Login'}
          </Button>
          <Typography
            variant='caption'
            color='primary'
            onClick={() => history.push('/signup')}
            className={classes.register}
          >
            Register here
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: '100%',
    textAlign: 'center',
  },
  spacingTop: {
    height: 'calc(50% - 150px)',
  },
  brand: {
    fontFamily: `Billabong, ${theme.typography.fontFamily}`,
    marginBottom: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(0),
    height: 70,
  },
  loginBtn: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  register: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  error: {
    height: theme.spacing(2),
  },
}));

export default Login;

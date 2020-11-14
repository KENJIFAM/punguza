import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import Spinner from '../components/Spinner';

import useFormField, { FormFieldProps } from '../hooks/useFormField';
import { ReduxState } from '../redux';
import { validateFormField } from './Login';
import { SignUpFormData } from '../services/types';
import { authReset, userSignUp } from '../redux/actions/AuthActions';

const validateForm = (
  form: { [key: string]: FormFieldProps<string> },
  comparedValue?: string,
): boolean =>
  Object.entries(form)
    .map(([name, field]) => {
      const error = validateFormField(name, field.value, comparedValue);
      field.setError(error);
      return !error;
    })
    .reduce((res, field) => res && field, true);

const createAuthFormData = (
  form: { [key in keyof SignUpFormData]: FormFieldProps<string> },
): SignUpFormData =>
  Object.fromEntries(Object.entries(form).map(([name, field]) => [name, field.value])) as {
    [K in keyof SignUpFormData]: string;
  };

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, data: userData } = useSelector((state: ReduxState) => state.auth);

  const email = useFormField<string>('');
  const name = useFormField<string>('');
  const password = useFormField<string>('');
  const passwordAgain = useFormField<string>('');

  useEffect(() => {
    if (userData) {
      history.push('/');
    }
  }, [userData, history]);

  const handleChange = (
    formField: FormFieldProps<string>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    formField.handleChange(value);
    if (formField.error && value) {
      formField.setError(validateFormField(name, value, password.value));
    }
    if (error) {
      dispatch(authReset());
    }
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log('ssss');
    if (!validateForm({ email, password, name, passwordAgain }, password.value)) {
      return;
    }
    console.log('ssss');

    const formData = createAuthFormData({ email, name, password });
    dispatch(userSignUp(formData));
  };

  return (
    <Container className={classes.root}>
      <Box pt={5} pb={4} display='flex' alignItems='center'>
        <ArrowBackIcon color='primary' />
        <Typography
          variant='h6'
          component='span'
          color='primary'
          onClick={() => history.push('/login')}
          className={classes.back}
        >
          Back
        </Typography>
      </Box>
      <Typography variant='h5' color='primary' align='center'>
        Enter your details to
      </Typography>
      <Typography variant='h5' color='primary' align='center'>
        create a <span className={classes.free}>free</span> account
      </Typography>
      <Box mt={5}>
        <form onSubmit={onSubmit} method='POST'>
          <TextField
            id='name'
            name='name'
            placeholder='Name'
            className={classes.textField}
            value={name.value}
            onChange={(e) => handleChange(name, e)}
            error={Boolean(name.error)}
            helperText={name.error}
            margin='normal'
            type='text'
            required
            fullWidth
            InputProps={{
              disableUnderline: true,
            }}
          />
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
            }}
          />
          <TextField
            id='passwordAgain'
            name='passwordAgain'
            placeholder='Insert password again'
            className={classes.textField}
            value={passwordAgain.value}
            onChange={(e) => handleChange(passwordAgain, e)}
            error={Boolean(passwordAgain.error)}
            helperText={passwordAgain.error}
            margin='normal'
            type='password'
            required
            fullWidth
            InputProps={{
              disableUnderline: true,
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
            {loading ? <Spinner size={24} color='white' /> : 'Register'}
          </Button>
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
  },
  gridContainer: {
    height: '100%',
    textAlign: 'center',
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
  back: {
    cursor: 'pointer',
  },
  error: {
    height: theme.spacing(2),
  },
  free: {
    fontWeight: 500,
  },
}));

export default Register;

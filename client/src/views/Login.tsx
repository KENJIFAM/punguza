import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onsubmit = () => {
    history.push('/');
  };

  return (
    <Container className={classes.root}>
      <Grid
        container
        alignContent='center'
        justify='center'
        direction='column'
        className={classes.gridContainer}
      >
        <Typography variant='h4' color='primary' className={classes.brand}>
          Punguza
        </Typography>
        <Typography variant='h5' color='primary'>
          Welcome!
        </Typography>
        <Box mt={3}>
          <form onSubmit={onsubmit}>
            <TextField
              id='username'
              name='username'
              placeholder='Username'
              className={classes.textField}
              value={form.username}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
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
            <Button
              className={classes.loginBtn}
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
            <Typography
              variant='caption'
              color='primary'
              onClick={() => setIsRegister(!isRegister)}
              className={classes.register}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </Typography>
          </form>
        </Box>
      </Grid>
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
    marginTop: theme.spacing(4),
  },
  textField: {
    margin: theme.spacing(0.625, 0),
  },
  loginBtn: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
  },
  register: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

export default Login;

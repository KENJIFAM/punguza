import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import NotificationItem from './NotificationItem';
import { Food } from '../services/types';

interface Props {
  foods: Food[];
  notificationCategory: 'expiring' | 'expired' | 'history';
}

const NotificationCategory = (props: Props) => {
  const { foods, notificationCategory } = props;
  const classes = useStyles();

  return (
    <Box>
      <Box px={3}>
        <Typography
          variant='caption'
          color='primary'
          component='p'
          className={classes.notificationCategory}
        >
          {notificationCategory === 'expiring'
            ? 'Expiring soon'
            : notificationCategory === 'expired'
            ? 'Expired products'
            : 'History'}
        </Typography>
      </Box>
      {foods.map((food, i) => (
        <NotificationItem
          key={`${notificationCategory}-${i}`}
          food={food}
          notificationCategory={notificationCategory}
        />
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  notificationCategory: {
    fontWeight: 500,
    letterSpacing: 0.41,
    color: '#c1c2cb',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(3),
  },
}));

export default NotificationCategory;

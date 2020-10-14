import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Notification } from '../services/data';
import NotificationItem from './NotificationItem';

interface Props {
  notifications: Notification[];
  notificationCategoryId: string;
}

const NotificationCategory = (props: Props) => {
  const { notifications, notificationCategoryId } = props;
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
          {notificationCategoryId === 'expiring'
            ? 'Expiring soon'
            : notificationCategoryId === 'expired'
            ? 'Expired products'
            : 'History'}
        </Typography>
      </Box>
      {notifications.map((n, i) => (
        <NotificationItem
          key={`${notificationCategoryId}-${i}`}
          notification={n}
          notificationCategoryId={notificationCategoryId}
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

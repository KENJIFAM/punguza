import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { Notification } from '../services/data';

interface Props {
  notification: Notification;
  notificationCategoryId: string;
}

const NotificationItem = (props: Props) => {
  const { notification, notificationCategoryId } = props;
  const { title, description } = notification;
  const classes = useStyles();

  return (
    <Box className={classes.notification}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='body2' color='primary' className={classes.fontBolder}>
            {title}
          </Typography>
          <Typography variant='body2' color='primary'>
            {description}
          </Typography>
        </Grid>
        <Box
          width={8}
          height={8}
          borderRadius={4}
          className={
            notificationCategoryId === 'expiring'
              ? classes.yellowDot
              : notificationCategoryId === 'expired'
              ? classes.redDot
              : classes.greyDot
          }
        />
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  notification: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 3),
  },
  fontBolder: {
    fontWeight: 700,
  },
  redDot: {
    backgroundColor: theme.palette.error.main,
  },
  yellowDot: {
    backgroundColor: theme.palette.warning.main,
  },
  greyDot: {
    backgroundColor: '#a7a1a1',
  },
}));

export default NotificationItem;

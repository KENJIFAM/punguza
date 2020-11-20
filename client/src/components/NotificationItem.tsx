import React, { useMemo } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Icon, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import { Food, FoodFormData } from '../services/types';
import { ReduxDispatch } from '../redux';
import { updateFood } from '../redux/actions/FoodsActions';

interface Props {
  food: Food;
  notificationCategory: 'expiring' | 'expired' | 'history';
}

const NotificationItem = (props: Props) => {
  const { food, notificationCategory } = props;
  const { id, name, expiredDate, amount, throwed, updatedAt } = food;
  const classes = useStyles();
  const dispatch: ReduxDispatch = useDispatch();

  const nameTxt = `${name} (${amount.unused} ${amount.unit})`;

  const handleThrowFood = async () => {
    const formData: Partial<FoodFormData> = {
      throwed: true,
    };
    dispatch(updateFood({ foodId: id, data: formData }));
  };

  const { title, description } = useMemo(() => {
    switch (notificationCategory) {
      case 'expiring':
        const isToday = moment(expiredDate).diff(moment(), 'day') < 1;
        return {
          title: isToday ? `${nameTxt} will expire today!` : `${nameTxt} about to expire!`,
          description: isToday
            ? 'This is the last day to use this item'
            : 'You should use this item in 2 days',
        };
      case 'expired':
        return {
          title: `${nameTxt} about to expire!`,
          description: 'Please throw this item away',
        };
      default:
        return {
          title: throwed ? nameTxt : name,
          description: throwed
            ? `Expired on ${moment(expiredDate).format('DD.MM.YYYY')}`
            : `Used on ${moment(updatedAt).format('DD.MM.YYYY')}`,
        };
    }
  }, [notificationCategory, expiredDate, nameTxt, throwed, name, updatedAt]);

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
        {notificationCategory === 'expired' ? (
          <Icon className={classes.deleteIcon} onClick={handleThrowFood}>
            <DeleteIcon />
          </Icon>
        ) : (
          <Box width={24} height={24} display='flex' justifyContent='center' alignItems='center'>
            <Box
              width={8}
              height={8}
              borderRadius={4}
              className={notificationCategory === 'expiring' ? classes.yellowDot : classes.greyDot}
            />
          </Box>
        )}
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
  deleteIcon: {
    color: theme.palette.error.dark,
    cursor: 'pointer',
  },
  yellowDot: {
    backgroundColor: theme.palette.warning.main,
  },
  greyDot: {
    backgroundColor: '#a7a1a1',
  },
}));

export default NotificationItem;

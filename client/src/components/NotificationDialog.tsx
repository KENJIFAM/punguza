import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseRounded';
import NotificationCategory from './NotificationCategory';
import { ReduxState } from '../redux';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationDialog = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { usableFoods, expiredFoods, historyFoods: _historyFoods } = useSelector(
    (state: ReduxState) => state.foods.data,
  );

  const expiringFoods = usableFoods.filter((f) => moment(f.expiredDate).diff(moment(), 'day') < 2);
  const historyFoods = [..._historyFoods].sort((a, b) => {
    const dateToCompareA = a.throwed ? a.expiredDate : a.updatedAt;
    const dateToCompareB = b.throwed ? b.expiredDate : b.updatedAt;
    return moment(dateToCompareA).isBefore(moment(dateToCompareB)) ? 1 : -1;
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='body'
      fullScreen={isMobile}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4' component='p' color='primary' className={classes.dialogHeader}>
          Alerts
        </Typography>
        <Icon className={classes.dialogCloseBtn} onClick={onClose}>
          <CloseIcon />
        </Icon>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <NotificationCategory foods={expiringFoods} notificationCategory='expiring' />
        <NotificationCategory foods={expiredFoods} notificationCategory='expired' />
        <NotificationCategory foods={historyFoods} notificationCategory='history' />
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  dialogContent: {
    padding: theme.spacing(2, 0),
  },
  dialogHeader: {
    fontWeight: 500,
    textAlign: 'center',
  },
  dialogCloseBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(4),
  },
}));

export default NotificationDialog;

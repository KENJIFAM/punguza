import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Box, Icon, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import NotificationsIcon from '@material-ui/icons/NotificationsRounded';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { userLogout } from '../redux/actions/AuthActions';
import { ReduxState } from '../redux';

interface Props {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  setDialogOpen: (open: boolean) => void;
}

const Header = (props: Props) => {
  const { searchInput, onSearchInputChange, setDialogOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state: ReduxState) => state.auth.data);
  const { usableFoods, expiredFoods } = useSelector((state: ReduxState) => state.foods.data);

  const expiringFoods = usableFoods.filter((f) => moment(f.expiredDate).diff(moment(), 'day') < 2);

  const hasNotifications = !!expiringFoods.length || !!expiredFoods.length;

  return (
    <Box className={classes.header}>
      <Icon onClick={() => dispatch(userLogout())} className={classes.logout} color='primary'>
        <LogoutIcon width={35} height={35} />
      </Icon>
      <Badge
        overlap='circle'
        invisible={!hasNotifications}
        badgeContent=' '
        classes={{ root: classes.badgeRoot, badge: classes.badge }}
        onClick={() => setDialogOpen(true)}
      >
        <NotificationsIcon fontSize='large' color='primary' />
      </Badge>
      <Typography variant='h4' color='primary' align='center' gutterBottom className={classes.hey}>
        {`Hey ${userData?.name ?? 'Mike'}!`}
      </Typography>
      <Typography variant='body1' color='primary' align='center' className={classes.info}>
        Here is the current status of your foods
      </Typography>
      <TextField
        id='search'
        name='search'
        placeholder='Search for items'
        className={classes.textField}
        value={searchInput}
        onChange={(e) => onSearchInputChange(e.target.value)}
        margin='normal'
        type='text'
        required
        fullWidth
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='primary' />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0, 3),
  },
  hey: {
    fontWeight: 700,
    paddingTop: theme.spacing(4),
  },
  info: {
    maxWidth: 176,
    margin: 'auto',
    letterSpacing: 0.55,
  },
  textField: {
    marginTop: theme.spacing(2.5),
  },
  badge: {
    width: theme.spacing(2),
    minWidth: theme.spacing(2),
    height: theme.spacing(2),
    backgroundColor: theme.palette.error.light,
    top: '32%',
    right: '28%',
  },
  badgeRoot: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
  },
  logout: {
    cursor: 'pointer',
    top: 20,
    position: 'absolute',
    width: 35,
    height: 35,
  },
}));

export default Header;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Box, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import NotificationsIcon from '@material-ui/icons/NotificationsRounded';

interface Props {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  setDialogOpen: (open: boolean) => void;
}

const Header = (props: Props) => {
  const { searchInput, onSearchInputChange, setDialogOpen } = props;
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Badge
        overlap='circle'
        badgeContent=' '
        color='error'
        classes={{ root: classes.badgeRoot, badge: classes.badge }}
        onClick={() => setDialogOpen(true)}
      >
        <NotificationsIcon fontSize='large' />
      </Badge>
      <Typography variant='h4' color='primary' align='center' gutterBottom className={classes.hey}>
        Hey Mike!
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
    top: '32%',
    right: '28%',
  },
  badgeRoot: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
  },
}));

export default Header;

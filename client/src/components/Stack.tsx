import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SadIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import HappyIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIosRounded';

interface Props {
  expiredItems: number;
  empty: boolean;
  onClick: () => void;
}

const Stack = ({ expiredItems, empty, onClick }: Props) => {
  const classes = useStyles(expiredItems);

  const message = empty
    ? 'Your storages are empty, start by adding your food'
    : !expiredItems
    ? 'Your food is in good condition'
    : `You have ${expiredItems} expired item${expiredItems > 1 ? 's' : ''}`;

  const Icon = expiredItems > 0 ? SadIcon : HappyIcon;

  return (
    <Box position='relative' mt={0.5} mx={3} onClick={() => (!!expiredItems ? onClick() : null)}>
      <Box className={classes.stackTop}>
        <Icon className={classes.sadIcon} color='primary' fontSize='large' />
        <Typography variant='body2' color='primary' align='center' className={classes.info}>
          {message}
        </Typography>
        {!!expiredItems && (
          <ArrowForwardIcon className={classes.arrowForwardIcon} color='primary' fontSize='small' />
        )}
      </Box>
      <Box className={classes.stackMid} />
      <Box className={classes.stackBot} />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  stackTop: {
    height: 84,
    width: '100%',
    borderRadius: 13,
    boxShadow: '0 17px 23px -13px #e6e6e6',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 11,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2.5),
    cursor: (expiredItems: number) => (!!expiredItems ? 'pointer' : 'default'),
  },
  stackMid: {
    height: 84,
    borderRadius: 10,
    backgroundColor: '#ecf2f0',
    position: 'absolute',
    top: 5,
    width: 'calc(100% - 25px)',
    left: 12.5,
    zIndex: 2,
  },
  stackBot: {
    height: 84,
    borderRadius: 10,
    backgroundColor: '#dde7e4',
    position: 'absolute',
    width: 'calc(100% - 53px)',
    left: 26.5,
    zIndex: 1,
  },
  info: {
    margin: 'auto',
    letterSpacing: 0.55,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  sadIcon: {
    opacity: 0.5,
  },
  arrowForwardIcon: {
    width: 14,
  },
}));

export default Stack;

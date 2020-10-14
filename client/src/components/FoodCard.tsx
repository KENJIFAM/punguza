import React from 'react';
import classNames from 'classnames';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { Food } from '../services/data';

export interface FoodToRender extends Food {
  categoryName: string;
}

interface Props {
  foodToRender: FoodToRender;
}

const FoodCard = (props: Props) => {
  const { name, brand, icon: Icon, expText, exp, amount, categoryName } = props.foodToRender;
  const classes = useStyles();

  const progressbarColor =
    exp < 0.4
      ? classes.progressbarInnerGreen
      : exp < 0.7
      ? classes.progressbarInnerYellow
      : classes.progressbarInnerRed;

  return (
    <Box className={classes.cardWrapper}>
      <Grid container wrap='nowrap' alignContent='center' className={classes.cardGridContainer}>
        <Grid item className={classes.cardGridIcon}>
          <Box className={classes.cardIcon}>
            <Icon width={24} height={24} />
          </Box>
        </Grid>
        <Grid container justify='space-between' alignContent='center'>
          <Box>
            <Typography variant='body2' color='primary' className={classes.fontBold}>
              {name}
            </Typography>
            {brand && (
              <Typography variant='caption' color='primary' component='p'>
                {brand}
              </Typography>
            )}
            <Typography variant='caption' color='error' component='p'>
              {expText}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='center' flexDirection='column'>
            <Typography variant='body2' color='primary' className={classes.fontBold}>
              {`${amount.value} ${amount.unit}`}
            </Typography>
            <Typography variant='caption' color='primary' className={classes.categoryName}>
              {categoryName}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.progressbar}>
        <Box
          className={classNames(classes.progressbarInner, progressbarColor)}
          style={{ width: `${exp * 100}%` }}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 13,
    boxShadow: '0 17px 23px -13px #e6e6e6, 0 2px 24px 0 rgba(0, 0, 0, 0.12)',
    marginBottom: theme.spacing(1),
    height: 84,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative',
  },
  cardGridContainer: {
    height: '100%',
  },
  cardGridIcon: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
  },
  cardIcon: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    height: 40,
    width: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    opacity: 0.8,
  },
  progressbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 7,
    backgroundColor: '#d8d8d8',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  progressbarInner: {
    height: 7,
    borderBottomLeftRadius: 13,
  },
  progressbarInnerRed: {
    backgroundColor: theme.palette.error.main,
  },
  progressbarInnerYellow: {
    backgroundColor: theme.palette.warning.light,
  },
  progressbarInnerGreen: {
    backgroundColor: theme.palette.secondary.main,
  },
  fontBold: {
    fontWeight: 500,
  },
}));

export default FoodCard;

import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Collapse, Grid, Slider, TextField, Typography } from '@material-ui/core';
import { Food, FoodFormData } from '../services/types';
import { icons } from '../services/data';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch, ReduxState } from '../redux';
import Spinner from './Spinner';
import { updateFood } from '../redux/actions/FoodsActions';

interface Props {
  foodToRender: Food;
}

const getExpiringPercentage = (expiredDate: string) => {
  const maxDuration = moment.duration(7, 'days').asHours();
  const remainingDuration = moment(expiredDate).diff(moment(), 'hours');
  const expiringPercentage = ((maxDuration - remainingDuration) / maxDuration) * 100;
  return expiringPercentage > 5 ? expiringPercentage : 5;
};

const FoodCard = (props: Props) => {
  const { id, name, brand, icon, amount, expiredDate, storage } = props.foodToRender;
  const classes = useStyles();
  const dispatch: ReduxDispatch = useDispatch();

  const { loading } = useSelector((state: ReduxState) => state.foods);

  const [open, setOpen] = useState(false);
  const [amountToUse, setAmountToUse] = useState(Math.round(amount.unused / 2));

  const Icon = icons.filter((ico) => ico.id === icon)[0]?.icon;
  const remainingDays = moment(expiredDate).diff(moment(), 'day');
  const progressbarColorClass =
    remainingDays < 2
      ? classes.progressbarInnerRed
      : remainingDays < 4
      ? classes.progressbarInnerYellow
      : classes.progressbarInnerGreen;
  const expText =
    remainingDays < 1
      ? 'Expiring today'
      : `${moment.duration(remainingDays, 'days').humanize({ d: 8, w: 4 })} left`;

  const onSubmit = async () => {
    const formData: Partial<FoodFormData> = {
      amount: {
        ...amount,
        unused: amount.unused - amountToUse,
      },
    };
    const result = await dispatch(updateFood({ foodId: id, data: formData }));
    if (updateFood.fulfilled.match(result)) {
      setOpen(false);
    }
  };

  const renderFoodInfo = () => (
    <Grid
      container
      wrap='nowrap'
      alignContent='center'
      className={classes.cardGridContainer}
      onClick={() => setOpen(!open)}
    >
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
          <Typography
            variant='caption'
            color={remainingDays < 2 ? 'error' : 'inherit'}
            component='p'
          >
            {expText}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='center' flexDirection='column'>
          <Typography variant='body2' color='primary' className={classes.fontBold}>
            {`${amount.unused} ${amount.unit}`}
          </Typography>
          <Typography
            variant='caption'
            color='primary'
            align='right'
            className={classes.categoryName}
          >
            {storage.name}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const renderEditFood = () => (
    <Collapse in={open} timeout='auto' unmountOnExit>
      <Box className={classes.editBox}>
        <Typography
          variant='body2'
          color='primary'
          align='center'
          gutterBottom
          className={classes.fontBold}
        >
          Select amount to use
        </Typography>
        <Box display='flex' alignItems='center'>
          <TextField
            className={classes.amountField}
            value={amountToUse}
            onChange={(e) => setAmountToUse(Number(e.target.value))}
            type='number'
            required
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.inputRoot,
                input: classes.input,
              },
            }}
          />
          <Typography variant='body2' color='primary' component='span' className={classes.fontBold}>
            {amount.unit}
          </Typography>
        </Box>
        <Box py={1} px={2}>
          <Slider
            value={amountToUse}
            max={amount.unused}
            onChange={(_, value) => setAmountToUse(value as number)}
            classes={{
              thumb: classes.sliderThumb,
              active: classes.active,
            }}
          />
        </Box>
        <Button variant='contained' color='primary' fullWidth onClick={onSubmit} disabled={loading}>
          {loading ? <Spinner size={24} color='white' /> : `Use ${name.toLowerCase()}`}
        </Button>
      </Box>
    </Collapse>
  );

  const renderProgressbar = () => (
    <Box className={classNames(classes.progressbar, open && classes.progressbarExpand)}>
      <Box
        className={classNames(
          classes.progressbarInner,
          progressbarColorClass,
          open && classes.progressbarInnerExpand,
        )}
        style={{ width: `${getExpiringPercentage(expiredDate)}%` }}
      />
    </Box>
  );

  return (
    <Box className={classes.cardWrapper}>
      {renderEditFood()}
      {renderProgressbar()}
      {renderEditFood()}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 13,
    boxShadow: '0 17px 23px -13px #e6e6e6, 0 2px 24px 0 rgba(0, 0, 0, 0.12)',
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  cardGridContainer: {
    height: 77,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    cursor: 'pointer',
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
    bottom: 0,
    left: 1.47,
    right: 1.47,
    height: 7,
    transition: 'margin 300ms, border-radius 300ms',
    backgroundColor: '#d8d8d8',
    borderRadius: '0 0 13px 13px / 0 0 7px 7px',
  },
  progressbarExpand: {
    borderRadius: 7,
    margin: theme.spacing(0, 2, 2),
    transition: 'margin 300ms, border-radius 300ms',
  },
  progressbarInner: {
    height: 7,
    borderRadius: '0 0 0 13px / 0 0 0 7px',
    transition: 'border-radius 300ms',
  },
  progressbarInnerExpand: {
    borderRadius: 7,
    transition: 'border-radius 300ms',
  },
  progressbarInnerRed: {
    backgroundColor: theme.palette.error.light,
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
  editBox: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  amountField: {
    marginLeft: 'calc(50% - 46px)',
    marginRight: theme.spacing(1),
  },
  inputRoot: {
    border: `1px solid ${theme.palette.grey['500']}`,
    padding: theme.spacing(0.375, 1.25),
    color: theme.palette.primary.main,
    fontWeight: 500,
    maxWidth: 92,
  },
  input: {
    textAlign: 'center',
    [`&::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button`]: {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  active: {},
  sliderThumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    marginTop: -11,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
}));

export default FoodCard;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import FoodCard from './FoodCard';
import { Food } from '../services/types';

interface Props {
  foodsToRender: Food[];
}

const FoodList = (props: Props) => {
  const { foodsToRender } = props;
  const classes = useStyles();

  return (
    <Box className={classes.listWrapper}>
      {foodsToRender.map((food) => (
        <FoodCard key={food.id} foodToRender={food} />
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    padding: theme.spacing(2.5, 3),
    overflowY: 'auto',
    height: 'calc(100% - 352px)',
  },
}));

export default FoodList;

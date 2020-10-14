import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import FoodCard, { FoodToRender } from './FoodCard';

interface Props {
  foodToRender: FoodToRender[];
}

const FoodList = (props: Props) => {
  const { foodToRender } = props;
  const classes = useStyles();

  return (
    <Box className={classes.listWrapper}>
      {foodToRender.map((food) => (
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

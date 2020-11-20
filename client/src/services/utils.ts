import moment from 'moment';
import { Food } from './types';

export const categorizeFoods = (foods: Food[]): Food[][] =>
  foods.reduce(
    ([usableFoods, expiredFoods, historyFoods]: Food[][], food) => {
      if (food.amount.unused === 0 || food.throwed) {
        historyFoods.push(food);
      } else if (moment().isBefore(moment(food.expiredDate))) {
        usableFoods.push(food);
      } else {
        expiredFoods.push(food);
      }
      return [usableFoods, expiredFoods, historyFoods];
    },
    [[], [], []],
  );

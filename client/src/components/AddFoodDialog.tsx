import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import { DatePicker } from '@material-ui/pickers';
import useFormField, { FormFieldProps } from '../hooks/useFormField';
import moment, { Moment } from 'moment';
import { icons } from '../services/data';
import { ReduxDispatch, ReduxState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { addFood, clearErrorFoods } from '../redux/actions/FoodsActions';
import { FoodFormData, Unit } from '../services/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

const validateFormField = (name: string, value: any): string => {
  if (name !== 'brand' && !value) {
    return 'Required!';
  }
  switch (name) {
    case 'name':
      const validName = value.length >= 3 && value.length <= 100;
      return !validName ? 'Name must be 3-100 characters' : '';
    case 'amount':
      return value <= 0 ? 'Value must be more than 0' : '';
    default:
      return '';
  }
};

const validateForm = (form: { [key: string]: FormFieldProps<any> }): boolean =>
  Object.entries(form)
    .map(([name, field]) => {
      const error = validateFormField(name, field.value);
      field.setError(error);
      return !error;
    })
    .reduce((res, field) => res && field, true);

const UNITS = ['g', 'ml', 'pcs'];

const AddFoodDialog = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch: ReduxDispatch = useDispatch();

  const storages = useSelector((state: ReduxState) => state.storages.data);
  const { error, loading } = useSelector((state: ReduxState) => state.foods);

  const name = useFormField('');
  const icon = useFormField('pumpkin');
  const brand = useFormField('');
  const amount = useFormField<number | ''>('');
  const unit = useFormField<Unit>('g');
  const purchasedDate = useFormField<Moment | null>(moment());
  const expiredDate = useFormField<Moment | null>(moment().add(3, 'days'));
  const storage = useFormField(storages[0].id);

  const [iconDialogOpen, setIconDialogOpen] = useState(false);

  const FoodIcon = icons.filter((ico) => ico.id === icon.value)[0].icon;

  const setIcon = (id: string) => {
    icon.handleChange(id);
    setIconDialogOpen(false);
  };

  const handleChange = (
    formField: FormFieldProps<any>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    if (name === 'amount' && value !== '') {
      formField.handleChange(Number(value));
    } else {
      formField.handleChange(value);
    }
    if (formField.error && value) {
      formField.setError(validateFormField(name, value));
    }
    if (error) {
      dispatch(clearErrorFoods());
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const form = { name, icon, brand, amount, unit, purchasedDate, expiredDate, storage };
    if (!validateForm(form) || !amount.value || !purchasedDate.value || !expiredDate.value) {
      return;
    }
    const formData: FoodFormData = {
      name: name.value,
      icon: icon.value,
      brand: brand.value,
      amount: {
        total: amount.value,
        unused: amount.value,
        unit: unit.value,
      },
      purchasedDate: purchasedDate.value.toISOString(),
      expiredDate: expiredDate.value.endOf('day').toISOString(),
      storage: storage.value,
    };
    const result = await dispatch(addFood(formData));
    if (addFood.fulfilled.match(result)) {
      onClose();
    }
  };

  const renderIconsDialog = () => (
    <Dialog open={iconDialogOpen} fullWidth maxWidth='xs' onClose={() => setIconDialogOpen(false)}>
      <DialogContent className={classes.iconDialogContent}>
        {icons.map((ico) => (
          <Icon key={ico.id} onClick={() => setIcon(ico.id)} className={classes.iconWrapper}>
            <ico.icon width={36} height={36} />
          </Icon>
        ))}
      </DialogContent>
    </Dialog>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='body'
      fullWidth
      maxWidth='xs'
      classes={{
        paper: classes.dialogPaper,
      }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='body1' color='primary' className={classes.dialogHeader}>
          Add a new food item
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onSubmit} method='POST'>
          <Box className={classes.fieldGroup}>
            <Grid container wrap='nowrap' spacing={2}>
              <Grid item container>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Name
                </Typography>
                <TextField
                  name='name'
                  placeholder='Name'
                  value={name.value}
                  onChange={(e) => handleChange(name, e)}
                  error={Boolean(name.error)}
                  helperText={name.error}
                  type='text'
                  required
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Icon
                </Typography>
                <Box className={classes.cardIcon} onClick={() => setIconDialogOpen(true)}>
                  <FoodIcon width='100%' height='100%' />
                </Box>
                {renderIconsDialog()}
              </Grid>
            </Grid>
            <Typography variant='caption' color='primary' className={classes.fieldLabel}>
              Brand (optional)
            </Typography>
            <TextField
              name='brand'
              placeholder='Insert brand here'
              value={brand.value}
              onChange={(e) => handleChange(brand, e)}
              type='text'
              fullWidth
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.inputRoot,
                },
              }}
            />
          </Box>
          <Box className={classes.fieldGroup}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Amount
                </Typography>
                <TextField
                  name='amount'
                  placeholder='Insert amount here'
                  value={amount.value}
                  onChange={(e) => handleChange(amount, e)}
                  error={Boolean(amount.error)}
                  helperText={amount.error}
                  type='number'
                  required
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Unit
                </Typography>
                <TextField
                  name='unit'
                  defaultValue={'grams'}
                  value={unit.value}
                  onChange={(e) => handleChange(unit, e)}
                  select
                  required
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                  SelectProps={{
                    IconComponent: ExpandMoreIcon,
                    classes: {
                      root: classes.selectRoot,
                      icon: classes.selectIcon,
                    },
                  }}
                >
                  {UNITS.map((unit) => (
                    <MenuItem key={unit} value={unit} className={classes.menuItem}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.fieldGroup}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Purchased date
                </Typography>
                <DatePicker
                  name='purchasedDate'
                  value={purchasedDate.value}
                  onChange={purchasedDate.handleChange}
                  format='DD/MM/YYYY'
                  required
                  fullWidth
                  showTodayButton
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='primary' className={classes.fieldLabel}>
                  Expiration date
                </Typography>
                <DatePicker
                  name='expiredDate'
                  value={expiredDate.value}
                  onChange={expiredDate.handleChange}
                  format='DD/MM/YYYY'
                  required
                  fullWidth
                  showTodayButton
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.fieldGroup}>
            <Typography variant='caption' color='primary' className={classes.fieldLabel}>
              Stored in
            </Typography>
            <Box display='flex'>
              {storages.map((s) => (
                <Button
                  key={s.id}
                  className={classes.storageBtn}
                  variant={s.id === storage.value ? 'contained' : 'text'}
                  color='primary'
                  onClick={() => storage.handleChange(s.id)}
                >
                  <strong>{s.name}</strong>
                </Button>
              ))}
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Box className={classes.actionsWrapper}>
          <Box height={24} display='flex' justifyContent='center' alignItems='flex-start'>
            <Typography variant='caption' color='error' className={classes.error}>
              {error ?? ''}
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <Spinner size={24} color='white' /> : 'Add new food'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    borderRadius: 13,
  },
  dialogTitle: {
    position: 'relative',
  },
  dialogContent: {
    padding: theme.spacing(0),
  },
  dialogActions: {
    padding: theme.spacing(2, 3, 5),
  },
  dialogHeader: {
    fontWeight: 500,
    textAlign: 'center',
  },
  fieldGroup: {
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:first-child': {
      paddingTop: 0,
    },
  },
  fieldLabel: {
    fontWeight: 700,
    padding: theme.spacing(1, 0.75, 0.5),
    display: 'block',
    '&:first-child': {
      paddingTop: 0,
    },
  },
  // textField: {
  //   margin: theme.spacing(0.5, 0, 1),
  // },
  inputRoot: {
    border: `1px solid ${theme.palette.grey['500']}`,
    padding: theme.spacing(0.375, 1.25),
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  selectRoot: {
    height: '1.1876em',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  selectIcon: {
    right: 10,
  },
  menuItem: {
    fontSize: 12,
    fontWeight: 500,
  },
  storageBtn: {
    height: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  cardIcon: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    height: 40,
    width: 40,
    borderRadius: 20,
    cursor: 'pointer',
  },
  iconWrapper: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
    borderRadius: 20,
    height: 40,
    width: 40,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // '&:hover': {
    //   backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    // },
  },
  iconDialogContent: {
    display: 'flex',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: theme.spacing(3),
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  error: {
    // height: theme.spacing(2),
  },
}));

export default AddFoodDialog;

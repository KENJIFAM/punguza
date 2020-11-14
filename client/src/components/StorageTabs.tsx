import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Box, Tab, Tabs } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../redux';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StorageTabs = (props: Props) => {
  const { value, onChange } = props;
  const classes = useStyles();

  const storages = useSelector((state: ReduxState) => state.storages.data);
  const foods = useSelector((state: ReduxState) => state.foods.data.usableFoods);

  const renderTabLabel = (id: string) => {
    const storage = storages.find((c) => c.id === id);
    const storageFoods = foods.filter((f) => f.storage.id === storage?.id);
    return id !== 'ALL' ? (
      <Box display='flex' flexWrap='nowrap'>
        {storage?.name}
        <span className={classes.foodAmount}>{storageFoods.length}</span>
      </Box>
    ) : (
      <Box display='flex' flexWrap='nowrap'>
        {'All food'}
        <span className={classes.foodAmount}>{foods.length}</span>
      </Box>
    );
  };

  return (
    <Box className={classes.tabWrapper}>
      <Tabs
        value={value}
        onChange={(e, newTab) => onChange(newTab)}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='auto'
      >
        <Tab label={renderTabLabel('ALL')} value='ALL' />
        {storages.map((storage) => (
          <Tab key={storage.id} label={renderTabLabel(storage.id)} value={storage.id} />
        ))}
        {/* <Tab label={<AddIcon fontSize='small' />} value='NEW' /> */}
      </Tabs>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  tabWrapper: {
    padding: theme.spacing(6, 3, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  foodAmount: {
    backgroundColor: lighten(theme.palette.primary.main, 0.9),
    color: theme.palette.primary.main,
    fontSize: 11,
    letterSpacing: 0.35,
    marginLeft: 5,
    padding: theme.spacing(0.125, 1),
    borderRadius: 8,
  },
}));

export default StorageTabs;

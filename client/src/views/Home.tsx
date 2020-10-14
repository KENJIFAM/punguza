import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { darken, lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Badge,
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import NotificationsIcon from '@material-ui/icons/NotificationsRounded';
import SadIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIosRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { categories, Food, Notification, notifications } from '../services/data';

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);

  const foodToRender = useMemo(() => {
    if (tab === 'ALL') {
      return categories
        .flatMap((c) => c.food.map((f) => ({ ...f, categoryName: c.name })))
        .sort((a, b) => (a.exp < b.exp ? 1 : -1));
    }
    const cat = categories.find((c) => c.id === tab);
    return (
      cat?.food
        .map((f) => ({ ...f, categoryName: cat.name }))
        .sort((a, b) => (a.exp < b.exp ? 1 : -1)) ?? []
    );
  }, [tab]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const renderStack = () => (
    <Box position='relative' mt={0.5} mx={3}>
      <Box className={classes.stackTop}>
        <SadIcon className={classes.sadIcon} color='primary' fontSize='large' />
        <Typography variant='body2' color='primary' align='center' className={classes.info}>
          You have 3 expired items
        </Typography>
        <ArrowForwardIcon className={classes.arrowForwardIcon} color='primary' fontSize='small' />
      </Box>
      <Box className={classes.stackMid} />
      <Box className={classes.stackBot} />
    </Box>
  );

  const renderTabLabel = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    return id !== 'ALL' ? (
      <Box display='flex' flexWrap='nowrap'>
        {cat?.name}
        <span className={classes.foodAmount}>{cat?.food.length}</span>
      </Box>
    ) : (
      <Box display='flex' flexWrap='nowrap'>
        {'All food'}
        <span className={classes.foodAmount}>{categories.flatMap((c) => c.food).length}</span>
      </Box>
    );
  };

  const renderFoodCard = (
    { id, name, brand, icon: Icon, expText, exp, amount }: Food,
    category: string,
  ) => {
    const progressbarColor =
      exp < 0.4
        ? classes.progressbarInnerGreen
        : exp < 0.7
        ? classes.progressbarInnerYellow
        : classes.progressbarInnerRed;

    return (
      <Box key={id} className={classes.cardWrapper}>
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
              <Typography variant='caption' color='primary' className={classes.foodCatName}>
                {category}
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

  const renderNotification = (cat: string, notification: Notification, idx: number) => (
    <Box key={`${cat}-${idx}`} className={classes.notification}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='body2' color='primary' className={classes.fontBolder}>
            {notification.title}
          </Typography>
          <Typography variant='body2' color='primary'>
            {notification.description}
          </Typography>
        </Grid>
        <Box
          width={8}
          height={8}
          borderRadius={4}
          className={
            cat === 'expiring'
              ? classes.progressbarInnerYellow
              : cat === 'expired'
              ? classes.progressbarInnerRed
              : classes.colorGrey
          }
        />
      </Grid>
    </Box>
  );

  const renderNotificationCategory = (cat: string, notifications: Notification[]) => (
    <Box key={cat}>
      <Box px={3}>
        <Typography
          variant='caption'
          color='primary'
          component='p'
          className={classes.alertCategory}
        >
          {cat === 'expiring'
            ? 'Expiring soon'
            : cat === 'expired'
            ? 'Expired products'
            : 'History'}
        </Typography>
      </Box>
      {notifications.map((n, i) => renderNotification(cat, n, i))}
    </Box>
  );

  const renderNotificationDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      scroll='body'
      fullScreen={isMobile}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4' component='p' color='primary' className={classes.dialogHeader}>
          Alerts
        </Typography>
        <Icon className={classes.dialogCloseBtn} onClick={() => setDialogOpen(false)}>
          <CloseIcon />
        </Icon>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {Object.entries(notifications).map(([cat, notifications]) =>
          renderNotificationCategory(cat, notifications),
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Container className={classes.root}>
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
        <Typography
          variant='h4'
          color='primary'
          align='center'
          gutterBottom
          className={classes.hey}
        >
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
          onChange={handleSearchInputChange}
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
      {renderStack()}
      <Box className={classes.main}>
        <Box className={classes.tabWrapper}>
          <Tabs
            value={tab}
            onChange={(e, newTab) => setTab(newTab)}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
          >
            <Tab label={renderTabLabel('ALL')} value='ALL' />
            <Tab label={renderTabLabel('FRIDGE')} value='FRIDGE' />
            <Tab label={renderTabLabel('FREEZER')} value='FREEZER' />
            <Tab label={renderTabLabel('PANTRY')} value='PANTRY' />
            {/* <Tab label={<AddIcon fontSize='small' />} value='NEW' /> */}
          </Tabs>
        </Box>
        <Box className={classes.listWrapper}>
          {foodToRender.map((f) => renderFoodCard(f, f.categoryName))}
        </Box>
      </Box>
      {renderNotificationDialog()}
      <IconButton className={classes.addButton}>
        <AddIcon className={classes.addIcon} />
      </IconButton>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
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
    padding: theme.spacing(2.5),
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
  sadIcon: {
    opacity: 0.5,
  },
  arrowForwardIcon: {
    width: 14,
  },
  main: {
    backgroundColor: '#fafafa',
    height: '100%',
    marginTop: 53,
    borderRadius: 13,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
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
  listWrapper: {
    padding: theme.spacing(2.5, 3),
    overflowY: 'auto',
    height: 'calc(100% - 352px)',
  },
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
  fontBold: {
    fontWeight: 500,
  },
  fontBolder: {
    fontWeight: 700,
  },
  foodCatName: {
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
    backgroundColor: theme.palette.warning.main,
  },
  progressbarInnerGreen: {
    backgroundColor: theme.palette.secondary.main,
  },
  colorGrey: {
    backgroundColor: '#a7a1a1',
  },
  addButton: {
    width: 60,
    height: 60,
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    bottom: 50,
    right: theme.spacing(2),
    '&:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
    },
  },
  addIcon: {
    color: theme.palette.common.white,
    width: 50,
    height: 50,
  },
  dialogTitle: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  dialogContent: {
    padding: theme.spacing(2, 0),
  },
  dialogHeader: {
    fontWeight: 500,
    textAlign: 'center',
  },
  dialogCloseBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(4),
  },
  alertCategory: {
    fontWeight: 500,
    letterSpacing: 0.41,
    color: '#c1c2cb',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(3),
  },
  notification: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 3),
  },
}));

export default Home;

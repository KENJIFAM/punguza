import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress, Box } from '@material-ui/core';

interface Props {
  size?: number;
  color?: 'primary' | 'white';
  multi?: boolean;
}

const Spinner = (props: Props) => {
  const classes = useStyles(props);
  return <Box className={classes.root}>{props.multi && <CircularProgress />}</Box>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'transparent',
      width: ({ size }: Props) => size ?? 64,
      height: ({ size }: Props) => size ?? 64,
      borderRadius: '100%',
      border: ({ size, color }: Props) =>
        `${(size ?? 64) / 10}px solid ${
          color === 'white' ? theme.palette.common.white : theme.palette.primary.light
        }`,
      borderBottomColor: 'transparent',
      display: 'inline-block',
      animation: '$clip 0.75s 0s infinite linear',
      animationFillMode: 'both',
    },
    '@keyframes clip': {
      '0%': { transform: 'rotate(0deg) scale(1)' },
      '50%': { transform: 'rotate(180deg) scale(0.8)' },
      '100%': { transform: 'rotate(360deg) scale(1)' },
    },
  }),
);

export default Spinner;

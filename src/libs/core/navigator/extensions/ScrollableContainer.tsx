import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    position: 'relative',
    height: 'calc(100% - 64px * 2)',
    paddingRight: '4px'
  }
}));

export default function ScrollableContainer({ children, ...props }: any) {
  const classes = useStyles();

  return <div className={classes.root} {...props}>{children}</div>;
}

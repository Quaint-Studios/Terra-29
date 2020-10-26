import React from 'react';

import { makeStyles } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  leftDiv: {
    width: '256px',
    flexShrink: 0
  },
  rightDiv: {
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function Navigator({ children }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <Sidebar />
      </div>
      <div className={classes.rightDiv}>
        <Topbar />
        {children}
      </div>
    </div>
  );
}

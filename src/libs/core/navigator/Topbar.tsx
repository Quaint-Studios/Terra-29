import clsx from 'clsx';
import React, { useState } from 'react';

import {
  AppBar,
  Badge,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar
} from '@material-ui/core';
import {
  ChatBubbleOutline as MessagesIcon,
  Input as InputIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  PowerSettingsNew,
  Settings
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1
  },
  navButton: {}
}));

export default function Topbar(props: ITopbar) {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  const [messages] = useState([]);

  return (
    <AppBar
      color="primary"
      {...rest}
      className={clsx(classes.root, className)}
      elevation={0}
      position="sticky"
    >
      <Toolbar>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton className={classes.navButton} color="inherit">
            <Badge badgeContent={12 || messages.length} color="primary">
              <MessagesIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.navButton} color="inherit">
            <Badge badgeContent={4 || notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.navButton} color="inherit">
            <Settings />
          </IconButton>
          <IconButton className={classes.navButton} color="inherit">
            <PowerSettingsNew width="100%" />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

interface ITopbar {
  className?: string;
  onSidebarOpen?: () => void;
}

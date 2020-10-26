import React from 'react';
import { Link } from 'react-router-dom';

import { appTitle } from '@libs/core/contexts/AppConstants';

import ScrollableContainer from './extensions/ScrollableContainer';
import {
  Divider,
  Drawer,
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  Eco,
  AccountBox as AccountBoxIcon,
  Dashboard as DashboardIcon,
  Image as ImageIcon,
  LockOpen as LockOpenIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ShoppingBasket as ShoppingBasketIcon,
  TextFields as TextFieldsIcon
} from '@material-ui/icons';
import ProfileItem from './ProfileItem';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 256,
    [theme.breakpoints.up('lg')]: {
      height: '100%'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(2)
  },
  navItem: {
    height: '64px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light
  },
  navItemElement: {
    marginLeft: theme.spacing(1)
  }
}));

export default function Sidebar(props: ISidebar) {
  let { open, variant, onClose, className, ...rest } = props;

  if (open === undefined) {
    open = true;
  }

  if (variant === undefined) {
    variant = 'persistent';
  }

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Products',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Authentication',
      href: '/sign-in',
      icon: <LockOpenIcon />
    },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
      color="secondary"
    >
      <Link to="/" className="inherit-a">
        <ListItem className={classes.navItem}>
          <Eco />
          <Typography variant="h6" className={classes.navItemElement}>
            <b>{appTitle}</b>
          </Typography>
        </ListItem>
      </Link>
      <ScrollableContainer />
      <ListItem className={classes.navItem}>
        <ProfileItem />
      </ListItem>
    </Drawer>
  );
}

interface ISidebar {
  className?: string;
  onClose?: () => void;
  open?: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary' | undefined;
}

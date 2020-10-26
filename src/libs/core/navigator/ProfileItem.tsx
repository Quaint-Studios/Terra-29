import React from 'react';

import { Avatar, Badge, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    position: 'relative',
    height: '100%',
    paddingRight: '4px'
  }
}));

const ProfileBadge = withStyles((theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700 !important',
      color: '#44b700 !important',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
    }
  })
)(Badge);

export default function ProfileItem({ children, ...props }: any) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ProfileBadge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          color="primary"
          overlap="circle"
          variant="dot"
        >
          <Avatar
            variant="circle"
            src="https://material-app.bootlab.io/static/img/avatars/avatar-1.jpg"
          />
        </ProfileBadge>
      </Grid>
      <Grid item>
        <Typography variant="body2">Elaine Kurst</Typography>
        <Typography variant="caption">Secret Spy</Typography>
      </Grid>
    </Grid>
  );
}

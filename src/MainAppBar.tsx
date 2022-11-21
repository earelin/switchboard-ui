import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  handleDrawerOpen: VoidFunction;
  drawerOpen: boolean;
};

export default function MainAppBar({ handleDrawerOpen, drawerOpen }: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Switchboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

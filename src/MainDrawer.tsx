import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import theme from 'tailwindcss/defaultTheme';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { Link } from 'react-router-dom';

type Props = {
  toggle: VoidFunction;
  open: boolean;
};

export default function MainDrawer({ toggle, open }: Props) {
  return (
    <Drawer open={open}>
      <div>
        <IconButton onClick={toggle}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List component="nav">
        <ListSubheader>Configuration</ListSubheader>
        <ListItem component={Link} to="/environments">
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Environments" />
        </ListItem>
      </List>
    </Drawer>
  );
}

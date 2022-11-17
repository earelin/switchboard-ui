import { Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

type Props = {
  links?: Array<{
    href: string;
    label: string;
  }>;
};

export default function MainBreadcrumbs(props: Props) {
  return (
    <Breadcrumbs role="navigation" aria-label="breadcrumb">
      <Link key={0} underline="hover" color="inherit" href="/">
        <HomeIcon fontSize="inherit" />
        Home
      </Link>
      {props.links &&
        props.links.map((link, i) => (
          <Link key={i + 1} underline="hover" color="inherit" href={link.href}>
            {link.label}
          </Link>
        ))}
    </Breadcrumbs>
  );
}

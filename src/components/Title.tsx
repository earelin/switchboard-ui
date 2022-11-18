import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  'data-testid'?: string;
};

export default function Title(props: Props) {
  return (
    <Typography
      role="heading"
      component="h1"
      variant="h4"
      color="neutral"
      gutterBottom
      data-testid={props['data-testid']}
    >
      {props.children}
    </Typography>
  );
}

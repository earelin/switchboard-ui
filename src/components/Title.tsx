import Typography from "@mui/material/Typography";
import {ReactNode} from "react";

type Props = {
  children: ReactNode
}

export default function Title(props: Props) {
  return (
    <Typography component="h1" variant="h4" color="neutral" gutterBottom>
      {props.children}
    </Typography>
  );
}

import Typography from "@mui/material/Typography";
import {ReactNode} from "react";

type Props = {
  children: ReactNode
}

export default function Title(props: Props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

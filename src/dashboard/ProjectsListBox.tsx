import BoxTitle from "../components/BoxTitle";
import {Link, List} from "@mui/material";
import {
  Link as RouterLink
} from 'react-router-dom';

export default function ProjectsListBox() {
  return (
    <>
      <BoxTitle>Projects</BoxTitle>
      <List>

      </List>
      <Link component={RouterLink} to="/projects">
        More ...
      </Link>
    </>
  )
}

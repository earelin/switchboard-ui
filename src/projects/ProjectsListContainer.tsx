import Title from "../components/Title";
import {Link, List} from "@mui/material";
import {
  Link as RouterLink
} from 'react-router-dom';

export default function ProjectsListContainer() {
  return (
    <>
      <Title>Projects</Title>
      <List>

      </List>
      <Link component={RouterLink} to="/projects">
        More ...
      </Link>
    </>
  )
}

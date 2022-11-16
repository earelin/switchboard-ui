import BoxTitle from '../components/BoxTitle';
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLastUpdatedProjects, Project } from '../clients/api/projects';
import React from 'react';
import { Page } from '../clients/api/paginations';

export default function ProjectsListBox() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['last-projects'],
    queryFn: () => getLastUpdatedProjects(),
  });

  return (
    <>
      <BoxTitle>Projects</BoxTitle>
      <ProjectList isLoading={isLoading} isError={isError} data={data} />
      <Link key="link" component={RouterLink} to="/projects">
        <Typography align="right">More</Typography>
      </Link>
    </>
  );
}

type ProjectListProps = {
  isLoading: boolean;
  isError: boolean;
  data: Page<Project> | undefined;
};

function ProjectList(props: ProjectListProps) {
  return (
    <>
      {props.isLoading ? (
        <>
          {[...Array(5)].map((item, i) => (
            <Skeleton key={i} variant="rectangular" height={75} />
          ))}
        </>
      ) : props.isError ? (
        'Error!'
      ) : props.data ? (
        <ProjectListInner data={props.data} />
      ) : null}
    </>
  );
}

type ProjectListInnerProps = {
  data: Page<Project>;
};

function ProjectListInner(props: ProjectListInnerProps) {
  return (
    <List role="navigation">
      {props.data.content.map((project) => (
        <React.Fragment key={project.key}>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary={<ListItemTitle id={project.key} text={project.name} />}
              secondary={project.description}
            />
          </ListItem>
        </React.Fragment>
      ))}
      <Divider key="last-divider" variant="middle" component="li" />
    </List>
  );
}

type ListItemTitleProps = {
  text: string;
  id: string;
};

function ListItemTitle(props: ListItemTitleProps) {
  return (
    <Link role="link" component={RouterLink} to={`/projects/${props.id}`}>
      {props.text}
    </Link>
  );
}

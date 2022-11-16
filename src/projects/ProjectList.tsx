import Title from '../components/Title';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getSortedProjects, Project } from '../clients/api/projects';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import ReactQueryLoader from '../components/ReactQueryLoader';

export default function ProjectList() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Title>Projects</Title>
      <ProjectListComponent />
    </Container>
  );
}

function ProjectListComponent() {
  const page = 0;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getSortedProjects({ page }),
  });

  return (
    <ReactQueryLoader data={data} isLoading={isLoading} isError={isError}>
      <Grid container spacing="10">
        {data?.content.map((project, i) => (
          <ProjectListItem key={i} project={project} />
        ))}
      </Grid>
    </ReactQueryLoader>
  );
}

type ProjectListItemProps = {
  project: Project;
};

function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography component="div">
            <Link component={RouterLink} to={`/projects/${project.key}`}>
              {project.name}
            </Link>
            <Typography variant="body2">{project.description}</Typography>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

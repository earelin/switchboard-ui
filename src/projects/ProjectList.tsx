import Title from '../components/Title';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getSortedProjects, Project } from '../clients/api/projects';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import ReactQueryLoader from '../components/ReactQueryLoader';
import MainBreadcrumbs from '../components/MainBreadcrumbs';
import AddProject from './AddProject';

export default function ProjectList() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MainBreadcrumbs />
      <Grid item container>
        <Grid item xs={10}>
          <Title>Projects</Title>
        </Grid>
        <Grid item xs={2} textAlign="right">
          <AddProject />
        </Grid>
      </Grid>
      <ProjectListComponent />
    </Container>
  );
}

function ProjectListComponent() {
  const [page, setPage] = useState(0);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => getSortedProjects({ page }),
  });

  return (
    <ReactQueryLoader data={data} isLoading={isLoading} isError={isError}>
      <Grid container spacing="10">
        {data?.content.map((project, i) => (
          <ProjectListItem key={i} project={project} />
        ))}
      </Grid>
      <Stack alignItems="center" sx={{ marginTop: '1rem' }}>
        <Pagination
          page={page + 1}
          count={Math.ceil((data?.total ?? 0) / (data?.request?.size ?? 12))}
          onChange={(event, page) => setPage(page - 1)}
        />
      </Stack>
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

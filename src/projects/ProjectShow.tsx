import { CircularProgress, Container, Typography } from '@mui/material';
import Title from '../components/Title';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '../clients/api/projects';
import MainBreadcrumbs from '../components/MainBreadcrumbs';

export default function ProjectShow() {
  const { projectKey } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`project-${projectKey}`],
    queryFn: () => getProject(projectKey ?? ''),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MainBreadcrumbs />
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        'Error!'
      ) : data ? (
        <>
          <Title>{data.name}</Title>
          <Typography variant="body1">{data.description}</Typography>
        </>
      ) : null}
    </Container>
  );
}

import BoxTitle from '../components/BoxTitle';
import { Link, List } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLastUpdatedProjects } from '../clients/api/projects';

export default function ProjectsListBox() {
  const [projects, setProjects] = useState([]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getLastUpdatedProjects(),
  });

  return (
    <>
      <BoxTitle>Projects</BoxTitle>
      <List></List>
      <Link component={RouterLink} to="/projects">
        More ...
      </Link>
    </>
  );
}

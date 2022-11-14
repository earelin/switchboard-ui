import { Page, SortDirection } from './paginations';
import { fetchGet } from './util';

export type Project = {
  key: string;
  name: string;
  description?: string;
};

export function getLastUpdatedProjects(
  page = 0,
  size = 10
): Promise<Page<Project>> {
  const queryString = new URLSearchParams({
    page: String(page),
    size: String(size),
    'sort.direction': SortDirection.DESC,
    'sort.property': 'updated',
  });

  return fetchGet<Page<Project>>(`/projects?${queryString}`);
}

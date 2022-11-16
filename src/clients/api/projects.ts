import { Page, PageRequest, SortDirection } from './paginations';
import { fetchGet } from './util';

export type Project = {
  key: string;
  name: string;
  description?: string;
};

export function getLastUpdatedProjects(
  page = 0,
  size = 5
): Promise<Page<Project>> {
  const queryString = new URLSearchParams({
    page: String(page),
    size: String(size),
    'sort.direction': SortDirection.DESC,
    'sort.property': 'updated',
  });

  return fetchGet<Page<Project>>(`/projects?${queryString}`);
}

export function getSortedProjects(
  request?: PageRequest
): Promise<Page<Project>> {
  const queryString = new URLSearchParams({
    page: request?.page?.toString() ?? '0',
    size: request?.size?.toString() ?? '15',
    'sort.direction': request?.sort?.direction ?? SortDirection.ASC,
    'sort.property': request?.sort?.property ?? 'name',
  });

  return fetchGet<Page<Project>>(`/projects?${queryString}`);
}

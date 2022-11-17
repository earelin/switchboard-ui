import { Page, PageRequest, SortDirection } from './paginations';
import { fetchGet, NotFoundError } from './util';

export type Project = {
  key: string;
  name: string;
  description?: string;
  created: Date;
  updated: Date;
};

export type ProjectDto = {
  key: string;
  name: string;
  description?: string;
  created: string;
  updated: string;
};

export async function getLastUpdatedProjects(
  pageNumber = 0,
  size = 5
): Promise<Page<Project>> {
  const queryString = new URLSearchParams({
    page: String(pageNumber),
    size: String(size),
    'sort.direction': SortDirection.DESC,
    'sort.property': 'updated',
  });

  const page = await fetchGet<Page<ProjectDto>>(`/projects?${queryString}`);

  return {
    ...page,
    content: page.content.map(fromProjectDtoToDomain) as Project[],
  };
}

export async function getSortedProjects(
  request?: PageRequest
): Promise<Page<Project>> {
  const queryString = new URLSearchParams({
    page: request?.page?.toString() ?? '0',
    size: request?.size?.toString() ?? '15',
    'sort.direction': request?.sort?.direction ?? SortDirection.ASC,
    'sort.property': request?.sort?.property ?? 'name',
  });

  const page = await fetchGet<Page<ProjectDto>>(`/projects?${queryString}`);

  return {
    ...page,
    content: page.content.map(fromProjectDtoToDomain) as Project[],
  };
}

export async function getProject(key: string): Promise<Project | null> {
  try {
    const project = await fetchGet<ProjectDto | null>(`/projects/${key}`);
    return fromProjectDtoToDomain(project);
  } catch (e) {
    if (e instanceof NotFoundError) {
      return null;
    }
    throw e;
  }
}

function fromProjectDtoToDomain(projectDto: ProjectDto | null) {
  if (!projectDto) {
    return null;
  }

  return {
    ...projectDto,
    created: new Date(projectDto.created),
    updated: new Date(projectDto.updated),
  };
}

import { Page, PageRequest, SortDirection } from './paginations';
import { fetchGet, fetchPost, NotFoundError } from './util';

export type ProjectBase = {
  key: string;
  name: string;
  description?: string;
};

export type Project = ProjectBase & {
  created: Date;
  updated: Date;
};

export type ProjectDto = ProjectBase & {
  created: string;
  updated: string;
};

export type CreateProject = ProjectBase;

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
    size: request?.size?.toString() ?? '12',
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

export async function createProject(
  createProject: CreateProject
): Promise<Project | null> {
  const createdProject = await fetchPost<CreateProject, ProjectDto>(
    '/projects',
    createProject
  );
  return fromProjectDtoToDomain(createdProject);
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

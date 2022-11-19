import { rest } from "msw";
import orderBy from 'lodash.orderby';
import projectsList from './data/projects-list.json';
import { SortDirection } from '../../src/clients/api/paginations';
import { CreateProject } from "../../src/clients/api/projects";

export const projectsHandlers = [
  rest.get('/projects', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') ?? '0');
    const size = parseInt(req.url.searchParams.get('size') ?? '10');
    const sortDirection =
      (req.url.searchParams.get('sort.direction') as SortDirection) ??
      SortDirection.ASC;
    const sortProperty = req.url.searchParams.get('sort.property') ?? 'name';

    return res(
      ctx.json({
        content: orderBy(projectsList, [sortProperty], [sortDirection]).slice(
          page * size,
          (page + 1) * size
        ),
        total: projectsList.length,
        request: {
          page,
          size,
          sort: {
            direction: sortDirection,
            property: sortProperty,
          },
        },
      })
    );
  }),

  rest.get('/projects/:projectKey', (req, res, ctx) => {
    const projectKey = req.params.projectKey;
    const project = projectsList.find(project => projectKey === project.key)

    if (!project) {
      return res(
        ctx.status(404)
      );
    }

    return res(
      ctx.json(project)
    );
  }),

  rest.post('/projects', async (req, res, ctx) => {
    const now = new Date();
    const createProjectRequest = await req.json<CreateProject>();
    const project = {
      ...createProjectRequest,
      created: now,
      updated: now
    };

    return res(
      ctx.json(project)
    )
  })
];

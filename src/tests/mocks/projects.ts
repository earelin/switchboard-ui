import { rest } from 'msw';
import orderBy from 'lodash.orderby';
import projectsList from './data/projects-list.json';
import { SortDirection } from '../../clients/api/paginations';

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
];

import { getLastUpdatedProjects } from './projects';
import { SortDirection } from './paginations';

describe('API client - Projects', () => {
  describe('getLastUpdatedProjects', () => {
    test('Should import last updated projects', async () => {
      const projects = await getLastUpdatedProjects(1, 4);

      expect(projects).toMatchObject({
        total: 12,
        request: {
          page: 1,
          size: 4,
          sort: {
            direction: SortDirection.DESC,
            property: 'updated',
          },
        },
      });

      expect(projects.content.map((project) => project.key)).toEqual([
        'switchboard',
        'gmail',
        'python',
        'elasticsearch',
      ]);
    });
  });
});

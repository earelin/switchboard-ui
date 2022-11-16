import { getLastUpdatedProjects, getSortedProjects } from './projects';
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

    test('Should get projects default request', async () => {
      const projects = await getSortedProjects();

      expect(projects).toMatchObject({
        total: 12,
        request: {
          page: 0,
          size: 15,
          sort: {
            direction: SortDirection.ASC,
            property: 'name',
          },
        },
      });
      expect(projects.content.map((project) => project.key)).toEqual([
        'android',
        'apache',
        'chromium',
        'dart',
        'elasticsearch',
        'gmail',
        'istio',
        'jenkins',
        'kubernetes',
        'nginx',
        'python',
        'switchboard',
      ]);
    });

    test('Should get projects paginated', async () => {
      const projects = await getSortedProjects({ page: 1, size: 3 });

      expect(projects).toMatchObject({
        total: 12,
        request: {
          page: 1,
          size: 3,
          sort: {
            direction: SortDirection.ASC,
            property: 'name',
          },
        },
      });
      expect(projects.content.map((project) => project.key)).toEqual([
        'dart',
        'elasticsearch',
        'gmail',
      ]);
    });

    test('Should get projects sorted', async () => {
      const projects = await getSortedProjects({
        page: 1,
        size: 3,
        sort: { direction: SortDirection.DESC, property: 'key' },
      });

      expect(projects).toMatchObject({
        total: 12,
        request: {
          page: 1,
          size: 3,
          sort: {
            direction: SortDirection.DESC,
            property: 'key',
          },
        },
      });
      expect(projects.content.map((project) => project.key)).toEqual([
        'kubernetes',
        'jenkins',
        'istio',
      ]);
    });
  });
});

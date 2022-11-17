import {
  getLastUpdatedProjects,
  getProject,
  getSortedProjects,
} from './projects';
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

  describe('getSortedProjects', () => {
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

  describe('getProject', () => {
    const EXISTING_PROJECT = {
      key: 'switchboard',
      name: 'Switchboard',
      description: 'A Feature Flag system.',
      created: new Date('2022-11-19T23:15:30.000Z'),
      updated: new Date('2022-11-21T20:23:50.000Z'),
    };

    test('Should get existing project', async () => {
      const project = await getProject(EXISTING_PROJECT.key);

      expect(project).toEqual(EXISTING_PROJECT);
    });

    test('Should get not existing project', async () => {
      const project = await getProject('not-existing');

      expect(project).toBeNull();
    });
  });
});

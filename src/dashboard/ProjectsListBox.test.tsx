import { render, screen } from '@testing-library/react';
import ProjectsListBox from './ProjectsListBox';
import TestApp from '../../tests/TestApp';
import { MemoryRouter } from 'react-router-dom';

describe('ProjectListBox component testing', () => {
  test('Should load projects', async () => {
    render(
      <TestApp>
        <MemoryRouter>
          <ProjectsListBox />
        </MemoryRouter>
      </TestApp>
    );

    await screen.findByRole('navigation');

    expect(
      screen
        .getAllByTestId('project-title')
        .map((listitem) => listitem.textContent)
    ).toEqual(['Vim', 'Git', 'Libreoffice', 'Sentry', 'Kubernetes']);
  });
});

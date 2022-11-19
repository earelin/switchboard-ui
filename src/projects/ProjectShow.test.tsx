import { render, screen } from '@testing-library/react';
import ProjectShow from './ProjectShow';
import { useParams } from 'react-router-dom';
import React from 'react';
import { when } from 'jest-when';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('react-router-dom');

const PROJECT_KEY = 'kubernetes';

describe('ProjectShow', () => {
  test('Should show project data', async () => {
    when(useParams).mockReturnValue({
      projectKey: PROJECT_KEY,
    });
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ProjectShow />
      </QueryClientProvider>
    );

    await screen.findByTestId('project-name');

    expect(screen.getByTestId('project-name')).toHaveTextContent('Kubernetes');
    expect(screen.getByTestId('project-description')).toHaveTextContent(
      'Container orchestration system.'
    );
  });
});

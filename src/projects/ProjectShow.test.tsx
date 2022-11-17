import { render, screen } from '@testing-library/react';
import ProjectShow from './ProjectShow';
import { useParams } from 'react-router-dom';
import React from 'react';
import TestApp from '../../tests/TestApp';
import { when } from 'jest-when';

jest.mock('react-router-dom');

const PROJECT_KEY = 'switchboard';

describe('ProjectShow', () => {
  test.skip('Should show project data', async () => {
    when(useParams).mockReturnValue({
      projectKey: PROJECT_KEY,
    });
    render(
      <TestApp>
        <ProjectShow />
      </TestApp>
    );

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('Kubernetes');
  });
});

import { render } from '@testing-library/react';
import TestApp from '../../tests/TestApp';
import ProjectList from './ProjectList';

describe('ProjectList', () => {
  test('Should return project list', () => {
    render(
      <TestApp>
        <ProjectList />
      </TestApp>
    );
  });
});

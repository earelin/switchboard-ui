import { screen, render, fireEvent } from '@testing-library/react';
import AddProject from './AddProject';
import TestApp from '../../tests/TestApp';

describe('AddProject', () => {
  test('Should show dialog closed by default', async () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );

    expect(screen.queryByTestId('add-project-dialog')).toBeNull();
  });

  test('Should open the dialog on add button click', async () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );

    fireEvent.click(screen.getByTestId('add-project-button'));

    expect(screen.getByTestId('add-project-dialog')).toBeVisible();
  });

  test('Should close the dialog on close button click', async () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );
    fireEvent.click(screen.getByTestId('add-project-button'));

    fireEvent.click(screen.getByTestId('add-project-dialog-close'));

    expect(
      screen.queryByTestId('add-project-dialog-content')
    ).not.toBeVisible();
  });

  test('Should show error if name is empty', () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );
    fireEvent.click(screen.getByTestId('add-project-button'));

    fireEvent.change(screen.getByTestId('project-key'), {
      target: { value: 'switchboard' },
    });
    fireEvent.click(screen.getByTestId('add-project-dialog-save'));

    return expect(
      screen.findByText('Name should not be empty')
    ).resolves.toBeVisible();
  });

  test('Should show error if key is empty', () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );
    fireEvent.click(screen.getByTestId('add-project-button'));

    fireEvent.change(screen.getByTestId('project-name'), {
      target: { value: 'Switchboard' },
    });
    fireEvent.click(screen.getByTestId('add-project-dialog-save'));

    return expect(
      screen.findByText('Key should not be empty')
    ).resolves.toBeVisible();
  });

  test.skip('Should disable controls on add', () => {
    render(
      <TestApp>
        <AddProject />
      </TestApp>
    );
    fireEvent.click(screen.getByTestId('add-project-button'));
    fireEvent.change(screen.getByTestId('project-name'), {
      target: { value: 'Switchboard' },
    });
    fireEvent.change(screen.getByTestId('project-key'), {
      target: { value: 'switchboard' },
    });

    fireEvent.click(screen.getByTestId('add-project-dialog-save'));

    expect(screen.getByTestId('project-name')).toBeDisabled();
    expect(screen.getByTestId('project-key')).toBeDisabled();
    expect(screen.getByTestId('project-description')).toBeDisabled();
  });
});

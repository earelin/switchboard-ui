import { screen, render, fireEvent } from '@testing-library/react';
import AddProject from './AddProject';

describe('AddProject', () => {
  test('Should show dialog closed by default', async () => {
    render(<AddProject />);

    expect(screen.queryByTestId('add-project-dialog')).toBeNull();
  });

  test('Should open the dialog on add button click', async () => {
    render(<AddProject />);

    fireEvent.click(screen.getByTestId('add-project-button'));

    expect(screen.getByTestId('add-project-dialog')).toBeVisible();
  });

  test('Should close the dialog on close button click', async () => {
    render(<AddProject />);
    fireEvent.click(screen.getByTestId('add-project-button'));

    fireEvent.click(screen.getByTestId('add-project-dialog-close'));

    expect(
      screen.queryByTestId('add-project-dialog-content')
    ).not.toBeVisible();
  });
});

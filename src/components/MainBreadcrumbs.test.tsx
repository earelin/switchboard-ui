import MainBreadcrumbs from './MainBreadcrumbs';
import { render, screen } from '@testing-library/react';

describe('MainBreadcrumbs', () => {
  test('Should show home item by default', async () => {
    render(<MainBreadcrumbs />);

    await screen.findByRole('navigation');

    expect(screen.getByText('Home')).not.toBeNull();
  });

  test('Should show links', async () => {
    const LINKS = [
      {
        label: 'Projects',
        href: '/projects',
      },
      {
        label: 'Switchboard',
        href: '/projects/switchboard',
      },
    ];
    render(<MainBreadcrumbs links={LINKS} />);

    await screen.findByRole('navigation');

    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(
      ['Home', 'Projects', 'Switchboard']
    );
  });
});

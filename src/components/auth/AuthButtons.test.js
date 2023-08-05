import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from "swr";
import { createServer } from "../../test/server";
import AuthButtons from './AuthButtons';

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>

  );
  await screen.findAllByRole('link');
}

describe('when user is not signed in', () => {
  createServer([
    {
      method: 'get',
      path: '/api/user',
      res: () => {
        return {
          user: null,
        };
      }
    }
  ]);

  test('sign in and sign up are visible', async () => {
    await renderComponent();
    const signIn = screen.getByRole('link', { name: /sign in/i });
    const signUp = screen.getByRole('link', { name: /sign up/i });
    expect(signIn).toHaveAttribute('href', '/signin');
    expect(signUp).toHaveAttribute('href', '/signup');
    expect(signIn).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();
  });

  test('sign out is not visible', async () => {
    await renderComponent();
    const signOut = screen.queryByRole('link', { name: /sign out/i });
    expect(signOut).not.toBeInTheDocument();
  });
});

describe('when user is signed in', () => {
  createServer([
    {
      method: 'get',
      path: '/api/user',
      res: () => {
        return {
          user: {
            id: 1,
            email: 'email@email.email',
          },
        };
      }
    }
  ]);

  test('sign out is visible', async () => {
    await renderComponent();
    const signOut = screen.getByRole('link', { name: /sign out/i });
    expect(signOut).toHaveAttribute('href', '/signout');
  });

  test('sign in and sign out are not visible', async () => {
    await renderComponent();
    const signIn = screen.queryByRole('link', { name: /sign in/i });
    const signUp = screen.queryByRole('link', { name: /sign up/i });
    expect(signIn).not.toBeInTheDocument();
    expect(signUp).not.toBeInTheDocument();
  });
});


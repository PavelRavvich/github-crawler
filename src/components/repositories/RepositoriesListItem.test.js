import { screen, render, } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    language: 'JavaScript',
    full_name: 'facebook/react',
    description: 'A JS lib',
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return repository;
}

test('displays information about the repository', async () => {
  const repository = renderComponent();

  await screen.findByRole('img', { name: /javascript/i });
  const link = screen.getByRole('link', { name: /github repository/i });

  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a file icon with  the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', {
    name: /javascript/i
  });

  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const repository = renderComponent();

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login)
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});



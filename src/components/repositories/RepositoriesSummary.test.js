import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test('displays information about the repository', async () => {
  const repository = {
    language: 'JavaScript',
    stargazers_count: 15,
    open_issues: 100,
    forks: 20,
  };
  render(<RepositoriesSummary repository={repository} />);

  Object.entries(repository).forEach(([_, value]) => {
    const regex = new RegExp(`${value}`, 'i');
    const element = screen.getByText(regex);
    expect(element).toBeInTheDocument();
  });
});

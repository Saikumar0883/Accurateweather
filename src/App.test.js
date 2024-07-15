import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  
  // Using a function matcher to find the text
  const linkElement = await screen.findByText((content, element) => {
    // Example of a flexible matcher based on element structure
    return element.textContent.includes('learn react');
  }, { exact: false });

  expect(linkElement).toBeInTheDocument();
});

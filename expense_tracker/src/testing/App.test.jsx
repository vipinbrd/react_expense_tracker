import { render, screen } from "@testing-library/react";
import App from "../App";

test("first test", () => {
  const { container } = render(<App />);
  console.log(container.innerHTML);  // Logs the HTML content of the rendered component

  const contact = screen.getByText(/Privacy Policy/i);
  expect(contact).toBeInTheDocument();
});

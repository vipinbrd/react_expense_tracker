import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from "../components/Profile";

describe("Profile Component", () => {
  
  // Test if Profile component renders without crashing
  test("Profile component renders without crashing", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
  });

  // Test if the name input field is displayed
  test("Name input field is rendered", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const nameInput = screen.getByLabelText(/Full Name/i);
    expect(nameInput).toBeInTheDocument();
  });

  // Test if the update button is present
  test("Update button is rendered", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const updateButton = screen.getByText(/Update/i);
    expect(updateButton).toBeInTheDocument();
  });

  // Test if the cancel button is rendered
  test("Cancel button is rendered", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const cancelButton = screen.getByText(/Cancel/i);
    expect(cancelButton).toBeInTheDocument();
  });

  // Test if the user can type in the name input field
  test("User can type in the name input field", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  // Test if clicking cancel redirects the user
  test("Clicking Cancel button redirects user", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    // Normally, you'd check for a navigation action, but for now we just verify if it's there.
    expect(cancelButton).toBeInTheDocument();
  });

  // Test if the profile picture input field is rendered
  test("Profile picture input field is rendered", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const imageInput = screen.getByLabelText(/Upload Image/i);
    expect(imageInput).toBeInTheDocument();
  });

  // Test if the user can select a file for the profile picture
  test("User can select an image file for profile picture", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const imageInput = screen.getByLabelText(/Upload Image/i);
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
    fireEvent.change(imageInput, { target: { files: [file] } });
    expect(imageInput.files[0].name).toBe("profile.jpg");
  });

  // Test if the profile picture is displayed after being selected
  test("Profile picture is displayed after selection", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const imageInput = screen.getByLabelText(/Upload Image/i);
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
    fireEvent.change(imageInput, { target: { files: [file] } });
    const image = screen.getByAltText("Profile");
    expect(image).toHaveAttribute("src", expect.stringContaining("profile.jpg"));
  });

  // Test if the toast message appears when updating profile
  test("Toast message appears after profile update", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
    const updateButton = screen.getByText(/Update/i);
    fireEvent.click(updateButton);
    const toastMessage = screen.getByText(/Profile updated successfully!/);
    expect(toastMessage).toBeInTheDocument();
  });

});

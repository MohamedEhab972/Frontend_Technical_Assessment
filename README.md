Project Management Tool
A simple project management tool that allows users to add, view, and manage projects efficiently.
---
Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. Install dependencies (if applicable):
   ```bash
   npm install
   ```

3. Run the application:
   - Open the `index.html` file directly in your browser, or
   - Use a local server like `Live Server` for better compatibility.

---
Features Implemented

1. Add Projects:
   Users can add a new project with the following fields:
   - Project Name  
   - Priority  
   - Deadline  
   - Status  
   - Team Members (selectable from checkboxes)

2. Form Validation:
   Ensures all required fields are filled and valid before adding a project.

3. Dynamic Team Members Selection:
   Users can select team members dynamically using checkboxes.

4. Local Storage Integration:
   All projects are saved to `localStorage` to persist data between sessions.

5. Feedback System:
   Displays success and error messages based on the user's actions.

6. Clear Form After Submission:
   Resets the form fields after successfully adding a project.

---
Technical Decisions Explained

1. Plain JavaScript:
   The project was developed using vanilla JavaScript for simplicity and ease of understanding.

2. Local Storage:
   Data is stored in `localStorage` for simplicity instead of using a complex database.

3. Validation Mechanism:
   Validation uses CSS classes (`is-valid` and `is-invalid`) to ensure the user fills all fields correctly.

4. Modular Functions:
   The code is structured into reusable functions for better maintainability and scalability.

---
Assumptions Made

1. All input fields are mandatory, and invalid fields will prevent project submission.  
2. Team members are predefined and selectable using checkboxes.  
3. Projects are saved in `localStorage` as an array of JSON objects.  
4. The "Add" button is only functional when all fields are valid.

---
How to Test the Application

1. Open the project in your browser.  
2. Fill in the required fields:
   - Project Name
   - Priority
   - Deadline
   - Status
3. Select team members using the checkboxes.  
4. Click the "Add" button.  
5. Verify:
   - The project appears in the displayed list.
   - The project is saved in `localStorage` (check via browser developer tools).
6. Test invalid inputs (e.g., leave fields empty) to confirm error handling works as expected.

---
Example Code to Test the Add Functionality

Below is an example test case for the `addProject` function:

```javascript
import { addProject } from "../main.js";

test("should add a project if all fields are valid", () => {
  document.body.innerHTML = `
    <input id="ProjectName" value="Test Project" class="is-valid">
    <input id="ProjectPriority" value="High" class="is-valid">
    <input id="ProjectDeadline" value="2025-01-01" class="is-valid">
    <input id="ProjectStatus" value="To Do" class="is-valid">
    <button id="AddButton"></button>
  `;
  addProject();
  expect(localStorage.getItem("project")).toContain("Test Project");
});
```

---
Contact

For any questions or suggestions, please contact:  
**Email**: Mohamedehab972@gmail.com  



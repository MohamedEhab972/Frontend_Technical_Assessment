let ProjectName = document.getElementById("ProjectName");
let ProjectPriority = document.getElementById("ProjectPriority");
let ProjectDeadline = document.getElementById("ProjectDeadline");
let ProjectStatus = document.getElementById("ProjectStatus");
let UpdateButton = document.getElementById("UpdateButton");
let AddButton = document.getElementById("AddButton");
var ProjectSearch = document.getElementById("search");

const validClasses =
  "is-valid bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500 rounded-lg";
const invalidClasses =
  "is-invalid bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 rounded-lg";

let ptr;
let Array;
if (localStorage.getItem("project") == null) {
  Array = [];
} else {
  Array = JSON.parse(localStorage.getItem("project"));
  display(Array);
}

function addProject() {
  try {
    showLoading();
    setTimeout(() => {
      try {
        if (
          ProjectName.classList.contains("is-valid") &&
          ProjectDeadline.classList.contains("is-valid") &&
          ProjectPriority.classList.contains("is-valid") &&
          ProjectStatus.classList.contains("is-valid")
        ) {
          let selectedMembers = [];
          document
            .querySelectorAll(
              "#teamMembersSection input[type='checkbox']:checked"
            )
            .forEach((checkbox) => {
              selectedMembers.push(checkbox.value);
            });

          let project = {
            name: ProjectName.value,
            priority: ProjectPriority.value,
            deadline: ProjectDeadline.value,
            status: ProjectStatus.value,
            teamMembers: selectedMembers,
          };

          Array.push(project);
          clear();
          display(Array);
          localStorage.setItem("project", JSON.stringify(Array));
          ProjectName.classList.remove(...validClasses.split(" "));
          ProjectPriority.classList.remove(...validClasses.split(" "));
          ProjectDeadline.classList.remove(...validClasses.split(" "));
          ProjectStatus.classList.remove(...validClasses.split(" "));
          showSuccess("Project added successfully!");
        } else {
          throw new Error("Invalid input. Please fill all fields correctly.");
        }
      } catch (error) {
        showError(error.message);
      } finally {
        hideLoading();
      }
    }, 1000);
  } catch (error) {
    showError("An unexpected error occurred: " + error.message);
    hideLoading();
  }
}

function clear() {
  try {
    ProjectName.value = "";
    ProjectPriority.value = "";
    ProjectDeadline.value = "";
    ProjectStatus.value = "";

    document
      .querySelectorAll("#teamMembersSection input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    ProjectName.classList.remove(
      ...validClasses.split(" "),
      ...invalidClasses.split(" ")
    );
    ProjectPriority.classList.remove(
      ...validClasses.split(" "),
      ...invalidClasses.split(" ")
    );
    ProjectDeadline.classList.remove(
      ...validClasses.split(" "),
      ...invalidClasses.split(" ")
    );
    ProjectStatus.classList.remove(
      ...validClasses.split(" "),
      ...invalidClasses.split(" ")
    );
  } catch (error) {
    displayErrorMessage("An error occurred while clearing the fields.");
  }
}

function addRowToTable(item, index) {
  const displayElement = document.getElementById("display");
  const tr = document.createElement("tr");
  tr.className =
    "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

  tr.innerHTML = `
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      ${item.name}
    </th>
    <td class="px-6 py-4">${item.status}</td>
    <td class="px-6 py-4">${item.priority}</td>
    <td class="px-6 py-4">${item.deadline}</td>
    <td class="px-6 py-4">
      ${
        item.teamMembers.length > 0 ? item.teamMembers.join(", ") : "No members"
      }
    </td> 
    <td class="px-6 py-4">
      <button
        onclick="scrollToBottom(); update(${index});"
        type="button"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </button>
    </td>
    <td class="px-6 py-4">
      <button onclick="deleteProject(${index})" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </td>
  `;

  displayElement.appendChild(tr);
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function display(array) {
  const displayElement = document.getElementById("display");
  displayElement.innerHTML = "";
  array.forEach((item, index) => addRowToTable(item, index));
  updateAnalytics();
}

function deleteProject(i) {
  try {
    showLoading();
    setTimeout(() => {
      if (i < 0 || i >= Array.length) {
        throw new Error("Invalid project index. Cannot delete project.");
      }
      Array.splice(i, 1);
      localStorage.setItem("project", JSON.stringify(Array));
      display(Array);

      showSuccess("Project deleted successfully!");
    }, 1000);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

function valedate(element) {
  let regex = {
    ProjectName: /^[A-Z][a-z]{2,12}$/,
    ProjectPriority: /^(High|Medium|Low)$/,
    ProjectStatus: /^(To Do|In Progress|Done)$/,
    ProjectDeadline: /^\d{4}-\d{2}-\d{2}$/,
  };

  if (regex[element.id] && regex[element.id].test(element.value)) {
    element.classList.add(...validClasses.split(" "));
    element.classList.remove(...invalidClasses.split(" "));
    if (element.nextElementSibling) {
      element.nextElementSibling.classList.replace("block", "hidden");
    }
  } else {
    element.classList.add(...invalidClasses.split(" "));
    element.classList.remove(...validClasses.split(" "));
    if (element.nextElementSibling) {
      element.nextElementSibling.classList.replace("hidden", "block");
    }
  }
}

function update(i) {
  try {
    if (i < 0 || i >= Array.length) {
      throw new Error("Invalid project index. Cannot update project.");
    }
    ptr = i;
    AddButton.classList.add("hidden");
    UpdateButton.classList.replace("hidden", "block");
    ProjectName.value = Array[i].name;
    ProjectPriority.value = Array[i].priority;
    ProjectDeadline.value = Array[i].deadline;
    ProjectStatus.value = Array[i].status;
    const teamMembersSection = document.querySelectorAll(
      "#teamMembersSection input[type='checkbox']"
    );
    teamMembersSection.forEach((checkbox) => {
      checkbox.checked = Array[i].teamMembers.includes(checkbox.value);
    });

    ProjectName.classList.add("is-valid");
    ProjectPriority.classList.add("is-valid");
    ProjectDeadline.classList.add("is-valid");
    ProjectStatus.classList.add("is-valid");
  } catch (error) {
    displayErrorMessage(error.message);
  }
}
function edit(ptr) {
  if (
    ProjectName.classList.contains("is-valid") &&
    ProjectDeadline.classList.contains("is-valid") &&
    ProjectPriority.classList.contains("is-valid") &&
    ProjectStatus.classList.contains("is-valid")
  ) {
    let selectedMembers = [];
    document
      .querySelectorAll("#teamMembersSection input[type='checkbox']:checked")
      .forEach((checkbox) => {
        selectedMembers.push(checkbox.value);
      });

    Array[ptr].name = ProjectName.value;
    Array[ptr].priority = ProjectPriority.value;
    Array[ptr].deadline = ProjectDeadline.value;
    Array[ptr].status = ProjectStatus.value;
    Array[ptr].teamMembers = selectedMembers;

    localStorage.setItem("project", JSON.stringify(Array));
    display(Array);
    AddButton.classList.replace("hidden", "block");
    UpdateButton.classList.replace("block", "hidden");
    ProjectName.classList.remove(...validClasses.split(" "));
    ProjectPriority.classList.remove(...validClasses.split(" "));
    ProjectDeadline.classList.remove(...validClasses.split(" "));
    ProjectStatus.classList.remove(...validClasses.split(" "));
    clear();
  } else {
    alert("The input is not valid");
  }
}

function SearchByProjectName() {
  let LowerCase = ProjectSearch.value.toLocaleLowerCase();
  let SearchProduct = [];
  for (let i = 0; i < Array.length; i++) {
    if (Array[i].name.toLocaleLowerCase().includes(LowerCase)) {
      SearchProduct.push(Array[i]);
    }
  }
  display(SearchProduct);
}

function searchProjects() {
  const selectedState = document.getElementById("SearchByState").value;
  const selectedPriority = document.getElementById("SearchByPriority").value;

  // تصفية المشاريع بناءً على الحالة والأولوية
  const filteredProjects = Array.filter((project) => {
    const matchesState =
      selectedState === "All" || project.status === selectedState;
    const matchesPriority =
      selectedPriority === "All" || project.priority === selectedPriority;

    return matchesState && matchesPriority;
  });

  // إعادة عرض المشاريع المطابقة
  display(filteredProjects);
}

function sortProjects(criteria) {
  if (criteria === "deadline") {
    Array.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (criteria === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    Array.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }
  display(Array);
}

function updateAnalytics() {
  const analyticsTable = document.getElementById("analytics");
  const overdueProjectsCount = document.getElementById("overdueProjectsCount");

  const statusCounts = {
    "To Do": 0,
    "In Progress": 0,
    Done: 0,
  };
  let overdueCount = 0;

  Array.forEach((project) => {
    if (statusCounts[project.status] !== undefined) {
      statusCounts[project.status]++;
    }
    if (new Date(project.deadline) < new Date() && project.status !== "Done") {
      overdueCount++;
    }
  });

  analyticsTable.innerHTML = `
    <tr>
      <td class="px-6 py-4">To Do</td>
      <td class="px-6 py-4">${statusCounts["To Do"]}</td>
    </tr>
    <tr>
      <td class="px-6 py-4">In Progress</td>
      <td class="px-6 py-4">${statusCounts["In Progress"]}</td>
    </tr>
    <tr>
      <td class="px-6 py-4">Done</td>
      <td class="px-6 py-4">${statusCounts["Done"]}</td>
    </tr>
  `;
  overdueProjectsCount.textContent = `Overdue Projects: ${overdueCount}`;
}

function showError(message) {
  console.log("message");

  let errorContainer = document.getElementById("errorContainer");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "errorContainer";
    errorContainer.className =
      "text-red-500 bg-red-50 border border-red-500 p-3 rounded-md mt-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50";
    document.body.prepend(errorContainer);
  }
  errorContainer.textContent = message;
  errorContainer.classList.remove("hidden");
  setTimeout(() => {
    errorContainer.classList.add("hidden");
  }, 5000);
}

function showSuccess(message) {
  const successContainer = document.getElementById("successContainer");
  successContainer.textContent = message;
  successContainer.classList.remove("hidden");

  setTimeout(() => {
    successContainer.classList.add("hidden");
  }, 5000);
}

function showLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  loadingContainer.classList.remove("hidden");
}

function hideLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  loadingContainer.classList.add("hidden");
}

function toggleTheme() {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.classList.contains("dark");

  if (isDarkMode) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateIcon(false);
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateIcon(true);
  }
}

function updateIcon(isDarkMode) {
  const themeIcon = document.getElementById("themeIcon");
  if (isDarkMode) {
    themeIcon.innerHTML = `
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v2m0 14v2m8.66-10h-2M5.34 12H3m12.07 7.07l-1.41-1.41M7.05 7.05l-1.41-1.41M16.95 7.05l-1.41-1.41M7.05 16.95l-1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    `;
  } else {
    themeIcon.innerHTML = `
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    `;
  }
}
window.onload = function () {
  const theme = localStorage.getItem("theme") || "light";
  const isDarkMode = theme === "dark";
  document.documentElement.classList.toggle("dark", isDarkMode);
  updateIcon(isDarkMode);
};

let currentPage = 1; // Global variable to track the current page
let totalItems = 202;
let itemPerPage = 5;
let totalPages = Math.ceil(totalItems / itemPerPage);
function createPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = ""; // Clear previous buttons
  addFunctionButton("<<");
  addFunctionButton("<");
  // Always show the first page button
  addButton(1, container);

  // Logic for showing "..."
  if (totalPages > 7) {
    if (currentPage - 1 >= 3) {
      addButton("...", container, true);
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage - 1 < 3) {
      endPage = Math.min(totalPages - 1, 5);
    }

    if (totalPages - currentPage < 3) {
      startPage = Math.max(3, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      addButton(i, container);
    }

    if (totalPages - currentPage >= 3) {
      addButton("...", container, true);
    }
  } else {
    for (let i = 2; i < totalPages; i++) {
      addButton(i, container);
    }
  }
  if (totalPages !== 1) {
    addButton(totalPages, container);
  }
  addFunctionButton(">");
  addFunctionButton(">>");

  createAllPagination();
  displayCurrentItems();

  function addFunctionButton(type) {
    const button = document.createElement("button");
    button.textContent = type;
    button.className = "pagination-btn";
    let callback;
    switch (type) {
      case "<":
        callback = () => {
          currentPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
          createPagination();
        };
        break;
      case ">":
        callback = () => {
          currentPage =
            currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;
          createPagination();
        };
        break;
      case ">>":
        callback = () => {
          currentPage = totalPages;
          createPagination();
        };
        break;
      case "<<":
        callback = () => {
          currentPage = 1;
          createPagination();
        };
        break;
      default:
        callback = () => console.log("Invalid");
    }

    button.addEventListener("click", callback);
    container.appendChild(button);
  }
}

function createAllPagination() {
  const container = document.getElementById("pagination-all");
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    addButton(i, container);
  }
}
function addButton(page, container, isDisabled = false) {
  const button = document.createElement("button");
  button.textContent = page;
  button.className = `pagination-btn ${currentPage === page ? "active" : ""}`;
  button.disabled = isDisabled;
  if (!isDisabled) {
    button.addEventListener("click", () => {
      currentPage = typeof page === "number" ? page : currentPage;
      createPagination();
    });
  }
  container.appendChild(button);
}

(function () {
  const inputField = document.getElementById("item-per-page");
  inputField.addEventListener("change", (e) => {
    itemPerPage = +e.target.value > 0 ? e.target.value : 1;
    totalPages = Math.ceil(totalItems / itemPerPage);
    createPagination(); // Trigger re-render
  });
})(); // Add listener for changing item per page

(function () {
  const inputField = document.getElementById("total-items");
  inputField.addEventListener("change", (e) => {
    totalItems = +e.target.value > 0 ? e.target.value : 1;
    totalPages = Math.ceil(totalItems / itemPerPage);
    createPagination(); // Trigger re-render
  });
})(); // Add listener for changing total items;
function displayCurrentItems() {
  document.getElementById("item-number").innerHTML = `${
    (currentPage - 1) * itemPerPage + 1
  } - ${Math.min(currentPage * itemPerPage, totalItems)} of ${totalItems}`;
}

function quickSet(total, itemPer) {
  totalItems = total;
  itemPerPage = itemPer;
  currentPage = 1;
  totalPages = Math.ceil(totalItems / itemPerPage);
  document.getElementById("total-items").value = totalItems;
  document.getElementById("item-per-page").value = itemPerPage;
  createPagination();
}

createPagination(); // Initialize with total pages

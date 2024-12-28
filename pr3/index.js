const tasks = document.querySelectorAll(".task");
const sections = document.querySelectorAll(".tasks");

sections.forEach((section) => {
  section.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    const afterElement = getAfterElement(section, e.clientY);
    if (afterElement === null) {
      section.appendChild(draggingTask);
    } else {
      section.insertBefore(draggingTask, afterElement);
    }
  });
});

function getAfterElement(container, positionOfMouse) {
  const possibleElements = [
    ...container.querySelectorAll(".task:not(.dragging)"),
  ];
  return possibleElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = positionOfMouse - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function addtask(section) {
  const parentElement = document.querySelector(`.${section}`);
  const childElement = parentElement.querySelector(".tasks");
  const totalElements = childElement.getElementsByClassName("task");
  const newElement = document.createElement("div");
  newElement.setAttribute("class", "task");
  newElement.setAttribute("draggable", "true");
  newElement.innerHTML = `${section} task ${totalElements.length + 1}`;
  newElement.addEventListener("dragstart", () => {
    newElement.classList.add("dragging");
  });
  newElement.addEventListener("dragend", () => {
    newElement.classList.remove("dragging");
  });
  childElement.appendChild(newElement);
}

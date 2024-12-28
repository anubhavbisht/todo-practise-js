function changeBgColor(event) {
  const id = event.target.id;
  const element = document.getElementById(id);
  const style = window.getComputedStyle(element);
  document.querySelector(".parent-div").style.backgroundColor =
    style.backgroundColor;
}

function applyCustomColor() {
  const customColor = document.getElementById("customColorPicker").value;
  document.querySelector(".parent-div").style.backgroundColor = customColor;
}

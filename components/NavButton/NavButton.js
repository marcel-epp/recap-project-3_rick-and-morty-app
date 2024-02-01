export default function NavButton(text, classes, dataJs) {
  const button = document.createElement("button");
  button.classList.add(...classes);
  button.setAttribute("data-js", dataJs);
  button.textContent = text;
  return button;
}

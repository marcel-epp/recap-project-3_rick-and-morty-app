export default function NavButton(text, classes, dataJs) {
  console.log(classes);
  const button = document.createElement("button");
  button.classList.add(classes);
  button.setAttribute("data-js", dataJs);
  button.textContent = text;
  console.log(button);
  return button;
}

{
  /* <button class="button button--prev" data-js="button-prev">
  previous
</button>; */
}

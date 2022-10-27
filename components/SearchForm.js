export function SearchForm() {
  const d = document,
    $form = d.createElement("form"),
    $input = d.createElement("input");

  $form.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";
  $input.autocomplete = "off";
  $form.appendChild($input);

  if (location.hash.includes("#/search")) {
    let search = location.hash.slice(16);
    $input.value = localStorage.getItem("wpSearch") || search;
    if (search) {
      localStorage.setItem("wpSearch", $input.value.toLowerCase());
      location.hash = `#/search?search=${$input.value.toLowerCase()}`;
    }
  }

  d.addEventListener("search", (e) => {
    if (!location.hash.includes("#/search")) return false;
    if (!e.target.matches("input[type='search']")) return false;
    if (!e.target.value) {
      localStorage.removeItem("wpSearch");
      location.hash = "#/search";
      d.getElementById("main").innerHTML = null;
    }
  });

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;
    e.preventDefault();
    localStorage.setItem("wpSearch", e.target.search.value.toLowerCase());
    location.hash = `#/search?search=${e.target.search.value.toLowerCase()}`;
  });
  return $form;
}

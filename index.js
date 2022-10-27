import api from "./helpers/wp_api.js";
import { App } from "./App.js";
import { infinite_scroll } from "./helpers/infinite_scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  App();
  infinite_scroll();
});

window.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});

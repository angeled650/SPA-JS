import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import api from "./wp_api.js";

export async function infinite_scroll() {
  const d = document,
    w = window;

  let query = localStorage.getItem("wpSearch"),
    apiURL,
    Component;

  // Variable para esperar a que se termine una petición antes de enviar otra.
  let requestPending = false;

  w.addEventListener("scroll", async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
      { hash } = w.location;

    if (scrollTop != 0 && scrollTop + clientHeight + 1 > scrollHeight) {
      api.page++;

      if (!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        if (!query) return false;
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else return false;

      d.querySelector(".loader").style.display = "block";

      if (requestPending) return;
      requestPending = true;

      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          let html = "";
          posts.forEach((post) => (html += Component(post)));
          d.getElementById("main").insertAdjacentHTML("beforeend", html);
          requestPending = false;

          d.querySelector(".loader").style.display = "none";
        },
      });
    }
  });
}

export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

  $form.classList.add("contact-form");

  $styles.innerHTML = `
    .contact-form {
      --form-ok-color: #4caf50;
      --form-error-color: #f44336;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }

    .contact-form legend,
    .contact-form-response {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-align: center;
    }

    .contact-form>* {
      display: block;
      width: 50vw;
      padding: 0.5rem;
      margin: 1rem auto;
    }

    .contact-form textarea {
      resize: none;
    }

    .contact-form input[type="submit"] {
      width: 20vw;
      font-weight: bold;
      cursor: pointer;
    }

    .contact-form input,
    .contact-form textarea {
      font-size: 1rem;
      font-family: sans-serif;
    }

    .contact-form *::placeholder {
      color: black;
    }

    .contact-form [required]:invalid {
      border: thin solid var(--form-error-color);
    }

    .contact-form [required]:valid {
      border: thin solid var(--form-ok-color);
    }

    .none {
      display: none;
    }

    .contact-form-error {
      margin-top: -1rem;
      font-size: 80%;
      background-color: var(--form-error-color);
      color: #f5f5f5;
      transition: all 8000ms ease;
    }

    .contact-form-error.is-active {
      display: block;
      animation: show-message 1s 1 normal 0s ease-out both;
    }

    .contact-form-loader {
      text-align: center;
    }

    @keyframes show-message {
      0% {
        visibility: hidden;
        opacity: 0;
      }

      100% {
        visibility: visible;
        opacity: 1;
      }
    }
`;

  $form.innerHTML = `
  <legend>Envíanos tus comentarios</legend>
  
    <input type="text" name="name" placeholder="Escribe tu nombre"
      title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>

    <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
      pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$" required>

    <input type="text" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required>

    <textarea name="comment" cols="50" row="5" placeholder="Escribe tus comentarios"
      title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^[\\s\\S]{1,255}$" required></textarea>

    <input type="submit" value="Enviar">

    <div class="contact-form-loader none">
      <img src="assets/bars.svg" alt="Cargando">
    </div>
    <div class="contact-form-response none">

    </div>
    `;

  function validationsForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]");

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", async (e) => {
      e.preventDefault();

      const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

      let options = {
        method: "POST",
        body: new FormData(e.target),
      };

      $loader.classList.remove("none");

      try {
        let res = await fetch(
            "https://formsubmit.co/ajax/angeleduardoch11@gmail.com",
            options
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $loader.classList.add("none");
        $response.classList.remove("none");
        $response.innerHTML = `<p>${json.message}</p>`;
        $form.reset();
      } catch (err) {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
      } finally {
        setTimeout(() => {
          $response.classList.add("none");
          $response.innerHTML = "";
        }, 3000);
      }
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}

import "./styles/style.scss";
import { getJoke } from "./getJoke.js";
import { toggleTheme, scrollOpasity } from "./toggle-button.js";

const jokeButton = document.querySelector(".current-joke__actions--new");
const saveButton = document.querySelector(".current-joke__actions--save");
const jokeElement = document.querySelector(".current-joke__text");
const savedJokesContainer = document.querySelector(".saved-joke__container");
const currentCategoryElement = document.getElementById("category-select");

let currentCategory = "";

renderJoke(currentCategory);

currentCategoryElement.addEventListener("change", () => {
  currentCategory = currentCategoryElement.value;
  console.log(currentCategory);
  renderJoke(currentCategory);
});

document.addEventListener("DOMContentLoaded", renderSavedJokes);

jokeButton.addEventListener("click", () => {
  renderJoke(currentCategory);
  console.log(currentCategory);
});

async function renderJoke(category) {
  const joke = await getJoke(category);

  createJokeElement(joke);
}

function createJokeElement(joke) {
  jokeElement.textContent = joke[0].text;
}

function getSavedJokes() {
  const savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
  return savedJokes;
}

saveButton.addEventListener("click", () => {
  const currentJoke = jokeElement.textContent;
  const savedJokes = getSavedJokes();
  if (savedJokes.includes(currentJoke)) {
    alert("Dieser Witz ist bereits gespeichert!");
    return;
  }
  savedJokes.unshift(currentJoke);
  localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
  renderSavedJokes();

  console.log(currentJoke);
});

function renderSavedJokes() {
  const savedJokes = getSavedJokes();
  let html = "";

  if (savedJokes.length === 0) {
    savedJokesContainer.innerHTML = "<em class='saved-joke__empty'>Keine gespeicherten Witze.</em>";
    return;
  } else {
    savedJokes.forEach((joke, indx) => {
      html += `
        <div class="saved-joke__body" data-index="${indx}">
          <p class="saved-joke__text">${joke}</p>
          <button class="saved-joke__delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="saved-joke__remove-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
              />
            </svg>
          </button>
        </div>
            
    `;

      savedJokesContainer.innerHTML = html;
    });
    const deleteButtonEls = document.querySelectorAll(".saved-joke__delete");
    deleteButtonEls.forEach((btn) => {
      const jokeIndex = btn.parentElement.getAttribute("data-index");
      btn.addEventListener("click", () => {
        const savedJokes = getSavedJokes();
        savedJokes.splice(jokeIndex, 1);
        localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
        renderSavedJokes();
      });
    });
  }
}

toggleTheme();
scrollOpasity();

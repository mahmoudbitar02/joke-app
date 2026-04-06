const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme") || "dark";
const categorySelectElement = document.getElementById("category-select");

export function toggleTheme() {
  if (currentTheme === "light") {
    body.classList.add("light");
    toggleButton.innerHTML = "🌙";
  } else {
    toggleButton.innerHTML = "☀️";
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("light");
    if (body.classList.contains("light")) {
      toggleButton.innerHTML = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      toggleButton.innerHTML = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });
}

export function scrollOpasity() {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      categorySelectElement.style.opacity = "0.1";
      toggleButton.style.opacity = "0.1";
    } else {
      categorySelectElement.style.opacity = "1";
      toggleButton.style.opacity = "1";
    }
  });
}

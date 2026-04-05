export function toggleTheme() {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "dark";

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

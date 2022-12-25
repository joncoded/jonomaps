function clickDark() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.remove("dark")
    Array.from(document.querySelectorAll(".dark-toggle")).map(element => (element.innerHTML = "🌙 dark"))
    localStorage.theme = "light"
  } else {
    document.documentElement.classList.add("dark")
    Array.from(document.querySelectorAll(".dark-toggle")).map(element => (element.innerHTML = "☀️ lite"))
    localStorage.theme = "dark"
  }
}

function loadDark() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark")
    return "☀️ lite"
  } else {
    document.documentElement.classList.remove("dark")
    return "🌙  dark"
  }
}

export { clickDark, loadDark }

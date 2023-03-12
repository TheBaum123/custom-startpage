let bgColorInput = document.getElementById("bg-color")
let focusedColorInput = document.getElementById("focused-color")
let highlightColorInput = document.getElementById("highlight-color")

function init() {
    bgColorInput.value = localStorage.getItem("bg-color")
    bgColorInput.style.setProperty("background-color", localStorage.getItem("bg-color"))
    focusedColorInput.value = localStorage.getItem("focused-color")
    focusedColorInput.style.setProperty("background-color", localStorage.getItem("focused-color"))
    highlightColorInput.value = localStorage.getItem("highlight-color")
    highlightColorInput.style.setProperty("background-color", localStorage.getItem("highlight-color"))
}
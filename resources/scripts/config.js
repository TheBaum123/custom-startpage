let bgColorInput = document.getElementById("bg-color")
let focusedColorInput = document.getElementById("focused-color")
let highlightColorInput = document.getElementById("highlight-color")
let textColorInput = document.getElementById("text-color")
let savedBookmarks = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("bookmarks"))));

function init() {
    bgColorInput.value = localStorage.getItem("bg-color")
    bgColorInput.style.setProperty("background-color", localStorage.getItem("bg-color"))
    focusedColorInput.value = localStorage.getItem("focused-color")
    focusedColorInput.style.setProperty("background-color", localStorage.getItem("focused-color"))
    highlightColorInput.value = localStorage.getItem("highlight-color")
    highlightColorInput.style.setProperty("background-color", localStorage.getItem("highlight-color"))
    document.body.style.background = "url(resources/img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
    document.body.style.backgroundSize = "cover"
    if(localStorage.getItem("bg-color") != null) {
        document.querySelector(":root").style.setProperty("--bg-color", localStorage.getItem("bg-color"))
    }
    if(localStorage.getItem("focused-color") != null) {
        document.querySelector(":root").style.setProperty("--focused-color", localStorage.getItem("focused-color"))
    }
    if(localStorage.getItem("highlight-color") != null) {
    document.querySelector(":root").style.setProperty("--highlight-color", localStorage.getItem("highlight-color"))
    }
    let bookmarkUUIDS = Object.keys(savedBookmarks)
    console.log(bookmarkUUIDS)
    for(let i = 0; i < bookmarkUUIDS.length; i++) {
        let currentBookmark = bookmarkUUIDS[i];
        let newOption = new Option(savedBookmarks[Object.keys(savedBookmarks)[1]][1], currentBookmark)
        document.getElementById("uuid-selector").add(newOption)
    }
}

bgColorInput.addEventListener("change", function() {
    localStorage.setItem("bg-color", bgColorInput.value)
    window.location.reload()
})

focusedColorInput.addEventListener("change", function() {
    localStorage.setItem("focused-color", focusedColorInput.value)
    window.location.reload()
})

highlightColorInput.addEventListener("change", function() {
    localStorage.setItem("highlight-color", highlightColorInput.value)
    window.location.reload()
})

textColorInput.addEventListener("change", function() {
    localStorage.setItem("text-color", textColorInput.value)
    window.location.reload()
})

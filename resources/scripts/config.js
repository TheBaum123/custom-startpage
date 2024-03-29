let bgColorInput = document.getElementById("bg-color")
let focusedColorInput = document.getElementById("focused-color")
let highlightColorInput = document.getElementById("highlight-color")
let textColorInput = document.getElementById("text-color")
let savedBookmarks = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("startpage:bookmarks"))))
let availableSearchEngines = { }

function init() {
    bgColorInput.value = localStorage.getItem("startpage:bg-color")
    bgColorInput.style.setProperty("background-color", localStorage.getItem("startpage:bg-color"))
    focusedColorInput.value = localStorage.getItem("startpage:focused-color")
    focusedColorInput.style.setProperty("background-color", localStorage.getItem("startpage:focused-color"))
    highlightColorInput.value = localStorage.getItem("startpage:highlight-color")
    highlightColorInput.style.setProperty("background-color", localStorage.getItem("startpage:highlight-color"))
    document.body.style.background = "url(resources/img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
    document.body.style.backgroundSize = "cover"
    if(localStorage.getItem("startpage:bg-color") != null) {
        document.querySelector(":root").style.setProperty("--bg-color", localStorage.getItem("startpage:bg-color"))
    }
    if(localStorage.getItem("startpage:focused-color") != null) {
        document.querySelector(":root").style.setProperty("--focused-color", localStorage.getItem("startpage:focused-color"))
    }
    if(localStorage.getItem("startpage:highlight-color") != null) {
    document.querySelector(":root").style.setProperty("--highlight-color", localStorage.getItem("startpage:highlight-color"))
    }
    if(savedBookmarks != null) {
        let bookmarkUUIDS = Object.keys(savedBookmarks)
        for(let i = 0; i < bookmarkUUIDS.length; i++) {
            let currentBookmark = bookmarkUUIDS[i];
            let newOption = new Option(savedBookmarks[Object.keys(savedBookmarks)[i]][0], currentBookmark)
            document.getElementById("uuid-selector").add(newOption)
        }
    }
    document.getElementById("uuid-selector").addEventListener("change", function() {
        selectedUUIDvalue = savedBookmarks[document.getElementById("uuid-selector").value]
        document.getElementById("name").value = selectedUUIDvalue[0]
        document.getElementById("link").value = selectedUUIDvalue[1]
        document.getElementById("logo").value = selectedUUIDvalue[2]
    })
    document.getElementById("name").addEventListener("change", function() {
        selectedUUIDvalue = savedBookmarks[document.getElementById("uuid-selector").value]
        selectedUUIDvalue[0] = this.value
        savedBookmarks[document.getElementById("uuid-selector").value] = selectedUUIDvalue
        localStorage.setItem("startpage:bookmarks", JSON.stringify(savedBookmarks))
    })
    document.getElementById("link").addEventListener("change", function() {
        selectedUUIDvalue = savedBookmarks[document.getElementById("uuid-selector").value]
        selectedUUIDvalue[1] = this.value
        savedBookmarks[document.getElementById("uuid-selector").value] = selectedUUIDvalue
        localStorage.setItem("startpage:bookmarks", JSON.stringify(savedBookmarks))
    })
    document.getElementById("logo").addEventListener("change", function() {
        selectedUUIDvalue = savedBookmarks[document.getElementById("uuid-selector").value]
        selectedUUIDvalue[2] = this.value
        savedBookmarks[document.getElementById("uuid-selector").value] = selectedUUIDvalue
        localStorage.setItem("startpage:bookmarks", JSON.stringify(savedBookmarks))
    })
    getAvailableSearchEngines()
    document.getElementById("search-engine-selector").addEventListener("change", () => {
        localStorage.setItem("startpage:selected-search-engine", document.getElementById("search-engine-selector").value)
    })
}

function getAvailableSearchEngines() {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "resources/json/availableSearchEngines.json")
    xhr.send()
    xhr.responseType = "json"
    xhr.onload = () => {
        if(xhr.status == 200) {
            availableSearchEngines = xhr.response
            listAvailableSearchEngines()
        } else {
            availableSearchEngines = {"oh no, something went wrong":"oh no, something went wrong"}
        }
    }
    }

function listAvailableSearchEngines() {
    for(i = 0; i < Object.keys(availableSearchEngines).length; i++) {
        console.log(Object.keys(availableSearchEngines)[i])
        let newOption = new Option(Object.keys(availableSearchEngines)[i], Object.keys(availableSearchEngines)[i])
        document.getElementById("search-engine-selector").add(newOption)
    }
    if(localStorage.getItem("startpage:selected-search-engine") != null) {
        document.getElementById("search-engine-selector").remove(0)
        document.getElementById("search-engine-selector").value = localStorage.getItem("startpage:selected-search-engine")
    }
}

bgColorInput.addEventListener("change", function() {
    localStorage.setItem("startpage:bg-color", bgColorInput.value)
    window.location.reload()
})

focusedColorInput.addEventListener("change", function() {
    localStorage.setItem("startpage:focused-color", focusedColorInput.value)
    window.location.reload()
})

highlightColorInput.addEventListener("change", function() {
    localStorage.setItem("startpage:highlight-color", highlightColorInput.value)
    window.location.reload()
})

textColorInput.addEventListener("change", function() {
    localStorage.setItem("startpage:text-color", textColorInput.value)
    window.location.reload()
})
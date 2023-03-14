const timeID = setInterval(clockAndDateUpdate, 1000);
let bookmarks = { }

function init() {
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
  if(localStorage.getItem("text-color") != null) {
    document.querySelector(":root").style.setProperty("--text-color", localStorage.getItem("text-color"))
  }
}

document.getElementById("searchbox").addEventListener("change", function() {
  let searchinput = document.getElementById("searchbox").value
  let splitsearchinput = searchinput.split(" ")
  if(searchinput.startsWith("reddit:")) {
    window.location.assign("https://www.reddit.com/search?q=" + searchinput.replace("reddit:", ""))
  } else {
    if(searchinput.startsWith("yt:") || searchinput.startsWith("youtube:")) {
    if(searchinput.startsWith("yt:")) {
        window.location.assign("https://www.youtube.com/results?search_query=" + searchinput.replace("yt:", ""))
      } else if(searchinput.startsWith("youtube:")){
          window.location.assign("https://www.youtube.com/results?search_query=" + searchinput.replace("youtube:", ""))
        }
  } else {
    if(searchinput.startsWith("twitch:")) {
    window.location.assign("https://www.twitch.tv/search?term=" + searchinput.replace("twitch:", ""))
  } else {
    if(searchinput.startsWith("gh:") || searchinput.startsWith("github:")) {
    if(searchinput.startsWith("gh:")) {
        window.location.assign("https://github.com/search?q=" + searchinput.replace("gh:", ""))
      } else if(searchinput.startsWith("github:")){
          window.location.assign("https://github.com/search?q=" + searchinput.replace("github:", ""))
        }
  } else {
    if(searchinput.startsWith("netflix:")) {
    window.location.assign("https://www.netflix.com/search?q=" + searchinput.replace("netflix:", ""))
  } else {
    if(searchinput.startsWith("http://") || searchinput.startsWith("https://")) {
    window.location.assign(searchinput)
  } else {
    if(searchinput.startsWith(":")) {
      internalCommand(splitsearchinput)
    } else {
      switch(String(searchinput)) {
        case 'reddit':
          window.location.assign("https://www.reddit.com")
          break
        case 'yt':
          window.location.assign("https://www.youtube.com")
          break
        case 'youtube':
          window.location.assign("https://www.youtube.com")
          break
        case 'twitch':
          window.location.assign("https://www.twitch.tv")
          break
        case 'gh':
          window.location.assign("https://www.github.com")
          break
        case 'github':
          window.location.assign("https://www.github.com")
          break
        case 'netflix':
          window.location.assign("https://www.netflix.com")
          break
        case 'edclub':
          window.location.assign("https://www.typingclub.com/")
          break
        case 'monkeytype':
          window.location.assign("https://monkeytype.com")
          break
        case 'ztype':
          window.location.assign("https://zty.pe/")
          break
        default:
          if(searchinput == "") {
            break
          }
          window.location.assign("https://www.google.com/search?q=" + searchinput)
          break
  } 
    }}}}}}}
})

function internalCommand(command) {
  let commandToDo = command[0].replace(":", "")
  switch(commandToDo) {
    case "config":
    case "conf":
      if(command[1] == "bg-color") {
        if(command[2] == "default") {
          document.querySelector(":root").style.setProperty("--bg-color", "#2B3D41BF")
          localStorage.removeItem("bg-color")
        } else {
          document.querySelector(":root").style.setProperty("--bg-color", command[2])
        localStorage.setItem("bg-color", command[2])
        }
        } else if(command[1] == "focused-color") {
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--focused-color", "#4C5F6BBF")
            localStorage.removeItem("focused-color")
          } else {
            document.querySelector(":root").style.setProperty("--focused-color", command[2])
            localStorage.setItem("focused-color", command[2])
          }
        } else if(command[1] == "highlight-color") {
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--highlight-color", "#A37774FF")
            localStorage.removeItem("highlight-color")
          } else {
            document.querySelector(":root").style.setProperty("--highlight-color", command[2])
            localStorage.setItem("highlight-color", command[2])
          } 
        } else if(command[1] == "text-color") {
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--text-color", "#E0E2DBFF")
            localStorage.removeItem("text-color")
          } else {
            document.querySelector(":root").style.setProperty("--text-color", command[2])
            localStorage.setItem("text-color", command[2])
          }
        } else if(command[1] == "default") {
          localStorage.clear()
          window.location.reload()
        } else if(command[1] == "bookmarks" || command[1] == "bookmark") {
          editBookmarks(command)
        }
      break
    case "gui":
      window.location.assign("config.html")
      break
    default:
      document.getElementById("searchbox").value = "command unknown"
  }
}

function editBookmarks(commandInput) {
  if(commandInput[2] == "add") {
    let uuid = crypto.randomUUID()
    bookmarks[uuid] = [commandInput[3], commandInput[4], commandInput[5]]
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    document.getElementById("searchbox").value = "bookmark saved"
    setTimeout(() => {
      document.getElementById("searchbox").value = commandInput[0] + " " + commandInput[1] + " " + commandInput[2] + " " + commandInput[3] + " " + commandInput[4] + " " + commandInput[5]
      console.log(commandInput)
    }, 1000);
  } else if(commandInput[3] == "default") {
    bookmarks.clear
  }
}

function readBookmarks() {
  let temp = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("bookmarks"))))
  console.log(temp)
}

document.onkeypress = function(e) {
  if (document.activeElement.id != "searchbox") {
    document.getElementById("searchbox").value = document.getElementById("searchbox").value + e.key
    document.getElementById("searchbox").focus()
  }
}

function clockAndDateUpdate() {
  const today = new Date()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let seconds = today.getSeconds()
  let days = today.getDate()
  let month = today.getMonth();
  let year = today.getFullYear();
  let clockOutput = correctNumber(hours) + " | " + correctNumber(minutes) + " | " + correctNumber(seconds)
  let dateOutput = correctNumber(days) + " / " + monthConversion(month) + "\n" + year
  document.getElementById("clock").innerHTML = clockOutput
  document.getElementById("date").innerHTML = dateOutput
}

function correctNumber(originalNumber) {
  if(originalNumber < 10 && originalNumber >= 0) {
    return("0" + originalNumber)
  } else {
    return(originalNumber)
  }
}

function monthConversion(month) {
  switch (month) {
    case 1:
      return ("January")
    case 2:
      return ("February")
    case 3:
      return ("March")
    case 4:
      return ("April")
    case 5:
      return ("May")
    case 6:
      return ("June")
    case 7:
      return ("July")
    case 8:
      return ("August")
    case 9:
      return ("September")
    case 10:
      return ("October")
    case 11:
      return ("November")
    case 12:
      return ("December")
  }
}

const timeID = setInterval(clockAndDateUpdate, 1000)
const validIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const validIPwithPort = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/g
const searchSite = /[a-zA-Z]+[:][a-zA-Z]+./gi
const validDirectLinks = ["reddit", "youtube", "yt", "twitch", "ttv", "github", "gh", "netflix", "edclub", "typingclub", "monkeytype", "ztype"]
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

function isIPvalid(IP) {
  if(IP.match(validIP)) {
      return true
  } else {
    return false
  }
}

document.getElementById("searchbox").addEventListener("change", function() {
  let searchinput = document.getElementById("searchbox").value
  if(searchinput.match(searchSite)) {
    let split = searchinput.split(":")
    searchSiteFor(split[0].toLowerCase(), split[1])
  } else if(searchinput.match(validIP) || searchinput.match(validIPwithPort) /* TODO: fix this regex */ ) {
    window.location.assign("http://" + searchinput)
  } else if(validDirectLinks.includes(searchinput.toLowerCase(), 0)) {
    directLink(searchinput.toLowerCase())
  } else if(searchinput.startsWith(":")) {
    internalCommand(searchinput)
  } else {
    window.location.assign("https://www.google.com/search?q=" + searchinput)
  }
})

function searchSiteFor(site, query) {
  switch(site) {
    case "reddit":
      window.location.assign("https://www.reddit.com/search?q=" + query)
      break
    case "youtube":
    case "yt":
      console.log("youtube search: " + query)
      break
    case "twitch":
    case "ttv":
      window.location.assign("https://www.twitch.tv/search?term=" + query)
      break
    case "gh":
    case "github":
      window.location.assign("https://www.github.com/search?q=" + query)
      break
    case "netflix":
      window.location.assign("https://www.netflix.com/search?q=" + query)
      break
    case "spotify":
      window.location.assign("https://open.spotify.com/search" + query)
      break
    default:
      window.location.assign("https://www.google.com/search?q=" + site + "%20" + query)
      break
  }
}

function directLink(site) {
  switch(site) {
    case "reddit":
      window.location.assign("https://www.reddit.com/")
      break
    case "yt":
    case "youtube":
      window.location.assign("https://www.youtube.com/")
      break
    case "twitch":
    case "ttv":
      window.location.assign("https://www.twitch.tv/")
      break
    case "github":
    case "gh":
      window.location.assign("https://github.com/")
      break
    case "netflix":
      window.location.assign("https://www.netflix.com/")
      break
    case "edclub":
    case "typingclub":
      window.location.assign("https://www.typingclub.com/")
      break
    case "monkeytype":
      window.location.assign("https://monkeytype.com/")
      break
    case "ztype":
      window.location.assign("https://zty.pe/")
      break
    default:
      break
  }
}

function internalCommand(input) {
  let command = input.split(" ")
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
    case "help":
    case "h":
      window.location.assign("https://github.com/TheBaum123/custom-startpage/wiki")
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
  } else if(commandInput[2] == "default") {
    localStorage.removeItem("bookmarks")
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
  let month = today.getMonth()
  let year = today.getFullYear()
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

//update time and date every second
const timeID = setInterval(clockAndDateUpdate, 1000)
//regexes for valid ips, valid ips with port specified, config inputs and valid links
const validIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const validIPwithPort = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/g
const configInput = /(^[:][config][A-Za-z]+|^[:]gui|^[:]help)/gi
const validLink = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gi
//initialise objects
let bookmarks = { }
let availableSearchEngines = { }
let availableDirectLinks = { }
let availableSearchSites = { }

//call all functions that have to be calle on page load
function init() {
  getAvailableSearchEngines()
  getAvailableDirectLinks()
  getAvailableSearchSites()
  getColorsFromLocalstorage()
  setBackgroundImage()
}

//select a random background image out of the two available ones and set it as the body background
function setBackgroundImage() {
  document.body.style.background = "url(resources/img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
  document.body.style.backgroundSize = "cover"
}

//detect if any color is changed and saved in the localStorage, if so, assign it
function getColorsFromLocalstorage() {
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

//get the available search engines from the json file and store them in the 'availableSearchEngines' variable
function getAvailableSearchEngines() {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "resources/json/availableSearchEngines.json")
  xhr.send()
  xhr.responseType = "json"
  xhr.onload = () => {
    if(xhr.status == 200) {
      availableSearchEngines = xhr.response
    } else {
      availableSearchEngines = {"oh no, something went wrong":"oh no, something went wrong"}
    }
  }
}

//get the direct links from the json file and store them in the 'availableDirectLinks' variable
function getAvailableDirectLinks() {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "resources/json/availableDirectLinks.json")
  xhr.send()
  xhr.responseType = "json"
  xhr.onload = () => {
    if(xhr.status == 200) {
      availableDirectLinks = xhr.response
    } else {
      availableDirectLinks = {"oh no, something went wrong":"oh no, something went wrong"}
    }
  }
}

//get the searchable sites from the json file and store them in the 'availableSearchSites' variable
function getAvailableSearchSites() {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "resources/json/availableSearchSites.json")
  xhr.send()
  xhr.responseType = "json"
  xhr.onload = () => {
    if(xhr.status == 200) {
      availableSearchSites = xhr.response
    } else {
      availableSearchSites = {"oh no, something went wrong":"oh no, something went wrong"}
    }
  }
}

//detect changes of the searchbox
document.getElementById("searchbox").addEventListener("change", function() {
  //get searchbox input
  let searchinput = document.getElementById("searchbox").value
  //if no input provided, stop
  if(searchinput == "") {return}
  //if input is a link, prefix 'https://' where needed and take user to the link
  if(searchinput.toLowerCase().match(validLink)) {
    if(searchinput.toLowerCase().startsWith("https://") || searchinput.toLowerCase().startsWith("http://")) {
      window.location.assign(searchinput.toLowerCase())
    } else {
      window.location.assign("https://" + searchinput.toLowerCase())
    }
    //if the input is a site search, has a ':' and the site is available, take the user to the search
  } else if(Object.keys(availableSearchSites).includes(searchinput.toLowerCase().split(":")[0]) && searchinput.includes(":")) {
    window.location.assign(availableSearchSites[searchinput.split(":")[0]] + searchinput.substring(searchinput.indexOf(":") + 1))
    //if it is a valid ip, prefix 'http://' and open the ip (with port if provided)
  } else if(searchinput.match(validIP) || searchinput.match(validIPwithPort)) {
    window.location.assign("http://" + searchinput)
    //if a direct link is entered, open it
  } else if(Object.keys(availableDirectLinks).includes(searchinput.toLowerCase())) {
    window.location.assign(availableDirectLinks[searchinput.toLowerCase()])
    //if the user prefixes with ':' pass input to command function
  } else if(searchinput.match(configInput)) {
    internalCommand(searchinput)
    //else: check if user selected a search engine
  } else if(localStorage.getItem("selectedSearchEngine") == null) {
    //if not: search input on duck duck go
    window.location.assign(availableSearchEngines.duckduckgo + searchinput)
  } else {
    //if yes: search input on selected search engine
    window.location.assign(availableSearchEngines[localStorage.getItem("selectedSearchEngine")] + searchinput)
  }
})

//function to deal with configuration input starting with ':'
function internalCommand(input) {
  //seperate the words and save them to a variable
  let command = input.split(" ")
  //remove the ':'
  let commandToDo = command[0].replace(":", "")
  //check which command to execute
  switch(commandToDo) {
    //if its configuration, check which one
    case "config":
    case "conf":
      //if its one of the colors, update it and write it to localStorage
      switch(command[1]) {
        case "bg-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--bg-color", "#2B3D41BF")
            localStorage.removeItem("bg-color")
          } else {
            document.querySelector(":root").style.setProperty("--bg-color", command[2])
            localStorage.setItem("bg-color", command[2])
          }
          break
        case "focused-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--focused-color", "#4C5F6BBF")
            localStorage.removeItem("focused-color")
          } else {
            document.querySelector(":root").style.setProperty("--focused-color", command[2])
            localStorage.setItem("focused-color", command[2])
          }
          break
        case "highlight-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--highlight-color", "#A37774FF")
            localStorage.removeItem("highlight-color")
          } else {
            document.querySelector(":root").style.setProperty("--highlight-color", command[2])
            localStorage.setItem("highlight-color", command[2])
          }
          break
        case "text-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--text-color", "#E0E2DBFF")
            localStorage.removeItem("text-color")
          } else {
            document.querySelector(":root").style.setProperty("--text-color", command[2])
            localStorage.setItem("text-color", command[2])
          }
          break
        /*
        case "bookmark":
        case "bookmarks":
          editBookmarks(command)
          break
        */
        //if its changing the search engine
        case "searchengine":
        case "search":
          //check if its available
          if(Object.keys(availableSearchEngines).includes(command[2])) {
            //if yes, write it to localStorage ( TODO: Fix this as it doesn't work)
            localStorage.setItem("selectedSearchEngine", command[2])
          }
        //if user does 'config default', clear the localStorage and reload
        case "default":
          localStorage.clear()
          window.location.reload()
          break
      }
      break
    //if its gui, open the gui configuration
    case "gui":
      window.location.assign("config.html")
      break
    //if its help open the wiki
    case "help":
    case "h":
      window.location.assign("https://github.com/TheBaum123/custom-startpage/wiki")
      break
    //for anything else, replace the input with 'command unknown'
    default:
      document.getElementById("searchbox").value = "command unknown"
  }
}

/*
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
*/

/*
function readBookmarks() {
  let temp = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("bookmarks"))))
  console.log(temp)
}
*/

//check for user input
document.onkeypress = function(e) {
  //check if the searchbox is selected
  if (document.activeElement.id != "searchbox") {
    //if not: insert pressed keys and select the searchbox
    document.getElementById("searchbox").value = document.getElementById("searchbox").value + e.key
    document.getElementById("searchbox").focus()
  }
}

//time stuff
function clockAndDateUpdate() {
  //get Time and Date
  const today = new Date()
  //put everything into the correct variable
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let seconds = today.getSeconds()
  let days = today.getDate()
  let month = today.getMonth()
  let year = today.getFullYear()
  //put the variables together into the two output variables
  let clockOutput = correctNumber(hours) + " | " + correctNumber(minutes) + " | " + correctNumber(seconds)
  let dateOutput = correctNumber(days) + " | " + monthConversion(month) + " | " + year
  //update DOM elements with variables
  document.getElementById("clock").innerHTML = clockOutput
  document.getElementById("date").innerHTML = dateOutput
}

//prefix 0 to single digit dates to make everything two digits
function correctNumber(originalNumber) {
  if(originalNumber < 10 && originalNumber >= 0) {
    return("0" + originalNumber)
  } else {
    return(originalNumber)
  }
}

//convert the month number into a word
function monthConversion(month) {
  switch (month) {
    case 0:
      return ("January")
    case 1:
      return ("February")
    case 2:
      return ("March")
    case 3:
      return ("April")
    case 4:
      return ("May")
    case 5:
      return ("June")
    case 6:
      return ("July")
    case 7:
      return ("August")
    case 8:
      return ("September")
    case 9:
      return ("October")
    case 10:
      return ("November")
    case 11:
      return ("December")
  }
}
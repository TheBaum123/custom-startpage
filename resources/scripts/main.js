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
let userSearchInput = ""

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

document.getElementById("searchbutton").addEventListener("click", () => {
  search()
})

//detect if any color is changed and saved in the localStorage, if so, assign it
function getColorsFromLocalstorage() {
  if(localStorage.getItem("startpage:bg-color") != null) {
    document.querySelector(":root").style.setProperty("--bg-color", localStorage.getItem("startpage:bg-color"))
  }
  if(localStorage.getItem("startpage:focused-color") != null) {
    document.querySelector(":root").style.setProperty("--focused-color", localStorage.getItem("startpage:focused-color"))
  }
  if(localStorage.getItem("startpage:highlight-color") != null) {
    document.querySelector(":root").style.setProperty("--highlight-color", localStorage.getItem("startpage:highlight-color"))
  }
  if(localStorage.getItem("startpage:text-color") != null) {
    document.querySelector(":root").style.setProperty("--text-color", localStorage.getItem("startpage:text-color"))
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

document.addEventListener("keydown", (e) => {
  const searchbox = document.getElementById("searchbar")
  searchbox.removeChild(document.getElementById("cursor"))
  if(e.key == " ") {
      e.preventDefault()
      const spanToAdd = document.createElement("span")
      const inputToAdd = document.createTextNode(" ")
      spanToAdd.appendChild(inputToAdd)
      spanToAdd.classList.add("inputSpan")
      searchbox.appendChild(spanToAdd)
      if(userSearchInput.endsWith(" ") == false) {
        userSearchInput += e.key
      }
  } else if(e.key.length == 1) {
      const spanToAdd = document.createElement("span")
      const inputToAdd = document.createTextNode(e.key)
      spanToAdd.appendChild(inputToAdd)
      spanToAdd.classList.add("inputSpan")
      searchbox.appendChild(spanToAdd)
      userSearchInput += e.key
  } else if(e.key == "Enter") {
    search()
  } else if(e.key == "Backspace") {
      if(searchbox.childNodes.length >= 1)
      searchbox.removeChild(searchbox.lastChild)
      userSearchInput = userSearchInput.substring(0, userSearchInput.length - 1)
  }
  const cursor = document.createElement("div")
  cursor.id = "cursor"
  searchbox.appendChild(cursor)
  jsonp()
})

    function jsonp(){
  let scripts = document.getElementsByTagName("script");
  for (i=0; i<scripts.length; i++) {
    let url = scripts[i].getAttribute("src");
    if(!url) continue;
    if(url.indexOf("callback")>=0) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
  url = "https://google.com/complete/search?client=firefox&q=" + userSearchInput + "&callback=callback";
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("type", "text/javascript");
  document.getElementsByTagName("head")[0].appendChild(script);
  }

  function callback(data) {
    while(document.getElementById("suggestions").firstChild) {
        document.getElementById("suggestions").removeChild(document.getElementById("suggestions").firstChild)
    }
    for(let i = 0; i < Math.min(data[1].length, 5); i++) {
        const option = document.createElement("button")
        option.id = "option" + i
        option.classList.add("options")
        option.addEventListener("click", () => {
            userSearchInput = data[1][i]
            search()
        })
        const optionText = document.createTextNode(data[1][i])
        option.appendChild(optionText)
        document.getElementById("suggestions").appendChild(option)
    }
    if(!document.getElementById("suggestions").firstChild) {
        document.getElementById("suggestions").style.transform = "translate(-50%, 50%) scale(0)"
    } else {
        document.getElementById("suggestions").style.transform = "translate(-50%, 0) scale(1)"
    }
  }

//detect changes of the searchbox
function search() {
  //get searchbox input
  let searchinput = encodeURI(userSearchInput)
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
  } else if(localStorage.getItem("startpage:selected-search-engine") == null) {
    //if not: search input on duck duck go
    window.location.assign(availableSearchEngines.duckduckgo + searchinput)
  } else {
    //if yes: search input on selected search engine
    window.location.assign(availableSearchEngines[localStorage.getItem("startpage:selected-search-engine")] + searchinput)
  }
}

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
            localStorage.setItem("startpage:bg-color", command[2])
          }
          break
        case "focused-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--focused-color", "#4C5F6BBF")
            localStorage.removeItem("focused-color")
          } else {
            document.querySelector(":root").style.setProperty("--focused-color", command[2])
            localStorage.setItem("startpage:focused-color", command[2])
          }
          break
        case "highlight-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--highlight-color", "#A37774FF")
            localStorage.removeItem("highlight-color")
          } else {
            document.querySelector(":root").style.setProperty("--highlight-color", command[2])
            localStorage.setItem("startpage:highlight-color", command[2])
          }
          break
        case "text-color":
          if(command[2] == "default") {
            document.querySelector(":root").style.setProperty("--text-color", "#E0E2DBFF")
            localStorage.removeItem("text-color")
          } else {
            document.querySelector(":root").style.setProperty("--text-color", command[2])
            localStorage.setItem("startpage:text-color", command[2])
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
          if(availableSearchEngines.hasOwnProperty(command[2])) {
            localStorage.setItem("startpage:selected-search-engine", command[2])
          }
          break
        //if user does 'config default', clear the localStorage and reload
        case "default":
          localStorage.removeItem("startpage:bg-color")
          localStorage.removeItem("startpage:text-color")
          localStorage.removeItem("startpage:focused-color")
          localStorage.removeItem("startpage:bookmarks")
          localStorage.removeItem("startpage:selected-search-engine")
          window.location.reload()
          break
        default:
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
  }
}

/*
function editBookmarks(commandInput) {
  if(commandInput[2] == "add") {
    let uuid = crypto.randomUUID()
    bookmarks[uuid] = [commandInput[3], commandInput[4], commandInput[5]]
    localStorage.setItem("startpage:bookmarks", JSON.stringify(bookmarks))
    userSearchInput = "bookmark saved"
    setTimeout(() => {
      userSearchInput = commandInput[0] + " " + commandInput[1] + " " + commandInput[2] + " " + commandInput[3] + " " + commandInput[4] + " " + commandInput[5]
      console.log(commandInput)
    }, 1000);
  } else if(commandInput[2] == "default") {
    localStorage.removeItem("bookmarks")
  }
}
*/

/*
function readBookmarks() {
  let temp = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("startpage:bookmarks"))))
  console.log(temp)
}
*/

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
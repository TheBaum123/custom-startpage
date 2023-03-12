// TODO: Convert hours minutes seconds and days into two digit numbers

const timeID = setInterval(clockAndDateUpdate, 1000);

function init() {
  document.body.style.background = "url(resources/img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
  document.body.style.backgroundSize = "cover"
}

document.getElementById("searchbox").addEventListener("change", function() {
  let searchinput = document.getElementById("searchbox").value
  console.log(searchinput)
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
        window.location.assign("https://www.google.com/search?q=" + searchinput)
        break
    }}}}}}}
})

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

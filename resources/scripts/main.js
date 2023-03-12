// TODO: Convert hours minutes seconds and days into two digit numbers

const timeID = setInterval(clockAndDateUpdate, 1000);

function init() {
  document.body.style.background = "url(resources/img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
  document.body.style.backgroundSize = "cover"
  document.getElementById("searchbox").focus()
}

document.getElementById("searchbox").addEventListener("change", function() {
  let searchinput = document.getElementById("searchbox").value
  if(searchinput.startsWith("reddit")) {
    if(searchinput.startsWith("reddit:")) {
      window.location.replace("https://www.reddit.com/search?q=" + searchinput.replace("reddit:", ""))
    } else {
      window.location.replace("https://www.reddit.com")
    }
  } else if(searchinput.startsWith("yt") || searchinput.startsWith("youtube")){
      if(searchinput.startsWith("yt:")) {
        window.location.replace("https://www.youtube.com/results?search_query=" + searchinput.replace("yt:", ""))
      } else if(searchinput.startsWith("youtube:")){
          window.location.replace("https://www.youtube.com/results?search_query=" + searchinput.replace("youtube:", ""))
        }
        else {
          window.location.replace("https://www.youtube.com")
        }
  } else if(searchinput.startsWith("twitch")) {
    if(searchinput.startsWith("twitch:")) {
      window.location.replace("https://www.twitch.tv/search?term=" + searchinput.replace("twitch:", ""))
    } else {
      window.location.replace("https://www.twitch.tv")
    } 
  } else if(searchinput.startsWith("gh") || searchinput.startsWith("github")){
      if(searchinput.startsWith("gh:")) {
        window.location.replace("https://github.com/search?q=" + searchinput.replace("gh:", ""))
      } else if(searchinput.startsWith("github:")){
          window.location.replace("https://github.com/search?q=" + searchinput.replace("github:", ""))
        }
        else {
          window.location.replace("https://www.github.com")
        }
  } else if(searchinput.startsWith("netflix")) {
    if(searchinput.startsWith("netflix:")) {
      window.location.replace("https://www.netflix.com/search?q=" + searchinput.replace("netflix:", ""))
    } else {
      window.location.replace("https://www.netflix.com")
    }
  } else if(searchinput.startsWith("http://") || searchinput.startsWith("https://")) {
    window.location.replace(searchinput)
  } else {
    window.location.replace("https://www.google.com/search?q=" + searchinput)
  }
})

document.onkeypress = function(e) {
  if (document.activeElement.id != "searchbox") {
    document.getElementById("searchbox").value = document.getElementById("searchbox").value + e.key
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

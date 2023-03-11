const timeID = setInterval(clockAndDateUpdate, 1000);

function init() {
  document.body.style.background = "url(img/" + Math.floor(Math.random() * 2) + ".jpg) no-repeat center center fixed"
  document.body.style.backgroundSize = "cover"
  document.getElementById("searchbox").focus()
}

document.getElementById("searchbox").addEventListener("change", function() {
  window.location.replace("https://www.google.com/search?q=" + document.getElementById("searchbox").value)
})

document.onkeypress = function(e) {
  if (document.activeElement.id != "searchbox") {
    document.getElementById("searchbox").focus()
    document.getElementById("searchbox").value = document.getElementById("searchbox").value + e.key
  }
}

function clockAndDateUpdate() {
  const today = new Date()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let seconds = today.getSeconds()
  let days = today.getDay()
  let month = today.getMonth();
  let year = today.getFullYear();
  let clockOutput = hours + " | " + minutes + " | " + seconds
  let dateOutput = days + " / " + monthConversion(month) + "\n" + year
  document.getElementById("clock").innerHTML = clockOutput
  document.getElementById("date").innerHTML = dateOutput
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

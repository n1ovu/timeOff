// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

// Function to get a cookie value
function getCookie(name) {
  const cookies = document.cookie.split("; ")
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=")
    if (key === name) return value
  }
  return null
}

// Grab all the elements
const buttons = document.querySelectorAll(".button")
const dayTypes = {
  vacation: document.querySelector(".vaca-days"),
  floater: document.querySelector(".float-days"),
  sick: document.querySelector(".sick-days"),
  fmla: document.querySelector(".fmla"),
}

// Initialize stored values from cookies
Object.keys(dayTypes).forEach((type) => {
  const savedDays = getCookie(`${type}Days`)
  dayTypes[type].textContent =
    savedDays !== null ? savedDays : dayTypes[type].textContent
})

// Generic function to take a day off
function takeDayOff(type) {
  let daysLeft = parseInt(dayTypes[type].textContent)

  if (daysLeft === 0) {
    alert(`You have no ${type} days left!`)
    return
  }

  daysLeft -= 1
  dayTypes[type].textContent = daysLeft
  setCookie(`${type}Days`, daysLeft, 30) // Store for 30 days
}

// Event listener for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.textContent.toLowerCase().replace("take ", "")
    if (dayTypes[type]) takeDayOff(type)
  })
})

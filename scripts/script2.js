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

// Function to check and reset leave days based on date
function resetDays() {
  const today = new Date()
  const currentYear = today.getFullYear()

  // Retrieve last reset year from cookies
  const lastResetYear = getCookie("lastResetYear")

  if (!lastResetYear || parseInt(lastResetYear) < currentYear) {
    // January 1 reset for floater and sick days
    if (today.getMonth() === 0 && today.getDate() === 1) {
      setCookie("floaterDays", 5, 365) // Set default floater days
      setCookie("sickDays", 10, 365) // Set default sick days
    }

    // June 1 reset for vacation days
    if (today.getMonth() === 5 && today.getDate() === 1) {
      setCookie("vacationDays", 15, 365) // Set default vacation days
    }

    // Store the last reset year
    setCookie("lastResetYear", currentYear, 365)
  }
}

// Grab all the elements
const buttons = document.querySelectorAll(".button")
const dayTypes = {
  vacation: document.querySelector(".vaca-days"),
  floater: document.querySelector(".float-days"),
  sick: document.querySelector(".sick-days"),
  fmla: document.querySelector(".fmla"),
}

// Reset the values if necessary
resetDays()

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

// Function to reset all days to default values use in the console

// document.cookie.split(";").forEach((cookie) => {
//     document.cookie = cookie.replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
//   });
//   console.log("All cookies have been reset!");

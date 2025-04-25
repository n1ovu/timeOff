// Grab all the elements that need manipulation
const buttons = document.querySelectorAll(".button")
const dayTypes = {
  vacation: document.querySelector(".vaca-days"),
  floater: document.querySelector(".float-days"),
  sick: document.querySelector(".sick-days"),
  fmla: document.querySelector(".fmla"),
}

// Initialize stored values
Object.keys(dayTypes).forEach((type) => {
  dayTypes[type].dataset.days =
    localStorage.getItem(`${type}Days`) || dayTypes[type].textContent
})

// Generic function to take a day off
function takeDayOff(type) {
  const daysLeft = parseInt(dayTypes[type].dataset.days)

  if (daysLeft === 0) {
    alert(`You have no ${type} days left!`)
    return
  }

  dayTypes[type].dataset.days = daysLeft - 1
  dayTypes[type].textContent = dayTypes[type].dataset.days
  localStorage.setItem(`${type}Days`, dayTypes[type].dataset.days)
}

// Event listener for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.textContent.toLowerCase().replace("take ", "")
    if (dayTypes[type]) takeDayOff(type)
  })
})

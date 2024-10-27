// grab all the elements that we need to manipulate
const buttons = document.querySelectorAll(".button")
const vacationDays = document.querySelector(".vaca-days")
const floaterDays = document.querySelector(".float-days")
const sickDays = document.querySelector(".sick-days")
const fmlaDays = document.querySelector(".fmla")

// function to take a vacation day
function takeVacation() {
  vacationDays.textContent = parseInt(vacationDays.textContent) - 1
  localStorage.setItem("vacationDays", vacationDays.textContent)
}

// function to take a floater day
function takeFloater() {
  floaterDays.textContent = parseInt(floaterDays.textContent) - 1
  localStorage.setItem("floaterDays", floaterDays.textContent)
}

// function to take a sick day
function takeSickDay() {
  sickDays.textContent = parseInt(sickDays.textContent) - 1
  localStorage.setItem("sickDays", sickDays.textContent)
}

// function to take a FMLA day
function takeFMLA() {
  fmlaDays.textContent = parseInt(fmlaDays.textContent) - 1
  localStorage.setItem("fmlaDays", fmlaDays.textContent)
}

// event listener for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Take Vacation") {
      takeVacation()
    } else if (button.textContent === "Take Floater") {
      takeFloater()
    } else if (button.textContent === "Take Sick") {
      takeSickDay()
    } else if (button.textContent === "Take FMLA") {
      takeFMLA()
    }
  })
})

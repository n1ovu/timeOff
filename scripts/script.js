// grab all the elements that we need to manipulate
const buttons = document.querySelectorAll(".button")
const vacationDays = document.querySelector(".vaca-days")
const floaterDays = document.querySelector(".float-days")
const sickDays = document.querySelector(".sick-days")
const fmlaDays = document.querySelector(".fmla")

// function to take a vacation day
function takeVacation() {
  vacationDays.innerHTML = parseInt(vacationDays.innerHTML) - 1
  localStorage.setItem("vacationDays", vacationDays.innerHTML)
}

// function to take a floater day
function takeFloater() {
  floaterDays.innerHTML = parseInt(floaterDays.innerHTML) - 1
  localStorage.setItem("floaterDays", floaterDays.innerHTML)
}

// function to take a sick day
function takeSickDay() {
  sickDays.innerHTML = parseInt(sickDays.innerHTML) - 1
  localStorage.setItem("sickDays", sickDays.innerHTML)
}

// function to take a FMLA day
function takeFMLA() {
  fmlaDays.innerHTML = parseInt(fmlaDays.innerHTML) - 1
  localStorage.setItem("fmlaDays", fmlaDays.innerHTML)
}

// event listener for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerHTML === "Take Vacation") {
      takeVacation()
    } else if (button.innerHTML === "Take Floater") {
      takeFloater()
    } else if (button.innerHTML === "Take Sick") {
      takeSickDay()
    } else if (button.innerHTML === "Take FMLA") {
      takeFMLA()
    }
  })
})

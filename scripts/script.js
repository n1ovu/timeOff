// grab all the elements that we need to manipulate
const buttons = document.querySelectorAll(".button")
const vacationDays = document.querySelector(".vaca-days")
const floaterDays = document.querySelector(".float-days")
const sickDays = document.querySelector(".sick-days")
const fmlaDays = document.querySelector(".fmla")

// vacationDays.textContent = localStorage.getItem("vacationDays")
// floaterDays.textContent = localStorage.getItem("floaterDays")
// sickDays.textContent = localStorage.getItem("sickDays")
// fmlaDays.textContent = localStorage.getItem("fmlaDays")

// function to take a vacation day
function takeVacation() {
  if (parseInt(vacationDays.textContent) === 0) {
    alert("You have no vacation days left!")
    return
  }
  vacationDays.textContent = parseInt(vacationDays.textContent) - 1
  localStorage.setItem("vacationDays", vacationDays.textContent)
}

// function to take a floater day
function takeFloater() {
  if (parseInt(floaterDays.textContent) === 0) {
    alert("You have no floater days left!")
    return
  }
  floaterDays.textContent = parseInt(floaterDays.textContent) - 1
  localStorage.setItem("floaterDays", floaterDays.textContent)
}

// function to take a sick day
function takeSickDay() {
  if (parseInt(sickDays.textContent) === 0) {
    alert("You have no paid sick days left!")
    return
  }
  sickDays.textContent = parseInt(sickDays.textContent) - 1
  localStorage.setItem("sickDays", sickDays.textContent)
}

// function to take a FMLA day
function takeFMLA() {
  if (parseInt(fmlaDays.textContent) === 0) {
    alert("You have no FMLA days left!")
    return
  }
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

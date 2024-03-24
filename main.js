const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()


async function temp() {
  // Promise is something that it's not copleted yet so we have to wait-await function to actualy finished
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const enTemperature = weatherData.properties.periods[0].temperature

  document.querySelector("#temp-output").textContent = enTemperature
}

temp()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(element => {
    // loop through each element of array and return each arguments of array

    const clone = template.content.cloneNode(true)

    clone.querySelector(".pet-card").dataset.species = element.species

    clone.querySelector("h3").textContent = element.name
    clone.querySelector(".pet-description").textContent = element.description
    clone.querySelector(".pet-age").textContent = createAgeText(element.birthYear)

    if (!element.photo) element.photo = "images/fallback.jpg"

    clone.querySelector(".pet-card-photo img").src = element.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${element.species} named ${element.name}.`


    wrapper.appendChild(clone)
  });
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "one year old"
  if (age == 0) return "less then a year old"
  // return age + " years old"
  return `${age} years old`
}

// pet filter button code
const allButtons = document.querySelectorAll(".pet-filter button")

allButtons.forEach(element => {
  element.addEventListener("click", handleButtonClick)
})

function handleButtonClick(event) {
  // remove active class from any and all buttons
  allButtons.forEach(element => element.classList.remove("active"))

  // add active class to the specific button that just got click
  event.target.classList.add("active")
 
  // actualy filter the pets down below
  const currentFilter = event.target.dataset.filter
  document.querySelectorAll(".pet-card").forEach(element => {
    if (currentFilter == element.dataset.species || currentFilter == "all") {
      element.style.display = "grid"
    } else {
      element.style.display = "none"
    }
  })

}










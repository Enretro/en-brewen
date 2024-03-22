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
    console.log(element.name)
  });
}

petsArea()

//Nasa Documentation
//https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh

//This variable holds the url we are going to get the meteorite data from
let meteoriteData = "https://data.nasa.gov/resource/y77d-th95.json?$limit=100000"

//This function converts the response from the webserver into a usable dataset
let convertResponseToData = (response) => response.json()

//This function remaps the names on the object to something more friendly (the column names on the table)
let prepareData = (meteorites) =>                       //this function takes an argument of a list of meteorites
  meteorites.map(                                       //run a new function for each list item
    (meteorite) => ({                                   //take the input of meteorite and map it to a new output:
      "id": meteorite.id,                               //passthrough
      "location": meteorite.name.toLowerCase(),         //change the class to lowercase for easy searching
      "lat": meteorite.reclat * 1,                      //make it a number
      "lng": meteorite.reclong * 1,                     //make it a number
      "mass": meteorite.mass,                           //pasthrough
      "class": meteorite.recclass.toLowerCase(),        //change the class to lowercase for easy searching
      "year": new Date(meteorite.year).getFullYear(),   //change the date into a whole number year
  }))

//this function takes a list of items and prints them into the webpage body
let displayResults = (meteorites) => {
  let resultCount = meteorites.length
  let tableRows = ''
  //Check if there are any results
  if (resultCount==0) {
    tableRows = '<tr><td>No Results Found!</td></tr>'
  }
  else {
    resultCount = meteorites.length
    tableRows = getResultRows(meteorites)
  }
  //return the appropriate values to the ui
  document.getElementById("results").innerHTML = tableRows
  document.getElementById("resultCount").innerHTML = resultCount
}

//this function takes a list of meteorites and converts them into a list of table rows
let getResultRows = (meteorites) => meteorites.map(
  meteorite => createResultRow(meteorite)
) .join(''); //join the array with a zero-length string so you don't get a comma in the html output

//this function takes a single meteorite and outputs a table row
let createResultRow = (meteorite) =>
`
  <tr>
    <td>${meteorite.id}</td>
    <td>${meteorite.location}</td>
    <td>${meteorite.lat}</td>
    <td>${meteorite.lng}</td>
    <td>${meteorite.mass} g</td>
    <td>${meteorite.class}</td>
    <td>${meteorite.year}</td>
  </tr>
`

//define how many grams are in a kilo
let oneKg = 1000

//-----------------------------------------------------------------------------------------------
//These functions are examples of filters you can write to filter the dataset
//-----------------------------------------------------------------------------------------------

//The meteorite was found in hereford
let foundInHereford = (meteorite) =>
  meteorite.location == 'hereford'


//Meteorites with masses greater than 1000kg
let massiveMeteorites = (meteorite) =>
  meteorite.mass > (1000 * oneKg)

//Meteorites with masses greater than 4000kg and less than 5000kg
let meteoritesBetween4and5tonnes = (meteorite) =>
  meteorite.mass > (4000 * oneKg) &&
  meteorite.mass < (5000 * oneKg)
 

//Meteorites with masses less than 2g (my wee Scottish boss named this one!)
let weeMeteorites = (meteorite) =>
  meteorite.mass < 2


//Meteorite with a class that contains the word "iron"
let containsIron = (meteorite) =>
  meteorite.class.includes("iron")
  // notice the javascript keyword 'includes' that does the work here, google it to find out what it does
 

//Meteorites found in the uk
let foundInTheUk = (meteorite) =>
  meteorite.lat >= 50 &&
  meteorite.lat <= 59 &&
  meteorite.lng >= -6 &&
  meteorite.lng <= 2
  //check the ascii map at the bottom to see why this creates a box around the uk for finding meterorites

//Just return everything, don't check any propeties on the object
let allItems = (meteorite) =>
  true

//-----------------------------------------------------------------------------------------------
//This is the function that performs the filter based on which filter you pass to it
//Replace the function in the middle with the name of the function you want to use to filter it
//-----------------------------------------------------------------------------------------------

let performFilter = (meteorites) =>
  meteorites.filter(
    foundInTheUk // <- this is the name of the function you are using to filter
                 // if the function starts with "let foundInTheUk = (meteorite) =>" then the function name is foundInTheUk
                 // this is shorthand for "(meteorite) => foundInTheUk(meteorite)"
  )


//-----------------------------------------------------------------------------------------------
// this function fetches the data from NASA, applies your filter and puts the results in the webpage
// This is the first time that anything atually happens, and all the work is done in these 5 lines
// fetch is the only function here that actually does anything when you refresh the page
//-----------------------------------------------------------------------------------------------
fetch(meteoriteData)
  .then(convertResponseToData)  //convert the response to data
  .then(prepareData)            //prepare the dataset for use
  .then(performFilter)          //run the filter function
  .then(displayResults)         //pass the list to the display function

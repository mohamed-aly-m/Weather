let searchInput = document.getElementById("searchInput");
let btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", function() {
    getWeather(searchInput.value);
});

getWeather("cairo");
let allWeather = [];

async function getWeather(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5f8f5ad2d69643ec910200257240412&q=${city}&days=3`);

    if (response.ok) {
        let data = await response.json();
        allWeather = data.forecast.forecastday;
        
        displayAllWeather(data);
        clrSearch();
    }
}

function clrSearch(){
    searchInput.value = "";
}

function displayAllWeather(data) {
    let cartona = "";

    // Today
    cartona += `
        <div class=" col-lg-4 col-md-6 col-sm-12 shadow">
            <div >
                <div id="wDate" class="bg-dark bg-opacity-50 text-light-emphasis d-flex justify-content-between  p-2 rounded-top-3">
                    <h4 class="text-white" >Today</h4>
                    <h4 class="text-white"> ${data.current.last_updated} </h4>
                </div>
                <div class="bg-secondary bg-opacity-50  ">
                    <div id="wCity" class="city p-2 "><h3> ${data.location.name} </h3></div>
                    <div id="wDegree" class="card-body py-1 text-center">
                        <div id="degIcon" class=" p-2">
                            <img src="https:${data.current.condition.icon}" alt="" width="90">
                        </div>
                        <div class="num">
                            <h1 class="display-1 fw-bold"> ${data.current.temp_c} <sup>o</sup>C</h1>
                        </div>
                    </div>
                    <div id="WeatheType " class="text-warning py-1 p-2 fw-bold"><h4>${data.current.condition.text}</h4></div>
                    <div id="weatherInfo" class=" bg-dark bg-opacity-50 p-3 text-white-50 ">
                        <i class="fa-solid fa-umbrella me-4 fa-2x"> <span class="h6"> ${data.current.humidity }  % </span></i>
                        <i class="fa-solid fa-wind fa-2x"> <span class="h6"> ${data.current.wind_kph }  Km/h </span></i>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tomorrow
    cartona += `
        <div class="col-lg-4 col-md-6 col-sm-12 shadow">
            <div >
                <div id="wDate" class="bg-dark bg-opacity-75 text-light-emphasis d-flex justify-content-between  p-2 rounded-top-3">
                    <h4 class="text-white" >Tomorrow</h4>
                    <h4 class="text-white"> ${data.forecast.forecastday[1].date} </h4>
                </div>
                <div class="bg-secondary   ">
                    <div id="wDegree" class="card-body py-3 text-center">
                        <div id="degIcon" class=" py-3">
                            <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="logo" width="90">
                        </div>
                        <div id="num" class=" p-4">
                            <h1 class="display-4 text-white fw-bold"> ${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</h1>
                            <h1 class="display-6 text-white-50 fw-bold"> ${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C</h1>
                        </div>
                        <div id="WeatheType " class="text-warning py-2 p-2"><h4>${data.forecast.forecastday[1].day.condition.text}</h4></div>
                    </div>          
                </div>
            </div>
        </div>
    `;

    // Day after tomorrow
    cartona += `
        <div class="col-lg-4 col-md-6 col-sm-12 shadow">
            <div >
                <div id="wDate" class="bg-dark bg-opacity-50 text-light-emphasis d-flex justify-content-between  p-2 rounded-top-3">
                    <h4 class="text-white" >After Tomorrow</h4>
                    <h4 class="text-white"> ${data.forecast.forecastday[2].date} </h4>
                </div>
                <div class="bg-secondary  bg-opacity-50 ">
                    <div id="wDegree" class="card-body py-3 text-center">
                        <div id="degIcon" class=" py-3">
                            <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="logo" width="90">
                        </div>
                        <div id="num" class=" p-4">
                            <h1 class="display-4 text-white fw-bold "> ${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</h1>
                            <h1 class="display-6 text-white-50 fw-bold"> ${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C</h1>
                        </div>
                        <div id="WeatheType " class="text-warning py-2 p-2 fw-bold"><h4>${data.forecast.forecastday[2].day.condition.text}</h4></div>
                    </div>          
                </div>
            </div>
        </div>
    `;

    document.getElementById("dataRow").innerHTML = cartona;
}

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZoneEl = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forcast");
const currentWeatherForecastEl = document.getElementById("current-temp");

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"Febuary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"Sepember",
	"Octember",
	"November",
	"December",
];

setInterval(() => {
	const time = new Date();
	const month = time.getMonth();
	const date = time.getDate();
	const day = time.getDay();
	const hour = time.getHours();
	const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
	const minutes = time.getMinutes();
	const ampm = hour >= 12 ? "PM" : "AM";

	timeEl.innerHTML =
		hoursIn12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

	dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
  
}, 1000);

GetWeatherData()
function GetWeatherData() {
	navigator.geolocation.getCurrentPosition((success) => {
		console.log(success);
        

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=a706a60b5945a0fd1d953a9b0992edf0`).then(res => res.json()).then(data => {

            console.log(data);
            showWeatherData(data);
        });

	})
}
 
function showWeatherData(data){

    currentWeatherItemsEl.innerHTML = `<div class="weather_items">
							<div>Humidity</div>
							<div>${data.list[0].main.humidity}%
                            </div>
						</div>
						<div class="weather_items">
							<div>Pressure</div>
							<div>${data.list[0].main.pressure}hPa</div>
						</div>
						<div class="weather_items">
							<div>Wind Speed</div>
							<div>${data.list[0].wind.speed}m/s</div>
						</div>
						<div class="weather_items">
							<div>Sunrise</div>
							<div>${window.moment(data.city.sunrise *1000).format('hh:mm a')}</div>
						</div>
						<div class="weather_items">
							<div>Sunset</div>
							<div>${window.moment(data.city.sunset *1000).format('hh:mm a')}</div>
						</div>`;

						// let otherDayForcast = ' ';
						// data.list.forEach((day, idx) => {
						// 	if(idx == 0){

						// 	}
						// 	else{
						// 		otherDayForcast += `
						// 		<div class="weather-forcast-items">
						// 			<div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
						// 			<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}2x.png" alt="weather icon" class="w-icon" />
						// 			<div class="temp">Night - ${day.main.temp_min} &#176; C</div>
						// 			<div class="temp">Day - ${day.main.temp_max} &#176; C</div>
						// 		</div>								
						// 		`
								 
						// 	}
	
						// })


// weatherForecastEl.innerHTML = otherDayForcast;

document.getElementById("w1").innerHTML=`<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}2x.png" alt="weather icon" class="w-icon" />`;
document.getElementById("mn").innerHTML=`${data.list[0].main.temp_max}`;
document.getElementById("n8").innerHTML=`${data.list[3].main.temp_min}`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Create an array of days
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Get the current date
    const today = new Date();
    
    // Get the current day of the week as a number (0-6)
    const dayIndex = today.getDay();
    
    // Get the name of the current day
    const currentDayName = days[dayIndex];
    
    // Display the current day in the HTML element with id "current-day"
    document.getElementById("current-day").textContent = currentDayName;

    // Function to get the day name for a given date offset
    function getDayName(offset) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + offset);
        return days[futureDate.getDay()];
    }
    
    // Update the forecast for the next 5 days
    for (let i = 1; i <= 5; i++) {
        const dayElement = document.getElementById(`day-${i}`);
        const dayName = getDayName(i);
        dayElement.querySelector(".day").textContent = dayName;
    }
});





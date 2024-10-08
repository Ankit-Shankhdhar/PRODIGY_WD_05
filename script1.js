const apiKey="a706a60b5945a0fd1d953a9b0992edf0";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
	var data = await response.json();
	
	console.log(data);
	 
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".temp").innerHTML = data.main.temp;

}

searchBtn.addEventListener("click",() => {
	checkWeather(searchBox.value);

})


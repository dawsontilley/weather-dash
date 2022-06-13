var searchBtn =document.querySelector("#search");
var inputField=document.querySelector("#input");
var Cor  =[44.6475811,-63.5727683];
var todayEl=document.querySelector("#today");

var checkUV = function(uv){
    if (uv<2){
        return "success";
    }
    else if (uv<5 && uv>=2){
        return"warning";
    }
    else{
        return "danger"
    }
};
var searchCity =function(){

};
searchBtn.addEventListener("click",searchCity);


var createToday=function(date,temp,wind,uv,imgCode){
    console.log("in create today");
    var todayDiv = document.createElement("div");
    todayDiv.setAttribute("class","card");
    //todayDiv.setAttribute("data-id",id);


    var text_date= document.createElement("p");
    text_date.textContent="Date: "+date;

    var text_temp= document.createElement("p");
    text_temp.textContent="Temperature: "+temp;

    var text_wind= document.createElement("p");
    text_wind.textContent="Wind Speed: "+ wind;

    var uv_div=document.createElement("div");
    
    var text_uv= document.createElement("p");
    text_uv.textContent="UV Index: "+uv;
    var uv_color=checkUV(uv);
    uv_div.setAttribute("class","bg-"+uv_color);

    var weather_img = document.createElement("img");
    weather_img.style.height="100px";
    weather_img.style.width="100px";

    weather_img.src="http://openweathermap.org/img/wn/"+imgCode+"@2x.png";


    uv_div.appendChild(text_uv);
    todayDiv.appendChild(text_date);
    todayDiv.appendChild(weather_img);
    todayDiv.appendChild(text_temp);
    todayDiv.appendChild(text_wind);
    todayDiv.appendChild(uv_div);
    todayEl.appendChild(todayDiv);
}

createToday("24/7/22",22,65,3.1,"01d");

var createFiveDay= function(){

};

var getCity = function(city) {
    // format the github api url
    
    var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyDwHybJMlRHSs9v9suUhunJX4LdKP-Q1CQ";
    
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(resul) {
            console.log(resul);
            let lat=resul.results[0].geometry.location.lat;
            let long=resul.results[0].geometry.location.lng;
            console.log(lat);
            console.log(long);
            return lat,long;
            //displayRepos(results, user);
          });
        } else {
          alert('Error: City Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Google Maps");
      });
  };

  var getIcon=function(icon){
      var apiURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    fetch (apiURL).then(function(response){
        if (response.ok){
            console.log(response);
            response.json.then(function(result){
                return response;
            })
        }
    })
  
    };

  var getWeather = function(coordinates) {
    // format the github api url
    
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+coordinates[0]+"&lon="+coordinates[1]+"&appid=9971c39fce27741076215129d5ba7fbf";
    
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(resul) {
            console.log(resul);
            // current weather
            let dt=resul.current.dt;
            let temp=resul.current.temp;
            let humid=resul.current.humidity;
            let wnd=resul.current.wind_speed;
            let uv=resul.current.uvi;
            let weather=resul.resul.current.weather
            // five day forecast
            //day one
            let dt1=resul.daily[1].dt;
            let temp1=resul.daily[1].temp.day;
            let wind1=resul.daily[1].wind_speed;

            console.log(lat);
            console.log(long);
            return lat,long;
            //displayRepos(results, user);
          });
        } else {
          alert('Error: City Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Google Maps");
      });
  };

  //getCity("Halifax");
  
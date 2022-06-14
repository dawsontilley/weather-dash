var searchBtn =document.querySelector("#search");
var inputField=document.querySelector("input").value;
var Cor  =[44.6475811,-63.5727683];
var todayEl=document.querySelector("#today");
var fiveDayEl=document.querySelector("#five-day");
var historyEl = document.querySelector("#history");


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
    if(!inputField){
        window.alert("Please Enter Value");
    }
    getCity(inputField);
    var 
};


var createHistory=function(name,lat_long){
var histDiv = document.createElement("div");
histDiv.setAttribute("data-lat",lat_long[0]);
histDiv.setAttribute("data-long",lat_long[1]);
histDiv.id=name;
histDiv.classList.add("card");


var histP = document.createElement("p");
histP.innerText=name;
histDiv.appendChild(histP);
historyEl.addEventListener("click",handleHistory)

}

var clearCurrent= function (){
    var todayDel=document.querySelector(".today-delete");
    todayDel.remove();
    for (var z=1;z<6;z++){
    var fiveDel=document.querySelector("#day-"+z);
    fiveDel.remove();
    }
};

var handleHistory = function (event){
event.preventDefault;
    if (event.target.classList.contains("card")){
        var clickHist=event.target
        var coordinates=[clickHist.data-lat,clickHist.data_long];
        var name=clickHist.id;
        clearCurrent();
        getWeather(name,coordinates);
        
    }


};


var createToday=function(city,date,temp,wind,humid,uv,imgCode){
    console.log("in create today");
    var todayDiv = document.createElement("div");
    todayDiv.setAttribute("class","card today-delete");
    //todayDiv.setAttribute("data-id",id);

    var city_name=document.createElement("p");
    city_name.textContent=city;

    var text_date= document.createElement("p");
    text_date.textContent="Date: "+date;

    var text_temp= document.createElement("p");
    text_temp.textContent="Temperature: "+temp;

    var text_wind= document.createElement("p");
    text_wind.textContent="Wind Speed: "+ wind;

    var text_humid= document.createElement("p");
    text_humid.textContent="Wind Speed: "+ humid;


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

//createToday("24/7/22",22,65,3.1,"01d");

var createFiveDay= function(daysout,date,temp,wind,humid,imgID){

    console.log("in create five day");
    var todayDiv = document.createElement("div");
    todayDiv.classList.add("d-inline-block", "card", "w-20","five-day-del");
    //todayDiv.style.width="20%";
    //todayDiv.setAttribute("class","card d-inline");
    //todayDiv.setAttribute("data-id",id);
    todayDiv.id="day-"+daysout;

    var text_date= document.createElement("p");
    text_date.textContent="Date: "+date;

    var text_temp= document.createElement("p");
    text_temp.textContent="Temperature: "+temp;

    var text_wind= document.createElement("p");
    text_wind.textContent="Wind Speed: "+ wind;

    var text_humid= document.createElement("p");
    text_humid.textContent="Wind Speed: "+ humid;


    var uv_div=document.createElement("div");
  
    var weather_img = document.createElement("img");
    weather_img.style.height="100px";
    weather_img.style.width="100px";

    weather_img.src="http://openweathermap.org/img/wn/"+imgID+"@2x.png";


   
    todayDiv.appendChild(text_date);
    todayDiv.appendChild(weather_img);
    todayDiv.appendChild(text_temp);
    todayDiv.appendChild(text_wind);
  
    fiveDayEl.appendChild(todayDiv);

};
/*
for (var i=1;i<6;i++){
    createFiveDay(i,"04,05,1999",44,55,5,"01d");
};

clearCurrent();

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
  };*/


  var getCity = function(city) {
    // format the github api url
    
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=9971c39fce27741076215129d5ba7fbf";;
    //"http://api.openweathermap.org/geo/1.0/direct?q="+London+"&limit=5&appid=9971c39fce27741076215129d5ba7fbf";
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(resul) {
            console.log(resul);
            let lat=resul[0].lat
            let long=resul[0].lon
            console.log(lat);
            console.log(long);
            getWeather(city,[lat,long]);
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

  var getWeather = function(name,coordinates) {
    // format the github api url
    
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+coordinates[0]+"&lon="+coordinates[1]+"&appid=855c07885ee0ba89b4dace39f3c6c5cf";
    //9971c39fce27741076215129d5ba7fbf
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
            //let weather=resul.resul.current.weather

            createToday(name,dt,temp,humid,wnd,uv)
            // five day forecast
            //day one
            for (let i=1;i<6;i++){
                let dt1=resul.daily[i].dt;
                let temp1=resul.daily[i].temp.day;
                let wind1=resul.daily[i].wind_speed;
                createFiveDay(i);
            }
            
            
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

  searchBtn.addEventListener("click",searchCity);
  //getCity("Halifax");
  
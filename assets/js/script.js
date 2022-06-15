var searchBtn =document.querySelector("#search");
//var inputField=document.querySelector("input").value;
var Cor  =[44.6475811,-63.5727683];
var todayEl=document.querySelector("#today");
var fiveDayEl=document.querySelector("#five-day");
var historyEl = document.querySelector("#history");
var savedCitys=[];

var saveCities = function() {
    localStorage.setItem("citys", JSON.stringify(savedCitys));
  };

  var loadCities = function() {
    cities = JSON.parse(localStorage.getItem("citys"));
   
    if (!cities) {
       //console.log("no tasks");
       return;
       
      };
    
    
    for (var i=0;i<cities.length;i++){
            console.log(cities[i]);
            createHistory(cities[i]);
       
  }
};

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
    clearCurrent();
    var myinput=document.querySelector("input").value;
    console.log(myinput);
    if(!myinput){
        window.alert("Please Enter Value");
    }else{
    getCity(myinput);
    }
    createHistory(myinput);
    savedCitys.push(myinput);
    saveCities(savedCitys);
    
};


var createHistory=function(name){
var histDiv = document.createElement("div");
//histDiv.setAttribute("data-lat",lat_long[0]);
//histDiv.setAttribute("data-long",lat_long[1]);
histDiv.id=name;

histDiv.classList.add("card");


var histP = document.createElement("p");
histP.classList.add("inner");
histP.innerText=name;
histDiv.appendChild(histP);
historyEl.appendChild(histDiv);
historyEl.addEventListener("click",handleHistory);

//savedCitys.push(name);

}

var clearCurrent= function (){
    var todayDel=document.querySelector(".today-delete");
    if (!todayDel){
        return;
    }
    todayDel.remove();
    for (var z=0;z<6;z++){
    var fiveDel=document.querySelector("#day-"+z);
        if(fiveDel){
        fiveDel.remove();
        }
    }
};

var getTime=function(unix){
    
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix * 1000);
    // Hours part from the tiestamp
    var actualdate = date.getDate();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    var day = date.getDay();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var newTime=actualdate+"/"+day
    return(newTime);
    
};

var handleHistory = function (event){
event.preventDefault;
console.log(event.target);
    if (event.target.classList.contains("card")){
        var clickHist=event.target
        //var coordinates=[clickHist.data-lat,clickHist.data_long];
        var name=clickHist.id;
        clearCurrent();
        getCity(name);
        
        
    }
    else{
       var handleP= event.target.parentElement;
       var name2=handleP.id;
       console.log(name2);
       clearCurrent();
       getCity(name2);
    }

};

// creates the today forecaset
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
    text_humid.textContent="Humidity: "+ humid;


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
    todayDiv.appendChild(city_name);
    todayDiv.appendChild(text_date);
    todayDiv.appendChild(weather_img);
    todayDiv.appendChild(text_temp);
    todayDiv.appendChild(text_wind);
    todayDiv.appendChild(text_humid);
    todayDiv.appendChild(uv_div);
    todayEl.appendChild(todayDiv);
}


// creates the five day forecast
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
    text_temp.textContent="Temperature (F): "+temp;

    var text_wind= document.createElement("p");
    text_wind.textContent="Wind Speed (MPH): "+ wind;

    var text_humid= document.createElement("p");
    text_humid.textContent="Humidity: "+ humid;


    var uv_div=document.createElement("div");
  
    var weather_img = document.createElement("img");
    weather_img.style.height="100px";
    weather_img.style.width="100px";

    weather_img.src="http://openweathermap.org/img/wn/"+imgID+"@2x.png";


   
    todayDiv.appendChild(text_date);
    todayDiv.appendChild(weather_img);
    todayDiv.appendChild(text_temp);
    todayDiv.appendChild(text_wind);
    todayDiv.appendChild(text_humid);
  
    fiveDayEl.appendChild(todayDiv);

};

// gets the coordinates based on the city
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
        alert("Unable to connect to Open weather");
      });
  };
  
//get UV from UV index
  var getUV= function(coor){
    //var fiveURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+coordinates[0]+"&lon="+coordinates[1]+"&units=imperial&appid=21b731edfa8707cb82b913a8b6d8b8fc";
    
        newURL='https://api.openuv.io/api/v1/uv?lat=' + coor[0] + '&lng=' + coor[1]

    
        
        fetch(newURL, {
          headers: {
            'x-access-token': 'ac2eef338e284332eac275521df03add'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
        }).then( function(response) {
            // request was successful
            if (response.ok) {
                //return response.json();
              //console.log(response);
              response.json().then( function(resul) {
                console.log(resul);
                // current weather
                let uv=resul.result.uv;
                console.log("UV NOW" +uv);
                return uv;
              })}})};



  var getWeather = async function(name,coordinates) {
    
    //console.log("IN GET WEATHER , Latitude: "+coordinates[0]+"Longitude: "+coordinates[1]);
    
    var fiveURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+coordinates[0]+"&lon="+coordinates[1]+"&units=imperial&appid=21b731edfa8707cb82b913a8b6d8b8fc";

    var currentURL="https://api.openweathermap.org/data/2.5/weather?lat="+coordinates[0]+"&lon="+coordinates[1]+"&units=imperial&appid=21b731edfa8707cb82b913a8b6d8b8fc";

    
    
    //var myUV=await getUV(coordinates).results.uv;
    fetch(currentURL)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          //console.log(response);
          response.json().then(async function(resul) {
            console.log(resul);
            // current weather
            let dt=resul.dt;
            let tz=resul.timezone;
            dt =dt+tz;
            let formatdt=getTime(dt);
            let temp=resul.main.temp;
            let humid=resul.main.humidity;
            let wnd=resul.wind.speed;
            let imgID=resul.weather[0].icon;
            //var uvInd= await getUV(coordinates);

            newURL='https://api.openuv.io/api/v1/uv?lat=' + coordinates[0] + '&lng=' + coordinates[1]

    
        // Default options are marked with *
        fetch(newURL, {
          headers: {
            'x-access-token': 'ac2eef338e284332eac275521df03add'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         // body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then( function(response) {
            // request was successful
            if (response.ok) {
                //return response.json();
              //console.log(response);
              response.json().then( function(resul) {
                console.log(resul);
                // current weather
                let uv=resul.result.uv;
                console.log("UV NOW" +uv);
                
                
                //console.log("UV ID: "+uvInd);
                //let weather=resul.resul.current.weather
                //console.log(myUV);
                createToday(name,formatdt,temp,humid,wnd,uv,imgID);
              })}})
            //console.log(uvInd);
    
            //resul.current.uvi;
          
            // five day forecast
            //day one
            
            
            //displayRepos(results, user);
          });
        } else {
          alert('Error: Weather not found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to current weather");
      });

      fetch(fiveURL)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(resul) {
            console.log(resul);
            // current weather
            
            //day one
            for (let i=0;i<5;i++){
                var temp=i*8;
                let dt1=resul.list[temp].dt_txt;
                let temp1=resul.list[temp].main.temp;
                let humid1=resul.list[temp].main.humidity;
                let wind1=resul.list[temp].wind.speed;
                let img1=resul.list[temp].weather[0].icon;
                createFiveDay(i,dt1,temp1,humid1,wind1,img1);
            }
            
            
            //displayRepos(results, user);
          });
        } else {
          alert('Error: Five Day not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Five Day forecast");
      });




  };

  searchBtn.addEventListener("click",searchCity);
  loadCities();
  //getCity("Halifax");
  
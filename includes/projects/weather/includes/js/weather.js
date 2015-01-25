
$(document).ready(function(){

  var weatherWidget = {  // THE WEATHER WIDGET

      len : cities.length-1,  // VARIABLES
      count : 0,
      cityHolder : "",
      status : "ok",
      slider : undefined,

      init : function(){ // initialise widget function
          var i;
          var availableTags = [];
          for(i = 0; i < weatherWidget.len; i++){   // for each city object
            if(weatherWidget.status == "ok"){       // if no error has occured
              weatherWidget.getWeather(cities[i]);  // get the weather data for this city
              // update the cityHolder variable with the dom markup for this city
              weatherWidget.cityHolder+="<div id=\""+cities[i].id+"\" class=\"slide\"><a class=\"cityName\" \
              id=\""+i+"\" href=\"javascript:void(0)\">"+cities[i].name+"</a></div>";
              availableTags.push(cities[i].name);
            }
          }
          $( "#city-input" ).autocomplete({ // instantiate autocomplete
            select: function( event, ui ) {
              var value = ui.item.value;
              console.log(value);
              var tagid = weatherWidget.getTagId(value, availableTags);
              if(tagid > -1){
                if(tagid != 0){
                    tagid = tagid / 4;
                    tagid = Math.floor(tagid);

                }
                console.log(tagid);
                weatherWidget.slider.goToSlide(tagid); // get pos id of this tag, if exists
              }
            },
            source: availableTags,
            minLength:2,
            autoFocus:true
          });
          $("input[name=city-input]").on("input",function(e){ // add listener to autocmplete input value
            var value = $(this).val();
            var tagid = weatherWidget.getTagId(value, availableTags);
            if(tagid > -1){
                weatherWidget.slider.goToSlide(tagid); // get pos id of this tag, if exists
            }
          });
      },

      getTagId : function(value, availableTags){ // loop through availableTags if this value is present return position id else return -1 
          var i;
          var tagsLength = availableTags.length;
          var returnValue = -1;
          for(i = 0; i < tagsLength; i++){
            if(availableTags[i] == value){
                returnValue = i;
                break;
            }
          }
          return returnValue;
      },

      doSlider : function(){ // call the box slider
        weatherWidget.slider = $(".slider").bxSlider({
          slideWidth: 200,
          minSlides: 2,
          maxSlides: 4,
          slideMargin: 10
        },weatherWidget.updateSlides()); // update the slides for each city on the callback
      },  

      updateSlides : function(){
        for(i = 0; i < weatherWidget.len; i++){ // for each city
            var city = cities[i]; 
            var temp = Math.round( city.weatherObj.main.temp * 10 ) / 10; // round up the temperature
            $("#"+city.id).append( // update the city slide with the weather data
              "<img src=\"includes/images/weather_icons/icons_120x100/"+city.weatherObj.weather[0].icon+".png\"/>" +
              "<h5>"+temp+"\u2103</h5>" +
              "<h6>"+city.weatherObj.weather[0].description+"</h6>"
              );
        }
      },

      getWeather : function(city) { // Do an AJAX request for the weather data for this city
        var xmlhttp;
        var url = "http://api.openweathermap.org/data/2.5/weather?id="+city.id+"&units=metric&APPID=f116f82e95b28cca621d22094c34af28";
        if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
        }else{// code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
          if (xmlhttp.readyState==4){ // if the request has completed
            if(xmlhttp.status==200){  // if the request was successful update the city object with this weather data
              city.weatherObj = weatherWidget.updateWeatherObject(xmlhttp.responseText);
              weatherWidget.count++;  // increase the count variable
              if(weatherWidget.count == weatherWidget.len){ // if this is the last city in the array
                  weatherWidget.updateSlider(); // update the dom with the data for each city
              }
            }else{
              weatherWidget.status = "Error"; // if there is an error, call the error handler
              weatherWidget.catchError();
            }
          }
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
      },

      updateWeatherObject : function(response){ // convert the json to a javascript object
        var jsonObject = $.parseJSON(response);
        return jsonObject;
      },

      updateSlider : function(){ // update the slider div with the contents of the cityHolder markup
          document.getElementsByClassName("slider")[0].innerHTML = weatherWidget.cityHolder;
          weatherWidget.getTodaysDate();
          weatherWidget.doSlider(); // call the slider
          $(".bx-default-pager").remove(); // remove unwanted selector from dom
          $("#loading").remove(); // remove the loading div
          $("#city-input").show();
          // add click events to the city names
          $(".cityName").each(function(index) {
              $(this).on("click", function(){
                  weatherWidget.doForecast(this.id);
                  var html = "<h2>"+cities[this.id].name+"</h2>";
                  $("#selectedCity").html(html);
              });
          });  
      },

      getTodaysDate : function(){
          var todaysDate = weatherWidget.timeConverter(false, true);
          var dateHtml = "<h2>"+todaysDate+"</h2>"
          $("#date").html(dateHtml);
      },

      catchError : function(){  // handle the error 
        $("#loading").remove(); // remove the loading div
        var error = "An ERROR occured!!!!!!!" // replace the sider div contents with the error markup
        document.getElementsByClassName("slider")[0].innerHTML = error;
      },

      doForecast : function(id){
        if($('.bx-wrapper')[1]){
          var forecastSlider = $('.forecast').bxSlider();
          forecastSlider.destroySlider();
          $('.bx-wrapper')[1].remove();
          var html = "<div class=\"forecast\"></div>";
          $('#content').append(html);
        }
        var city = cities[id];
        var xmlhttp;
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id="+city.id+"&units=metric&APPID=f116f82e95b28cca621d22094c34af28";
        if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
        }else{// code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
          if (xmlhttp.readyState==4 && xmlhttp.status==200){ // if the request has completed
                  weatherWidget.updateForecast(xmlhttp.responseText); // update the dom with the data for each city
          }else{
              weatherWidget.catchForecastError();
          }
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.send(); 
      },
      catchForecastError : function(){
        $("#forecast").html("Whoops... something went wrong!");
      },

      updateForecast : function(data) { // Do an AJAX request for the weather forecast for this city        
        weatherWidget.forecastSlider = $(".forecast").bxSlider({
          slideWidth: 200,
          minSlides: 2,
          maxSlides: 4,
          infiniteLoop: false,
          slideMargin: 10
        },weatherWidget.updateForecastSlides(data)); // update the slides for the seven day forecast
      }, 

      updateForecastSlides : function(data){
        var forecast = weatherWidget.updateWeatherObject(data);
        console.log(forecast);
        var html = "";
        var forecastLen = forecast.list.length;
        var date = "";
        for(var i = 0; i < forecastLen; i++){
            switch(i){
              case 0:
                date = "Today";
              break;
              case 1:
                date = "Tomorrow";
              break;
              default:
                date = weatherWidget.timeConverter(forecast.list[i].dt, false);
            }
            var tempDay = Math.round( forecast.list[i].temp.day * 10 ) / 10; // round up the temperature
            var tempMin = Math.round( forecast.list[i].temp.min * 10 ) / 10; // round up the temperature
            var tempMax = Math.round( forecast.list[i].temp.max * 10 ) / 10; // round up the temperature
            var tempNight = Math.round( forecast.list[i].temp.night * 10 ) / 10; // round up the temperature
            var tempEve = Math.round( forecast.list[i].temp.eve * 10 ) / 10; // round up the temperature
            var tempMorn = Math.round( forecast.list[i].temp.morn * 10 ) / 10; // round up the temperature
            html += "<div id=\"day_"+i+"\" class=\"dailySlide\"> \
                    <h3>"+date+"</h3> \
                    <img src=\"includes/images/weather_icons/icons_120x100/"+forecast.list[i].weather[0].icon+".png\"/> \
                    <h5>Day : "+tempDay+"</h5> \
                    <h5>Min : "+tempMin+"</h5> \
                    <h5>Max : "+tempMax+"</h5> \
                    <h5>Morn : "+tempMorn+"</h5> \
                    <h5>Eve : "+tempEve+"</h5> \
                    <h5>Night :"+tempNight+"</h5> \
                    <h6>"+forecast.list[i].weather[0].description+"</h6> \
                    </div>";
        }
        document.getElementsByClassName("forecast")[0].innerHTML = html;
      },

      timeConverter : function(date, today){
        var a = (today)? new Date() : new Date(date*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var theDate = a.getDate();
        var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";
        var nth = '';
        if (theDate > 3 && theDate < 21)    // catch teens, which are all 'th'
            nth = theDate + 'th';
        else if (theDate % 10 == 1)         // exceptions ending in '1'
            nth = theDate + 'st';
        else if (theDate % 10 == 2)         // exceptions ending in '2'
            nth = theDate + 'nd';
        else if (theDate % 10 == 3)         // exceptions ending in '3'
            nth = theDate + 'rd';
        else
            nth = theDate + 'th';           // everything else
        var day = weekday[a.getDay()];
        var time = day+' '+nth+' '+month+' '+year;
        return time;
      }   

  }

  weatherWidget.init(); // call the initialise weatherWidget function

});  








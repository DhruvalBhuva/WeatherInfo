const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const dataHide=document.querySelector('.middle_layer');
const day=document.querySelector('#day');
const date=document.querySelector('#today_data');


/**Day-Date section */
const getCurrentDay = () => {
    let currentDay = new Date();
  
    // currentTime.getDay(); will give us interger number according days so need to store it in arry for easy use
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // console.log(days[currentDay.getDay()]);
    return days[currentDay.getDay()];
  };
  
  const getCurrentTime = () => {
    let currentTime = new Date();
  
    const months = [
      "January",
      "Februay",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "Octomber",
      "Nevember",
      "December",
    ];
  
    let month = months[currentTime.getMonth()];
    let date = currentTime.getDate();
    let hr = currentTime.getHours();
    let min = currentTime.getMinutes();
  
    hour = hr > 12 ? hr - 12 : hr;
    let period = hour > 12 ? "PM" : "AM";
    min = (min < 10 ? "0": "") + min;
    hr = (hour < 10 ? "0": "") + hour; 

  
    return `${month} ${date} | ${hr}:${min} ${period}`;
  };
  day.innerHTML=`${getCurrentDay()}`
  date.innerHTML=` ${getCurrentTime()}`
  
/**Temp-Section */

const getInfo = async (e) => {
  e.preventDefault();

  let cityVal = cityName.value;
  if (cityVal === "") {
    dataHide.classList.add('data_hide');
    city_name.innerHTML = `Please Enter the City Name`;
  } else {
    try {
      
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=3ded34fb5f31496903ce190f2249baae`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      let aryData = [data];

      dataHide.classList.remove('data_hide')

      city_name.innerText = `${aryData[0].name} , ${aryData[0].sys.country}`;
      temp.innerText = aryData[0].main.temp+'C';
      temp_status.innerText = aryData[0].weather[0].main;
      const weatherStatus = aryData[0].weather[0].main

      const weatherApi = 'http://localhost:8000/weather/'
      fetch(weatherApi,{
        method:"POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
        time:getCurrentTime(),
        day: getCurrentDay(),
        city:cityVal,
        temp: aryData[0].main.temp,
        condition:weatherStatus
      })})
      .catch(error=>console.log({error}))

      if (weatherStatus == "Sunny") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #fff;'></i>";
      } else if (weatherStatus == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #fff;'></i>";
      } else if (weatherStatus == "Rainy") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #fff;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #fff;'></i>";
      }
      cityName.value = "";
    } catch (error) {
      city_name.innerHTML = `Please Enter the City Name properly`;
      cityName.value = "";
      dataHide.classList.add('data_hide')
      console.log(error);
    }
  }
};

submitBtn.addEventListener("click", getInfo);

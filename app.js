
const majors=['Mumbai','Dubai','London','Tokyo','New York','Paris','Singapore','Sydney'];
async function getWeather(city){
 let g=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`).then(r=>r.json());
 if(!g.results) return null;
 let p=g.results[0];
 let w=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`).then(r=>r.json());
 return {name:p.name,country:p.country,temp:w.current.temperature_2m,hum:w.current.relative_humidity_2m,wind:w.current.wind_speed_10m};
}
async function loadCities(){
 let el=document.getElementById('cities');
 for(const c of majors){let d=await getWeather(c); if(d) el.innerHTML+=`<div class='city'><b>${d.name}</b><br>🌡️ ${d.temp}°C<br>💧 ${d.hum}%<br>💨 ${d.wind}</div>`;}
}
async function searchCity(){
 let city=document.getElementById('city').value; let d=await getWeather(city);
 if(d){document.getElementById('current').innerHTML=`<h2>${d.name}</h2><p>${d.country}</p><p>🌡️ ${d.temp}°C</p><p>💧 ${d.hum}%</p><p>💨 ${d.wind}</p>`;}
}
navigator.geolocation?.getCurrentPosition(async pos=>{
 let w=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`).then(r=>r.json());
 document.getElementById('current').innerHTML=`📍 Your Location<br>🌡️ ${w.current.temperature_2m}°C<br>💧 ${w.current.relative_humidity_2m}%<br>💨 ${w.current.wind_speed_10m}`;
});
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
loadCities();

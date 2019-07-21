window.addEventListener('load', () => {
	let long;
	let lat;
	let te
	if (navigator.geolocation){

		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/10ffd1cb3e42f7665c3018815e42777b/${lat},${long}`;
			
			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data =>{
				
				const {temperature , summary , icon} = data.currently;
				document.getElementById('temperature-degree').innerHTML = temperature;
				document.getElementById('temperature-description').innerHTML = summary;
				document.getElementById('location-timezone').innerHTML = data.timezone;
				setIcons (icon , document.querySelector('.icon'));	
									console.log(data);

				

				//daily data
				//console.log(data.daily);
				var today = data.daily.data;
				console.log(today);
				for (i=0 ; i < 6; i++){
					document.getElementById('temperature-degree'+i).innerHTML = Math.floor((data.daily.data[i].temperatureHigh - 32) * 5/9);
					
					var timestamp = data.daily.data[i].time;
					var a = new Date(timestamp*1000);
					var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					var dayOfWeek = days[a.getDay()];
					document.getElementById('day'+i).innerHTML = dayOfWeek;
					//document.getElementById('temperature-description'+i).innerHTML = data.daily.data[i].summary;
					setIcons (data.daily.data[i].icon , document.querySelector('.temperature-description'+i));	

				}
				//change background
				if (icon === 'partly-cloudy-day')
				{
					document.getElementById('body').style.background = 'linear-gradient(rgb(212,215,178) , rgb(205, 218, 64))';
				}else if (icon === 'clear-night'){
					document.getElementById('body').style.background = 'linear-gradient(rgb(1,0,10) , rgb(56, 56, 55))';

				}
				else if (icon === 'rain'){
					document.getElementById('body').style.background = 'linear-gradient(rgb(67,127,154) , rgb(13, 89, 122))';

				}

				//change from F to C
				let celcius = (temperature - 32) * 5/9;
				document.getElementById('temp').addEventListener('click', ()=> {
					if (document.getElementById('icon_span').textContent === 'F'){
						document.getElementById('icon_span').innerHTML = 'C';
						document.getElementById('temperature-degree').innerHTML = Math.floor(celcius);

					}else{
						document.getElementById('icon_span').innerHTML = 'F';
						document.getElementById('temperature-degree').innerHTML = Math.floor(temperature);

					}
				});			

			});
		});
	}
	function setIcons(icon , iconId){
		const skycons = new Skycons({color : 'white' , "resizeClear": true});
		const current_icon = icon.replace(/-/g , '_').toUpperCase();
		skycons.play();
		return skycons.set (iconId , Skycons[current_icon]);


	}

});
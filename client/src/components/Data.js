import React, { Component } from "react";
import Weather from "./Weather";
import CurrentWeather from "./CurrentWeather";
import WeekWeather from "./WeekWeather";
import Places from "./Places";
import axios from "axios";

const moment = require("moment-timezone");

class Data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentWeather: [],
			date: "",
			places: [],
			currentWeatherTemps: [],
			currentWind: "",
			location: "",
			high: "",
			low: "",
			weather: [],
			sunrise: "",
			sunset: "",
			ratings: "",
		};
	}

	componentDidMount = () => {
		this.handleSubmit(34.0522, -118.2437, "Los Angeles, CA, USA");
	};

	handleSubmit = (latitude, longitude, cityname) => {
		let lat = latitude.toString();
		let long = longitude.toString();
		let cityName = cityname;
		let LatLng = lat.concat(",", long);
		let WeatherLatLng = `lat=${lat}&lon=${long}`;

		axios
			.get(`/places/${LatLng}`)
			.then((response) => {
				let res = response.data;
				this.setState({ places: res.businesses });
				this.getStars(res.businesses);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get(`/weather/${WeatherLatLng}`)
			.then((response) => {
				let res = response.data;
				let list = [];
				for (let i = 0; i < res.list.length; i += 8) {
					list.push([
						moment(res.list[i].dt_txt).format("ddd"),
						res.list[i].weather[0].id,
						res.list[i].weather[0].main,
						res.list[i].weather[0].description,
						Math.ceil(res.list[i].main.temp_max),
						Math.floor(res.list[i].main.temp_min),
					]);
				}
				this.setState({ location: cityName, weather: list });
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get(`/currentweather/${WeatherLatLng}`)
			.then((response) => {
				let res = response.data;
				this.setState({
					date: this.currentDate(res.dt, res.timezone),
					currentWeather: res.weather[0],
					currentWeatherTemps: res.main,
					high: Math.ceil(res.main.temp_max),
					low: Math.floor(res.main.temp_min),
					currentWind: Math.ceil(res.wind.speed),
					sunrise: `${this.getTimes(res.sys.sunrise, res.timezone)} AM`,
					sunset: `${this.getTimes(res.sys.sunset, res.timezone)} PM`,
				});
				console.log(res.main.temp_max);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	currentDate = (time, tzoffset) => {
		let srTime = new Date((time + tzoffset) * 1000);
		srTime = moment(srTime).format("LL");
		return srTime;
	};

	getTimes = (time, tzoffset) => {
		const srTime = new Date((time + tzoffset) * 1000);
		const twoDigits = (val) => {
			return ("0" + val).slice(-2);
		};
		let hours = twoDigits(srTime.getUTCHours());
		hours > 12 ? (hours = hours - 12) : (hours = hours.substring(1));
		const minutes = twoDigits(srTime.getUTCMinutes());
		const finalTime = `${hours}:${minutes}`;
		return finalTime;
	};

	getStars = (bus) => {
		let places = bus;
		let ratingsArr = [];
		for (let index in places) {
			const starsTotal = 5;
			const starPercentage = (places[index].rating / starsTotal) * 100;
			let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
			ratingsArr.push(starPercentageRounded);
		}
		this.setState({ ratings: ratingsArr });
	};

	render() {
		return (
			<React.Fragment>
				<div className="sample-section">
					<div className="search-bar-mobile">
						<Weather handleSubmit={this.handleSubmit.bind(this)} />
					</div>
					<CurrentWeather
						high={this.state.high}
						low={this.state.low}
						date={this.state.date}
						location={this.state.location}
						currentWeather={this.state.currentWeather}
						currentWeatherTemps={this.state.currentWeatherTemps}
						currentWind={this.state.currentWind}
						sunset={this.state.sunset}
						sunrise={this.state.sunrise}
					/>
					<div className="weeks-weather-places">
						<div className="search-bar-desktop">
							<Weather handleSubmit={this.handleSubmit.bind(this)} />
						</div>
						<WeekWeather weather={this.state.weather} />
						<Places places={this.state.places} ratings={this.state.ratings} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Data;

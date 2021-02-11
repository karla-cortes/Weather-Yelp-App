import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var FontAwesome = require("react-fontawesome");

library.add(faWind, faSun, faMoon, faTint, faThermometerThreeQuarters);

class CurrentWeather extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="top-section current">
				<div className="current-weather">
					<div className="today-current-weather">
						<i class={`owf owf-${this.props.currentWeather["id"]} owf-5x`}></i>
						<h3>Today</h3>
						<p>{this.props.date}</p>
						<h3>{this.props.location}</h3>

						<div className="temperature-section">
							<span className="temperature">
								{Math.ceil(this.props.currentWeatherTemps["temp"])}&#176;
							</span>
							<span className="feels-like">
								Feels Like{" "}
								{Math.ceil(this.props.currentWeatherTemps["feels_like"])}&#176;
							</span>
							<p>{this.props.currentWeather["description"]}</p>
						</div>
					</div>

					<div className="weather-bar">
						<div className="weather-bar-element">
							<FontAwesomeIcon icon={faThermometerThreeQuarters} size="2x" />
							<p>High/Low</p>
							<p>
								{this.props.high}&#176;/{this.props.low}&#176;
							</p>
						</div>

						<div className="weather-bar-element">
							<FontAwesomeIcon icon={faWind} size="2x" />
							<p>Wind</p>
							<p>{this.props.currentWind} mph</p>
						</div>

						<div className="weather-bar-element">
							<FontAwesomeIcon icon={faTint} size="2x" />
							<p>Humidity</p>
							<p>{this.props.currentWeatherTemps["humidity"]}%</p>
						</div>

						<div className="weather-bar-element">
							<FontAwesomeIcon icon={faSun} size="2x" />
							<p>Sunrise</p>
							<p>{this.props.sunrise}</p>
						</div>

						<div className="weather-bar-element">
							<FontAwesomeIcon icon={faMoon} size="2x" />
							<p>Sunset</p>
							<p>{this.props.sunset}</p>
						</div>
					</div>
				</div>
				<div className="gradient current"></div>
			</div>
		);
	}
}

export default CurrentWeather;

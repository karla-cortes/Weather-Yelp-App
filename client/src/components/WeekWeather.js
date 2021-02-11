import React, { Component } from "react";

class WeekWeather extends Component {
	state = {};
	render() {
		return (
			<div className="top-section">
				<div className="week-weather">
					<div className="weeks-weather-header">
						<h2>This Week</h2>
					</div>

					<div className="weeks-weather">
						{this.props.weather.map((item, i) => (
							<ul>
								<li>{item[0]} </li>
								<li>
									<i class={`owf owf-${item[1]} owf-3x`}></i>
								</li>
								<li>{item[2]}</li>
								<li>{item[3]}</li>
								<li>
									{" "}
									{item[4]}&#176;/{item[5]}&#176;
								</li>
							</ul>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default WeekWeather;

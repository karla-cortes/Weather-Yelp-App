import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMapMarkerAlt, faStar, faStarHalfAlt);

class Places extends Component {
	state = {
		rating: "",
	};

	render() {
		if (this.props.places.length > 0) {
			return (
				<React.Fragment>
					<div className="places-header">
						<h2>Places to Visit</h2>
					</div>

					<div className="places-container">
						{this.props.places.map((item, i) => (
							<div className="places">
								<a href={item.url} target="_blank" rel="noreferrer">
									<img src={item.image_url} alt={item.name} />
									<div className="place-info">
										<div className="bottom-left no-marker">
											<p className="title"> {item.name}</p>

											<div className="stars">
												<div class="stars-outer">
													<div
														class="stars-inner"
														style={{ width: this.props.ratings[i] }}
													></div>
												</div>
												<span class="number-rating">{item.rating}</span>
											</div>
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<div>
					<p>Sorry no places were found in this location</p>
					<p>{this.state.rating}</p>
				</div>
			);
		}
	}
}

export default Places;

import React from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import scriptLoader from "react-async-script-loader";

library.add(faSearch);
function Weather({ handleSubmit, isScriptLoaded, isScriptLoadSucceed }) {
	const [address, setAddress] = React.useState("");
	const [coordinates, setCoordinates] = React.useState({
		lat: null,
		lng: null,
	});

	const handleChange = (value) => {
		setAddress(value);
	};

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		handleSubmit(latLng.lat, latLng.lng, value);
		setAddress(value);
		setCoordinates(latLng);
	};

	if (isScriptLoaded && isScriptLoadSucceed) {
		return (
			<div className="top-section">
				<PlacesAutocomplete
					value={address}
					onChange={handleChange}
					onSelect={handleSelect}
					searchOptions={{ types: ["geocode"] }}
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div className="search-bar">
							<form>
								<FontAwesomeIcon icon={faSearch} className="search-button" />
								<input
									{...getInputProps({
										placeholder: "Search City or Zip Code",
									})}
									type="search"
								/>
							</form>

							<div className="drop-down">
								{loading && <div>Loading...</div>}
								{suggestions.map((suggestion) => {
									const style = suggestion.active
										? { color: "#88d2f0", cursor: "pointer" }
										: { backgroundColor: "#ffffff", cursor: "pointer" };

									return (
										<div {...getSuggestionItemProps(suggestion, { style })}>
											{suggestion.description}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default scriptLoader([
	`https://maps.googleapis.com/maps/api/js?key=AIzaSyAdjCck2Sns4vUNqVAqimDhZITv34DKVVQ&libraries=places`,
])(Weather);

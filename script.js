const HDG = {
	API: "XXXXXXXXXXXXXXX",
	ENDPOINT: "https://api.ipgeolocation.io/ipgeo?apiKey=",
	init: async function () {
		console.log("HDGeolocation init");

		let redirect = localStorage.getItem("HDG_REDIRECTION");
		let location = localStorage.getItem("HDG_LOCATION");

		if (location === null) {
			location = await HDG.locate();
		}

		if (redirect === "nope") {
			return; // user stated that they do not want to redirect
		}

		if (location !== "Canada") {
			HDG.popup();
		}
	},
	locate: async function () {
		let location = await fetch(HDG.ENDPOINT + API);
		location = await location.json();
		localStorage.setItem("HDG_LOCATION", location.country_name);
		return location.country_name;
	},
	popup: function () {
		document.getElementById("hdg_popup").classList.add("active");
		document.getElementById("HDG_STAY").addEventListener("click", function () {
			// user stated that they do not want to redirect
			localStorage.setItem("HDG_REDIRECTION", "nope");
			document.getElementById("hdg_popup").classList.remove("active");
		});
	},
};
HDG.init();

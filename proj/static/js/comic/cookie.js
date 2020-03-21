// deleteAllCookies();
// document.cookie = "url=/api/" + apiUrlToSet + ";path=/";

// HANDLE COOKIES
function deleteAllCookies() {
	let cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let eqPos = cookie.indexOf('=');
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}
}

function getCookie(cname) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

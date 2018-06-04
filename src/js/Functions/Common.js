export function callAjax(url, callback){
    const xmlhttp = new XMLHttpRequest();// Compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
export function ValidateEmail(email) {
	const expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}
export function fadeEffect(elem, dir, speed ) {
	if(elem !== null){
		let outInterval = setInterval(function() {
			if(dir == "In"){
				elem.style.opacity -= 0.02;
				if (elem.style.opacity <= 0) {	clearInterval(outInterval);} else {	elem.style.opacity -= 0.1;}
				if (elem.style.opacity <= 0) {
					clearInterval(outInterval);
					var inInterval = setInterval(function() {
						elem.style.opacity = Number(elem.style.opacity) + 0.02;
						if (elem.style.opacity >= 1)	clearInterval(inInterval);
					}, speed/50);
				}
			} else {
				if (!elem.style.opacity) {	elem.style.opacity = 1;}
				if (elem.style.opacity < 0.1) {	clearInterval(outInterval);} else {	elem.style.opacity -= 0.1;}
			}
		}, speed/50);
	}
}
export function GetElmTrought(containerID, childID, dir) {
    let elm = (dir == 1) ? {}:0;
    const Start = (containerID == "body") ? document.body : document.getElementById(containerID);
    const elms = Start.getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].name === childID || elms[i].id === childID) {
            elm = (dir == 1) ? elms[i] : 1;
            break;
        }
    }
    return elm;
}
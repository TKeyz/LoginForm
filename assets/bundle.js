/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _Common = __webpack_require__(2);

function checkDataUser() {
	var pwd_input = '<div id="password-input" class="float-l full-box o-hide box-rltiv vmarg-5 shadow-light hmarg-auto">' + '<label id="btn-login" class="box-abst icon-50 bg-grey-1 pos-top-0 pos-lft-0 pointer l-password">&nbsp;</label>' + '<input type="password" id="password" name="user_password" placeholder="Votre password" />' + '</div>';
	inpt_username.disabled = true;
	inpt_username.removeAttribute("autofocus");
	form_box.insertAdjacentHTML('beforeend', pwd_input);
	(0, _Common.fadeEffect)(document.getElementById('password-input'), "In", 800);
	document.getElementById('password').focus();
}
function Login(evnt, id_form) {
	var form_box = document.getElementById(id_form);
	var inpt_password = document.getElementById('password');
	if (inpt_password.value.length > 5) {
		var check_hidden_inpt = (0, _Common.GetElmTrought)(id_form, 'login_admin', 2);
		var hidden_inpt = "<input id='login_admin' type='hidden' name='login_admin' value='1' />";
		if (check_hidden_inpt < 1) {
			form_box.insertAdjacentHTML('beforeend', hidden_inpt);
		}
		inpt_password.disabled = true;
		setTimeout(function () {
			var sendForm = (0, _Common.callAjax)(ajax_url_path + '?send_form=Login&username=' + inpt_username.value + '&password=' + inpt_password.value, sendLoginForm);
		}, 1000);
	}
	return false;
}

function checkUserVal(checkReturn) {
	if (checkReturn.value == 1) {
		setTimeout(checkDataUser, 900);
	} else {
		inpt_username.disabled = false;
	}
}
function sendLoginForm(loginReturn) {
	var msg_return = loginReturn.msg_return;
	document.getElementById('password').disabled = false;
	if (loginReturn.value == 1) {
		var check_exst_box = (0, _Common.GetElmTrought)("body", 'general', 2);
		if (check_exst_box == 1) {
			var current_page = document.getElementById('general');
			(0, _Common.fadeEffect)(current_page, "Out", 2000);
			current_page.outerHTML = "";
			document.body.innerHTML += '<div id="success-login" class="min-blk-30 t-22 big-marg-top o-hide hmarg-auto text-center">' + loginReturn.msg_return + '<div class="text-center big-marg-top"><a class="div-box-60 bg-site white width-box-1 padd-1 rounded" href="/uxform/">Log out</a></div>' + '</div>';
			(0, _Common.fadeEffect)(document.getElementById('success-login'), "In", 2000);
		}
	} else {
		document.getElementById('msg-error').innerHTML = msg_return;
		(0, _Common.fadeEffect)(document.getElementById('msg-error'), "In", 800);
	}
	return false;
}

function evntKeyboard(evnt, id_box) {
	(0, _Common.fadeEffect)(document.getElementById('msg-error'), "Out", 800);
	if (evnt.keyCode == 13) {
		var inpt_password = document.getElementById('password');
		if (typeof inpt_password != "undefined" || inpt_password !== null) {
			Login(evnt, id_box);
		} else {
			return false;
		}
	}
}

var form_box = document.getElementById('login-user');
var inpt_username = document.getElementById('username');
var ajax_url_path = 'src/php/Request.php';
window.onload = function () {
	var typingTimer;
	var doneTypingInterval = 1000;
	if (form_box.addEventListener) {
		form_box.addEventListener("submit", function (evt) {
			evt.preventDefault();
		}, false);
	} else {
		form_box.attachEvent('onsubmit', function (evt) {
			evt.preventDefault();
		});
	}
	inpt_username.addEventListener('keyup', function (e) {
		(0, _Common.fadeEffect)(document.getElementById('msg-error'), "Out", 800);
		var username = this.value;
		clearTimeout(typingTimer);
		if (username.length > 5 && (0, _Common.ValidateEmail)(username)) {
			typingTimer = setTimeout(function () {
				var checkEmailData = (0, _Common.callAjax)(ajax_url_path + '?checkdatasUser=Login&username=' + username, checkUserVal);
			}, doneTypingInterval);
		}
	}, false);
};
document.onchange = function () {
	if (typeof document.getElementById('password') != "undefined" || document.getElementById('password') !== null) {
		var inpt_password = document.getElementById('password');
		inpt_password.addEventListener('keyup', function handler(e) {
			evntKeyboard(e, form_box.id);
			this.removeEventListener('keyup', handler);
		}, false);
	}
	if (typeof document.getElementById('btn-login') != "undefined" || document.getElementById('btn-login') !== null) {
		var btn_login = document.getElementById('btn-login');
		btn_login.addEventListener('click', function handler(e) {
			Login(e, form_box.id);
			this.removeEventListener('click', handler);
		}, false);
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.callAjax = callAjax;
exports.ValidateEmail = ValidateEmail;
exports.fadeEffect = fadeEffect;
exports.GetElmTrought = GetElmTrought;
function callAjax(url, callback) {
	var xmlhttp = new XMLHttpRequest(); // Compatible with IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function ValidateEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}
function fadeEffect(elem, dir, speed) {
	if (elem !== null) {
		var outInterval = setInterval(function () {
			if (dir == "In") {
				elem.style.opacity -= 0.02;
				if (elem.style.opacity <= 0) {
					clearInterval(outInterval);
				} else {
					elem.style.opacity -= 0.1;
				}
				if (elem.style.opacity <= 0) {
					clearInterval(outInterval);
					var inInterval = setInterval(function () {
						elem.style.opacity = Number(elem.style.opacity) + 0.02;
						if (elem.style.opacity >= 1) clearInterval(inInterval);
					}, speed / 50);
				}
			} else {
				if (!elem.style.opacity) {
					elem.style.opacity = 1;
				}
				if (elem.style.opacity < 0.1) {
					clearInterval(outInterval);
				} else {
					elem.style.opacity -= 0.1;
				}
			}
		}, speed / 50);
	}
}
function GetElmTrought(containerID, childID, dir) {
	var elm = dir == 1 ? {} : 0;
	var Start = containerID == "body" ? document.body : document.getElementById(containerID);
	var elms = Start.getElementsByTagName("*");
	for (var i = 0; i < elms.length; i++) {
		if (elms[i].name === childID || elms[i].id === childID) {
			elm = dir == 1 ? elms[i] : 1;
			break;
		}
	}
	return elm;
}

/***/ })
/******/ ]);
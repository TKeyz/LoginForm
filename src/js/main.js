import '../scss/main.scss';

import {ValidateEmail, fadeEffect, callAjax, GetElmTrought} from '../js/Functions/Common';


function checkDataUser(){
	const pwd_input = '<div id="password-input" class="float-l full-box o-hide box-rltiv vmarg-5 shadow-light hmarg-auto">'+
					'<label id="btn-login" class="box-abst icon-50 bg-grey-1 pos-top-0 pos-lft-0 pointer l-password">&nbsp;</label>'+
					'<input type="password" id="password" name="user_password" placeholder="Votre password" />'+
					'</div>';
	inpt_username.disabled = true;
	inpt_username.removeAttribute("autofocus");
	form_box.insertAdjacentHTML('beforeend', pwd_input);
	fadeEffect(document.getElementById('password-input'), "In", 800 );
	document.getElementById('password').focus();
}
function Login(evnt, id_form){
	let form_box = document.getElementById(id_form);
	let inpt_password = document.getElementById('password');
	if(inpt_password.value.length > 5){
		var check_hidden_inpt = GetElmTrought(id_form, 'login_admin', 2);
		var hidden_inpt = "<input id='login_admin' type='hidden' name='login_admin' value='1' />";
		if(check_hidden_inpt < 1){	form_box.insertAdjacentHTML('beforeend', hidden_inpt);}
		inpt_password.disabled = true;
		setTimeout(function(){
			let sendForm = callAjax(ajax_url_path + '?send_form=Login&username='+inpt_username.value+'&password='+inpt_password.value, sendLoginForm);
		}, 1000);
	}
	return false;
}

function checkUserVal(checkReturn){
	if(checkReturn.value == 1){	setTimeout(checkDataUser, 900);} else {	inpt_username.disabled = false;}
}
function sendLoginForm(loginReturn){
	const msg_return = loginReturn.msg_return;
	document.getElementById('password').disabled = false;
	if(loginReturn.value == 1){
		var check_exst_box = GetElmTrought("body", 'general', 2);
		if(check_exst_box == 1){
			let current_page = document.getElementById('general');
			fadeEffect(current_page, "Out", 2000);
			current_page.outerHTML = "";
			document.body.innerHTML += '<div id="success-login" class="min-blk-30 t-22 big-marg-top o-hide hmarg-auto text-center">'+
										loginReturn.msg_return+
										'<div class="text-center big-marg-top"><a class="div-box-60 bg-site white width-box-1 padd-1 rounded" href="/uxform/">Log out</a></div>'+
										'</div>';
			fadeEffect(document.getElementById('success-login'), "In", 2000);
		}
	} else {
		document.getElementById('msg-error').innerHTML = msg_return;
		fadeEffect(document.getElementById('msg-error'), "In", 800);
	}
	return false;
}

function evntKeyboard(evnt, id_box){
	fadeEffect(document.getElementById('msg-error'), "Out", 800);
	if(evnt.keyCode == 13){
		var inpt_password = document.getElementById('password');
		if(typeof inpt_password != "undefined" || inpt_password !== null){
			Login(evnt, id_box);
		} else {
			return false;
		}
	}
}

var form_box = document.getElementById('login-user');
var inpt_username = document.getElementById('username');
var ajax_url_path = 'src/php/Request.php';
window.onload = function() {
	var typingTimer;
	var doneTypingInterval = 1000;
	if (form_box.addEventListener){
		form_box.addEventListener("submit", function(evt) {	evt.preventDefault();}, false);
	} else {
		form_box.attachEvent('onsubmit', function(evt){	evt.preventDefault();});
	}
	inpt_username.addEventListener('keyup', function(e) {
		fadeEffect(document.getElementById('msg-error'), "Out", 800);
		var username = this.value;
		clearTimeout(typingTimer);
		if(username.length > 5 && ValidateEmail(username)){
			typingTimer = setTimeout(function(){
				let checkEmailData = callAjax(ajax_url_path + '?checkdatasUser=Login&username='+username, checkUserVal);
			}, doneTypingInterval);
		}
	}, false);
}
document.onchange = function(){
	if(typeof document.getElementById('password') != "undefined" || document.getElementById('password') !== null){
		var inpt_password = document.getElementById('password');
		inpt_password.addEventListener('keyup', function handler(e) {
			evntKeyboard(e, form_box.id);
			this.removeEventListener('keyup', handler);
		}, false);
	}
	if(typeof document.getElementById('btn-login') != "undefined" || document.getElementById('btn-login') !== null){
		var btn_login = document.getElementById('btn-login');
		btn_login.addEventListener('click', function handler(e) {
			Login(e, form_box.id);
			this.removeEventListener('click', handler);
		}, false);
	}
}
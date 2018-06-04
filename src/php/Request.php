<?php

$rightEmail = "design@tkeyz.com";
$regexEmail = '#^[^ <>:!/?,\'&\#%$*@+]+\@[^ <>:!/?,\'&\#%$*@+]+\.[a-z]{2,}$#';

function checkString($value, $regxPattern){
	$cleanValue = (preg_match($regxPattern, $value) ? trim(strtolower($value)) : "Null");
	return $cleanValue;
}
//CHECK DATAS USER
if(!empty($_GET['checkdatasUser'])){
	$check_Email = checkString($_GET['username'], $regexEmail);
	if($check_Email != "Null"){
		$return_value = ($check_Email == $rightEmail ? 1 : 0);
	} else {
		$return_value = 0;
	}
	$checkDatasReturn = array(	'value' => $return_value);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($checkDatasReturn);
}
//SEND FORM
if(!empty($_GET['send_form'])){
	$msg_return = 'Impossible de continuer!';
	$check_Email = checkString($_GET['username'], $regexEmail);
	if($check_Email != "Null"){
		$check_email = ($check_Email == $rightEmail ? 1 : 0);
		if($check_email == 1){
			$return_value = (trim($_GET['password']) == "helloworld" ? 1 : 0);
			$msg_return = ($return_value == 1 ? 'Bravo!' : 'Mauvais indentifiants! Veuillez recommencer');
		} else {
			$return_value = 0;
			$msg_return = 'Email incorrect!';
		}
	} else {
		$return_value = 0 ."";
	}
	$checkDatasReturn = array(	'value' => $return_value, 'msg_return' => $msg_return);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($checkDatasReturn);
}
?>
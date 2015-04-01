<?php
error_reporting(0);

if (isset($_POST['Data'])){
	echo call_user_func($_POST['Function'], $_POST['Data']);
} else {
	echo call_user_func($_POST['Function']);
}

function saveResult($data=array()) {
	$file = "results.txt";
	$resultString = $_SERVER['REMOTE_ADDR'].' | '.date("Y-m-d H:i:s").' | '.$data['questionNumber'].' | '.$data['state']."\n";
	file_put_contents($file, $resultString, FILE_APPEND | LOCK_EX);
	return "1";
}

function getNextQuestion($data=array()){
	$lines = file("fragen.txt");
	$line = $data["questionNumber"];
	if ($line < count($lines))
		return ($line+1).". ".$lines[$line];
	else 
		return 0;
}

?>
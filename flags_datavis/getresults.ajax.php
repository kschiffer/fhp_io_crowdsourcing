<?php

header('Content-Type: application/json');

$lines = file('http://projects.kevinschiffer.de/flag-survey/results.txt');

$mostBeautiful = array();
$mostThreatening = array();
$mostPeaceful = array();
$mostUgly = array();
$mostMysterious = array();
$flagsWithData = array();
$dataSets = 0;

foreach ($lines as $line_num => $line) {
    $parts = explode("|", $line);
    $ip = trim($parts[0]);
    $number = trim($parts[2]);
    $country = trim($parts[3]);
    #echo $country.' '.$number.' '.$ip.'<br>';
    if (strpos($country, '/') !== false) continue;
	$flagsWithData[] = $country;
	$dataSets++;
    switch($number){
        case '1':
            if (array_key_exists($country, $mostBeautiful)){
                $mostBeautiful[$country] += 1;
            } else {
                $mostBeautiful[$country] = 1;
            }
            break;
        case '2':
            if (array_key_exists($country, $mostThreatening)){
                $mostThreatening[$country] += 1;
            } else {
                $mostThreatening[$country] = 1;
            }
            break;
        case '3':
            if (array_key_exists($country, $mostPeaceful)){
                $mostPeaceful[$country] += 1;
            } else {
                $mostPeaceful[$country] = 1;
            }
            break;
        case '4':
            if (array_key_exists($country, $mostUgly)){
                $mostUgly[$country] += 1;
            } else {
                $mostUgly[$country] = 1;
            }
            break;
        case '5':
            if (array_key_exists($country, $mostMysterious)){
                $mostMysterious[$country] += 1;
            } else {
                $mostMysterious[$country] = 1;
            }
            break;
    }
}

$flagsWithData = array_unique($flagsWithData);

arsort($mostBeautiful);
arsort($mostThreatening);
arsort($mostPeaceful);
arsort($mostUgly);
arsort($mostMysterious);

$result = array(
    "mostBeautiful"=>$mostBeautiful,
    "mostThreatening"=>$mostThreatening,
    "mostPeaceful"=>$mostPeaceful,
    "mostUgly"=>$mostUgly,
    "mostMysterious"=>$mostMysterious,
    "flagsWithData"=>$flagsWithData,
    "maxBeautiful"=>reset($mostBeautiful),
	"maxThreatening"=>reset($mostThreatening),
	"maxPeaceful"=>reset($mostPeaceful),
	"maxUgly"=>reset($mostUgly),
	"maxMysterious"=>reset($mostMysterious),
	"dataSets"=>$dataSets
    );

echo json_encode($result);
?>
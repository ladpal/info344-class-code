<?php


$json_string = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=Seattle,us&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0"); 
$parsed_json = json_decode($json_string);
print_r($json_string); 
echo "\n"; 
print_r($parsed_json);


?>
<?php
/*$num = rand (1 , 100);
echo "your new random valus is {$num}\n";*/
date_default_timezone_set ('AMERICA/Los_Angeles');
$num = 0;
$monthnumber = 1;
$month = jdmonthname(gregoriantojd($monthnumber, 1, 1), CAL_MONTH_GREGORIAN_LONG);
$months = array();
while ($num < 12) {
   $month = jdmonthname(gregoriantojd($monthnumber++, 1, 1), CAL_MONTH_GREGORIAN_LONG); 
   $months[$num] = $month;
   $num++;
}
sort($months, SORT_STRING);
foreach ($months as $key => $val) {
    echo "months[" . $key . "] = " . $val . "\n";
}
//echo "<pre>"; print_r($months);
?>
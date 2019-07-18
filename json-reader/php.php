<?php
$jsonData = json_decode(file_get_contents('sample.json'));
print_r($jsonData);
echo '<br/>';
    foreach($jsonData as $key01 => $val01) {
	  if(is_object($val01)){
	    foreach($val01 as $key02 => $val02) {
		  echo $key01 . ':: '.$key02.' : '.$val02.'<br/>';
		}
	  } else {
	    echo $key01 . ': '.$val01.'<br/>';
	  }
        
        echo '<br>';
    }
?>
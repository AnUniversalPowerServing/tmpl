<?php
 session_start();
 function authenticated(){
   if(isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER']=='root' && $_SESSION["BASIC_AUTHENTICATION"]=='OFF'){ 
     $_SESSION["BASIC_AUTHENTICATION"]='ON';
	 return true;
   } else {
      header('WWW-Authenticate: Basic realm="My Realm"'); 
	  header('HTTP/1.0 401 Unauthorized');
      echo 'Authentication Failed';
	  $_SESSION["BASIC_AUTHENTICATION"]='OFF';
	  return false;
   }
 }
 if(authenticated()){
   echo 'User Authenticated';
 }
?>
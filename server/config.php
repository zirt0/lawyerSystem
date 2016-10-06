<?php

//$con = mysql_connect("localhost", "root", "karlik") or die(mysql_error()); 

//mysql_select_db("storagesystem") or die(mysql_error()); 

//$conn = new mysqli("localhost", "root", "", "suleyok47_say");
header('Content-Type: text/html; charset=utf-8');

$conn = new mysqli("localhost", "root", "karlik", "customersystem");
 // $argHost = "localhost";
 // $argUsername = "root";
 // $argPassword = "karlik";
 // $argDB = "customersystem";
 
 // $dbLink = mysql_connect($argHost, $argUsername, $argPassword);
 //    mysql_query("SET character_set_results=utf8", $dbLink);
 //    mb_language('uni'); 
 //    mb_internal_encoding('UTF-8');
 //    mysql_select_db($argDB, $dbLink);
 //    mysql_query("set names 'utf8'",$dbLink);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

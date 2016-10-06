<?php 


$conn = new mysqli("localhost", "root", "karlik", "customersystem");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
	

	$sql = "SELECT * FROM invoice WHERE id = " . $_GET['id'];
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= $rs["content"];
	    //$outp .= '"content":"'. $rs["content"]    . '"}';
	} 
header('Content-Type: application/pdf');
echo base64_decode($outp);
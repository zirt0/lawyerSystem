<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id = $request->id;

$args = $request->args;

//print $subject;


if($subject == "declaration_remove"){

	$sql = "DELETE FROM declarations_type
			WHERE id='" . $id . "';";

				if ($conn->query($sql) === TRUE) {
				    
				    $result = "Removed";
				    
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				    //$result = "false";
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "remove_user"){

	$sql = "DELETE FROM users
			WHERE id='" . $id . "';";

				if ($conn->query($sql) === TRUE) {
				    
				    $result = "Removed";
				    
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				    //$result = "false";
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "remove_subscription"){

	$sql = "DELETE FROM subscription
			WHERE id='" . $id . "';";

				if ($conn->query($sql) === TRUE) {
				    
				    $result = "Removed";
				    
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				    //$result = "false";
				}
				$outp = $result;
				//$outp = $sql;
}



$conn->close();

echo $outp;
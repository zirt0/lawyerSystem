<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$args = $request->args;


if($subject == "notes_add"){

	$sql = "INSERT INTO notes (case_id, from_user_id, to_user_id, content)
			VALUES ( '" . $args->case_id . "', '" . $args->from_user_id . "', '" . $args->to_user_id . "', '" . $args->content . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
				$outp = $sql;
}


$conn->close();

echo $outp;
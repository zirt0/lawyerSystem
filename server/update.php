<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id = $request->id;

$args = $request->args;

//print $subject;


if($subject == "users_change_password"){

	$sql = "UPDATE users 
			SET password = '" . $args->passwordmd5 . "'
			WHERE id='" . $args->user_id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "users_edit"){

	$sql = "UPDATE users 
			SET fname = '" . $args->fname . "', lname = '" . $args->lname . "', hourrate = '" . $args->hourrate . "'
			WHERE id='" . $args->id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "Update created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "mark_as_read"){

	$sql = "UPDATE notes 
			SET notes.read = 1
			WHERE id='" . $id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "update_declarations"){

	$outp = "";
	foreach ($args->selected as $id){
		$sql = "UPDATE declarations 
				SET invoiced = '" . $args->invoiceId . "'
				WHERE id='" . $id . "'";

		if ($conn->query($sql) === TRUE) {
		    $result = "New record created successfully";
		} else {
		    $result = "Error: " . $sql . "<br>" . $conn->error;
		}
		$outp = $result;
		$outp = $sql;

	}

}

if($subject == "update_declarations_credits"){

	$outp = "";
	foreach ($args->credits as $id){
		$sql = "UPDATE declarations_credits 
				SET invoiced = '" . $args->invoiceId . "'
				WHERE id='" . $id->id . "'";

		if ($conn->query($sql) === TRUE) {
		    $result = "New record created successfully";
		} else {
		    $result = "Error: " . $sql . "<br>" . $conn->error;
		}
		$outp = $result;
		$outp = $sql;

	}

}


if($subject == "close_case"){

	$sql = "UPDATE cases 
			SET cases.status = 1
			WHERE id='" . $id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				$outp = $sql;
}

if($subject == "test"){

	$sql = "UPDATE invoice 
			SET invoice.content = '" . $args->decoded . "'
			WHERE id='9'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}


$conn->close();

echo $outp;
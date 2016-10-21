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

if($subject == "update_case"){

	$sql = "UPDATE cases a 
			INNER JOIN opponents b ON (a.opponent_id = b.id)
			SET a.casename = '" . $args->casename . "',
				a.case_id_alias = '" . $args->case_id_alias . "',
				a.comment = '" . $args->comment . "',
				a.case_type = '" . $args->case_type . "',
				a.process = '" . $args->process . "',
				a.confidential = '" . $args->confidential . "',
				a.toevoeging = '" . $args->toevoeging . "',
				a.office_charge = '" . $args->office_charge . "',
				a.btw = '" . $args->btw . "',

				b.opp_company = '" . $args->opp_company . "',
				b.opp_fname = '" . $args->opp_fname . "',
				b.opp_lname = '" . $args->opp_lname . "',
				b.opp_tel = '" . $args->opp_tel . "',
				b.opp_email = '" . $args->opp_email . "',
				b.opp_address = '" . $args->opp_address . "',
				b.opp_zipcode = '" . $args->opp_zipcode . "',
				b.opp_city = '" . $args->opp_city . "',
				b.opp_comment = '" . $args->opp_comment . "'

			WHERE a.id='" . $args->case_id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				$outp = $sql;
}

if($subject == "update_customer"){

	$sql = "UPDATE customers 
			SET customers.company = '" . $args->company . "',
				customers.fname = '" . $args->fname . "',
				customers.lname = '" . $args->lname . "',
				customers.tel = '" . $args->tel . "',
				customers.alt_tel = '" . $args->alt_tel . "',
				customers.email = '" . $args->email . "',
				customers.alt_email = '" . $args->alt_email . "',
				customers.branche = '" . $args->branche . "',
				customers.btwnr = '" . $args->btwnr . "',
				customers.kvk = '" . $args->kvk . "',
				customers.banknr = '" . $args->banknr . "',
				customers.address = '" . $args->address . "',
				customers.zipcode = '" . $args->zipcode . "',
				customers.city = '" . $args->city . "',
				customers.cor_address = '" . $args->cor_address . "',
				customers.cor_zipcode = '" . $args->cor_zipcode . "',
				customers.cor_city = '" . $args->cor_city . "',
				customers.comment = '" . $args->comment . "'
				WHERE id='" . $args->id . "'";

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
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

if($subject == "update_declarations_invoice"){

	$outp = "";
	// foreach ($args->selected as $id){
	// 	$sql = "UPDATE declarations 
	// 			SET invoiced = '" . $args->invoiceId . "'
	// 			WHERE id='" . $id . "'";

	// 	if ($conn->query($sql) === TRUE) {
	// 	    $result = "New record created successfully";
	// 	} else {
	// 	    $result = "Error: " . $sql . "<br>" . $conn->error;
	// 	}
	// 	$outp = $result;
	// 	$outp = $sql;

	// }

	$selected = implode(", ",$args->selected);

		$sql = "UPDATE declarations 
				SET invoiced = '" . $args->invoiceId . "'
				WHERE declarations.id in (" . $selected . ")";

		if ($conn->query($sql) === TRUE) {
		    $result = "New record created successfully";
		} else {
		    $result = "Error: " . $sql . "<br>" . $conn->error;
		}
		//$outp = $result;
		$outp = $sql;

}

if($subject == "update_declarations_subscription_id"){

	$outp = "";


	$selected = implode(", ",$args->subsciption_used);

		$sql = "UPDATE declarations 
				SET subscription_id = '" . $args->subscription_id . "'
				WHERE declarations.id in (" . $selected . ")";

		if ($conn->query($sql) === TRUE) {
		    $result = "New record created successfully";
		} else {
		    $result = "Error: " . $sql . "<br>" . $conn->error;
		}
		//$outp = $result;
		$outp = $sql;

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

///reopenCase

if($subject == "reopen_case"){

	$sql = "UPDATE cases 
			SET cases.status = 0
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
			LEFT JOIN opponents b ON (a.opponent_id = b.id)
			SET a.casename = '" . $args->casename . "',
				a.case_id_alias = '" . $args->case_id_alias . "',
				a.comment = '" . $args->comment . "',
				a.case_type = '" . $args->case_type . "',
				a.process = '" . $args->process . "',
				a.confidential = '" . $args->confidential . "',
				a.toevoeging = '" . $args->toevoeging . "',
				a.office_charge = '" . $args->office_charge . "',
				a.btw = '" . $args->btw . "',
				a.adviesdossier = '" . $args->adviesdossier . "',
				a.incassodossier = '" . $args->incassodossier . "',

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
				//$outp = $sql;
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


//edit_declarations

if($subject == "update_declarations"){

	$amount = ($args->hourrate / 60) * $args->time;
	$sql = "UPDATE declarations 
			SET declarations.declaration_date = '" . $args->declaration_date . "',
				declarations.amount = '" . $amount . "',
				declarations.type_declaration = '" . $args->type_declaration_id . "',
				declarations.time = '" . $args->time . "',
				declarations.comment = '" . $args->comment . "'
				WHERE id='" . $args->id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				$outp = $sql;
}

//update_credits
if($subject == "update_credits"){

	$sql = "UPDATE declarations_credits 
			SET declarations_credits.credit_name = '" . $args->credit_name . "',
				declarations_credits.btw = '" . $args->btw . "',
				declarations_credits.price_ex_btw = '" . $args->price_ex_btw . "'
				WHERE id='" . $args->id . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				$outp = $sql;
}

if($subject == "update_subscription_used"){

	$sql = "UPDATE subscription
			SET minutes_used = minutes_used + " .$args->minutes_used_total . "
			WHERE subscription.id = '" . $args->id . "'";

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
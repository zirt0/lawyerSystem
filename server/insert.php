<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id = $request->id;

$args = $request->args;

$notes = $request->notes;

//print $subject;


if($subject == "createCase"){

	$opp_id = "";

	if($args->opponentcheck){
		
		$opponent = "INSERT INTO opponents (opp_company, opp_fname, opp_lname, opp_tel, opp_email, opp_address, opp_zipcode, opp_city, opp_comment)
		VALUES ('".$args->opp_company."',
				'".$args->opp_fname."',
				'".$args->opp_lname."',
				'".$args->opp_tel."',
				'".$args->opp_email."',
				'".$args->opp_address."',
				'".$args->opp_zipcode."',
				'".$args->opp_city."',
				'".$args->opp_comment."')
				";
		if ($conn->query($opponent) === TRUE) {
		    $opp_id = $conn->insert_id;

		} else {
		    $result = "Error: " . $sql . "<br>" . $conn->error;
		    //$result = "false";
		}
	}

	$sql = "INSERT INTO cases (casename, customer_id, opponent_id, case_type, comment, status, process, toevoeging, confidential, office_charge, btw, adviesdossier, belang, prognose, rolnaam, user_id, case_id_alias)
			VALUES ( '" . $args->case_name . "', 
					'" . $args->customer_id . "', 
					'" . $opp_id . "', 
					'" . $args->case_type . "', 
					'" . $args->comment . "', 
					'" . $args->status . "', 
					'" . $args->process . "', 
					'" . $args->toevoeging . "', 
					'" . $args->confidential . "', 
					'" . $args->office_charge . "', 
					'" . $args->btw . "',
					'" . $args->adviesdossier . "',  
					'" . $args->belang . "', 
					'" . $args->prognose . "', 
					'" . $args->rolnaam . "',
					'" . $args->user_id . "',
					'" . $args->dossiernummer . "')";

				if ($conn->query($sql) === TRUE) {
				    $insertedId = $conn->insert_id;
				    $result = $insertedId;
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				    //$result = "false";
				}
				$outp = $result;
				//$outp = $sql;
				//$outp =$opponent;
}

if($subject == "createCustomer"){

	$sql = "INSERT INTO customers (company, fname, lname, tel, email, alt_tel, reference, address, zipcode, city, cor_address, cor_zipcode, cor_city, branche, banknr, kvk, btwnr, comment)
			VALUES ( '" . $args->company . "', 
					'" . $args->fname . "', 
					'" . $args->lname . "', 
					'" . $args->tel . "', 
					'" . $args->email . "', 
					'" . $args->alt_tel . "', 
					'" . $args->reference . "', 
					'" . $args->address . "', 
					'" . $args->zipcode . "', 
					'" . $args->city . "', 
					'" . $args->cor_address . "', 
					'" . $args->cor_zipcode . "', 
					'" . $args->cor_city . "', 
					'" . $args->branche . "', 
					'" . $args->banknr . "', 
					'" . $args->kvk . "', 
					'" . $args->btw . "', 
					'" . $args->comment . "')";

				if ($conn->query($sql) === TRUE) {
				    $insertedId = $conn->insert_id;
				    $result = $insertedId;
				} else {
				    //$result = "Error: " . $sql . "<br>" . $conn->error;
				    $result = "false";
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "declaration_add"){

	$sql = "INSERT INTO declarations (case_id, user_id, type_declaration, amount, time, comment)
			VALUES ( '" . $args->case_id . "', 
					'" . $args->user_id . "',
					'" . $args->choice . "', 
					'" . $args->amount . "', 
					'" . $args->time . "', 
					'" . $args->info . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "declaration_type_add"){

	$sql = "INSERT INTO declarations_type (declaration_name)
			VALUES ( '" . $args->declaration_name_new . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "options"){

	$sql = "UPDATE options 
			SET option_value = '" . $args->option_value . "'
			WHERE option_name='" . $args->option_name . "'";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				$outp = $result;
				//$outp = $sql;
}

if($subject == "insert_subscription"){

	$sql = "INSERT INTO subscription (customer_id, start_date, end_date, minutes, amount)
			VALUES ( '" . $args->customer_id . "', '" . $args->start_date . "', '" . $args->end_date . "', '" . $args->minutes . "', '" . $args->amount . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
				$outp = $sql;
}

if($subject == "add_new_user"){

	$sql = "INSERT INTO users (username, fname, lname, hourrate, password, role, status)
			VALUES ( '" . $args->username . "', '" . $args->fname . "', '" . $args->lname . "', '" . $args->hourrate . "', '" . $args->passwordmd5 . "', 'employer', '1')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
				$outp = $sql;
}


if($subject == "notes_add"){

	$sql = "INSERT INTO notes (case_id, from_user_id, to_user_id, content)
			VALUES ( '" . $args->case_id . "', '" . $args->from_user_id . "', '" . $args->to_user_id . "', '" . $args->content . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
				$outp = $sql . "this is is strange";
}

//insert_invoice

if($subject == "insert_invoice"){

	$sql = "INSERT INTO invoice (invoice_alias, user_id, discount_amount, content, total, belaste_ver, onbelaste_ver)
			VALUES ( '" . $args->invoiceId . "', '" . $args->user_id . "', '" . $args->discountAmount . "', '" . $args->pdf_one . "', '" . $args->total_onbelaste_verschotten . "', '" . $args->belaste_ver . "', '" . $args->onbelaste_ver . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
				$outp = $sql . "this is is strange";
}

//insert_payment
if($subject == "insert_declaration_credits"){

	$sql = "INSERT INTO declarations_credits (case_id, credit_name, price_ex_btw, btw)
			VALUES ( '" . $args->case_id . "', '" . $args->credit_name . "', '" . $args->price_ex_btw . "', '" . $args->btw . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
}

//add_payment
if($subject == "add_payment"){

	$sql = "INSERT INTO payments (invoice_id, amount, type)
			VALUES ( '" . $args->payment_id . "', '" . $args->amount . "', '" . $args->paymenttype . "')";

				if ($conn->query($sql) === TRUE) {
				    $result = "New record created successfully";
				} else {
				    $result = "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$outp = $result;
}

$conn->close();

echo $outp;
<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id = $request->id;

$args = $request->args;

$decl = $request->decl;
//print $subject;



if($subject == "login"){

	$sql = "SELECT * FROM users WHERE username = '" . $args->username . "' AND password = '" . $args->password . "'";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"username":"'  . $rs["username"] . '",';
	    $outp .= '"password":"'  . $rs["password"] . '",';
	    $outp .= '"status":"'  . $rs["status"] . '",';
	   	$outp .= '"hourrate":"'  . $rs["hourrate"] . '",';
	   	$outp .= '"hourrate_reduced":"'  . $rs["hourrate_reduced"] . '",';
	   	$outp .= '"fname":"'  . $rs["fname"] . '",';
	   	$outp .= '"lname":"'  . $rs["lname"] . '",';
	   	$outp .= '"avatar":"'  . $rs["avatar"] . '",';
	    $outp .= '"role":"'. $rs["role"]    . '"}'; 
	}
	$outp = $outp;
}

if($subject == "users"){

	$sql = "SELECT * FROM users";

	if ($args->user_id){
		$sql .= " WHERE id = '" . $args->user_id ."'";
	}
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"username":"'  . $rs["username"] . '",';
	    $outp .= '"password":"'  . $rs["password"] . '",';
	    $outp .= '"status":"'  . $rs["status"] . '",';
	   	$outp .= '"hourrate":"'  . $rs["hourrate"] . '",';
	   	$outp .= '"hourrate_reduced":"'  . $rs["hourrate_reduced"] . '",';
	   	$outp .= '"fname":"'  . $rs["fname"] . '",';
	   	$outp .= '"lname":"'  . $rs["lname"] . '",';
	   	$outp .= '"avatar":"'  . $rs["avatar"] . '",';
	    $outp .= '"role":"'. $rs["role"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "customer"){

	$sql = "SELECT * FROM customers WHERE id = '" . $id . "'";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'  . $rs["fname"] . '",';
	    $outp .= '"lname":"'  . $rs["lname"] . '",';
	    $outp .= '"tel":"'  . $rs["tel"] . '",';
	    $outp .= '"alt_tel":"'  . $rs["alt_tel"] . '",';
	    $outp .= '"email":"'  . $rs["email"] . '",';
	    $outp .= '"alt_email":"'  . $rs["alt_email"] . '",';
	    $outp .= '"reference":"'  . $rs["reference"] . '",';
	    $outp .= '"address":"'  . $rs["address"] . '",';
	    $outp .= '"zipcode":"'  . $rs["zipcode"] . '",';
	    $outp .= '"city":"'  . $rs["city"] . '",';
	    $outp .= '"cor_address":"'  . $rs["cor_address"] . '",';
	    $outp .= '"cor_zipcode":"'  . $rs["cor_zipcode"] . '",';
	    $outp .= '"cor_city":"'  . $rs["cor_city"] . '",';
	    $outp .= '"branche":"'  . $rs["branche"] . '",';
	    $outp .= '"banknr":"'  . $rs["banknr"] . '",';
	    $outp .= '"kvk":"'  . $rs["kvk"] . '",';
	    $outp .= '"btwnr":"'  . $rs["btwnr"] . '",';
	    $outp .= '"date_add":"'  . $rs["date_add"] . '",';
	    $outp .= '"date_mutation":"'  . $rs["date_mutation"] . '",';
	    $outp .= '"comment":"'. $rs["comment"]    . '"}'; 
	}
	
	$outp = $outp;
}

if($subject == "customers"){

	$sql = "SELECT * FROM customers";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"tel":"'  . $rs["tel"] . '",';
	    $outp .= '"alt_tel":"'  . $rs["alt_tel"] . '",';
	    $outp .= '"date_add":"'. $rs["date_add"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "cases"){

	$sql = "SELECT *, cases.id as 'case_id', customers.fname, customers.lname, customers.company
			FROM cases LEFT JOIN customers ON customers.id = cases.customer_id";

			if ($args->user_id){
				$sql .= " WHERE cases.user_id = " . $args->user_id;
			}

			if (!$args->user_id){
				$sql .= " ORDER BY cases.case_id_alias DESC";
			}


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"customer_id":"'   . $rs["customer_id"]        . '",';
	    $outp .= '"case_type":"'   . $rs["case_type"]        . '",';
	    $outp .= '"create_date":"'   . $rs["create_date"]        . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"confidential":"'   . $rs["confidential"] . '",';
	    $outp .= '"case_id_alias":"'   . $rs["case_id_alias"] . '",';
	    $outp .= '"status":"'. $rs["status"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "casedetail"){

	$sql = "SELECT *, cases.id as case_id, 
	customers.company, customers.fname, customers.lname, opponents.id as 'opp_id'
	FROM cases
	LEFT JOIN customers ON customers.id = cases.customer_id 
	LEFT JOIN opponents ON opponents.id = cases.opponent_id
	LEFT JOIN opponent_lawyer ON opponents.opp_lawyer_id = opponent_lawyer.id 
	WHERE cases.id = " . $id;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"customer_id":"'   . $rs["customer_id"]        . '",';
	    $outp .= '"opponent_id":"'   . $rs["opponent_id"]        . '",';
	    $outp .= '"case_type":"'   . $rs["case_type"]        . '",';
	    $outp .= '"status":"'   . $rs["status"]        . '",';
	    $outp .= '"toevoeging":"'   . $rs["toevoeging"]        . '",';
	    $outp .= '"office_charge":"'   . $rs["office_charge"]        . '",';
	    $outp .= '"btw":"'   . $rs["btw"]        . '",';
	    $outp .= '"adviesdossier":"'   . $rs["adviesdossier"]        . '",';
	    $outp .= '"incassodossier":"'   . $rs["incassodossier"]        . '",';
	    $outp .= '"process":"'   . $rs["process"]        . '",';
	    $outp .= '"confidential":"'   . $rs["confidential"]        . '",';
	    $outp .= '"belang":"'   . $rs["belang"]        . '",';
	    $outp .= '"prognose":"'   . $rs["prognose"]        . '",';
	    $outp .= '"comment":"'   . $rs["comment"]        . '",';
	    $outp .= '"rolnaam":"'   . $rs["rolnaam"]        . '",';
	    
	    $outp .= '"company":"'   . $rs["company"]        . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"tel":"'   . $rs["tel"]        . '",';
	    $outp .= '"alt_tel":"'   . $rs["alt_tel"]        . '",';
	    $outp .= '"email":"'   . $rs["email"]        . '",';
	    $outp .= '"alt_email":"'   . $rs["alt_email"]        . '",';
	    $outp .= '"address":"'   . $rs["address"]        . '",';
	    $outp .= '"zipcode":"'   . $rs["zipcode"]        . '",';
	    $outp .= '"city":"'   . $rs["city"]        . '",';
	    $outp .= '"kvk":"'   . $rs["kvk"]        . '",';
	    $outp .= '"banknr":"'   . $rs["banknr"]        . '",';
	    $outp .= '"btwnr":"'. $rs["btwnr"]    . '",'; 

	    $outp .= '"opp_lawyer_id":"'   . $rs["opp_lawyer_id"]. '",';
	    $outp .= '"opp_id":"'   . $rs["opp_id"]. '",';
	    $outp .= '"lawyer_company":"'   . $rs["lawyer_company"]. '",';
	    $outp .= '"lawyer_fname":"'   . $rs["lawyer_fname"]. '",';
	    $outp .= '"lawyer_lname":"'   . $rs["lawyer_lname"]. '",';
	    $outp .= '"lawyer_tel":"'   . $rs["lawyer_tel"]. '",';
	    $outp .= '"lawyer_email":"'   . $rs["lawyer_email"]. '",';
	    $outp .= '"lawyer_addres":"'   . $rs["lawyer_addres"]. '",';
	    $outp .= '"lawyer_zipcode":"'   . $rs["lawyer_zipcode"]. '",';
	    $outp .= '"lawyer_city":"'   . $rs["lawyer_city"] . '",';

	    
	    $outp .= '"opp_company":"'   . $rs["opp_company"]        . '",';
	    $outp .= '"opp_fname":"'   . $rs["opp_fname"]        . '",';
	    $outp .= '"opp_lname":"'   . $rs["opp_lname"]        . '",';
	    $outp .= '"opp_tel":"'   . $rs["opp_tel"]        . '",';
	    $outp .= '"opp_email":"'   . $rs["opp_email"]        . '",';
	    $outp .= '"opp_address":"'   . $rs["opp_address"]        . '",';
	    $outp .= '"opp_zipcode":"'   . $rs["opp_zipcode"]        . '",';
	    $outp .= '"opp_city":"'   . $rs["opp_city"]        . '",';
	    $outp .= '"opp_comment":"'   . $rs["opp_comment"]        . '",';
	    $outp .= '"case_id_alias":"'. $rs["case_id_alias"]    . '"}'; 
	}

	// SELECT container_content.id as id,container_content.place_name, container_content.container_department, contracts.kenteken, contracts.id as contracts_id, customers.company, customers.fname, customers.lname FROM container_content
	// 		LEFT JOIN contracts ON contracts.container_contents_id = container_content.id
	// 		LEFT JOIN customers ON  contracts.customer_id = customers.id
	// 		WHERE container_id = " . $id;
	$outp = $outp;
	//$outp = $sql;
}

if($subject == "customer_cases"){

	$sql = "SELECT cases.casename, cases.id, cases.create_date , users.fname as lawyerfname, users.lname as lawyerlname FROM cases
			LEFT JOIN users ON users.id = cases.user_id
			WHERE customer_id ='". $id ."'";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"user_id":"'  . $rs["user_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"lawyerfname":"'  . $rs["lawyerfname"] . '",';
	    $outp .= '"lawyerlname":"'  . $rs["lawyerlname"] . '",';
	    $outp .= '"create_date":"'. $rs["create_date"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "case_type"){

	$sql = "SELECT * FROM case_type";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_name":"'. $rs["case_name"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "declaration_type"){

	$sql = "SELECT * FROM declarations_type";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	   	$outp .= '"declaration_name":"'  . $rs["declaration_name"] . '",';
	    $outp .= '"alias":"'. $rs["alias"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "declarations"){

	$sql = "SELECT declarations.id, declarations.time, declarations.amount, declarations.invoiced, declarations.comment, declarations.declaration_date,
		declarations_type.declaration_name,
		cases.casename, cases.id as case_id, cases.customer_id, cases.office_charge,
		users.fname, users.lname, users.hourrate, users.hourrate_reduced";

	if ($decl->groupBy){
		$sql .= ", SUM(amount) as total_amount";
	}

	$sql .= " FROM declarations 
			LEFT JOIN declarations_type ON declarations.type_declaration = declarations_type.id
			LEFT JOIN cases ON declarations.case_id = cases.id
			LEFT JOIN users ON declarations.user_id = users.id";
	
	if ($decl->case_id && !$decl->get_from_date && !$decl->all_invoiced){
		$sql .= " WHERE case_id ='" . $decl->case_id ."' AND declarations.invoiced = 0 ORDER BY declarations.`declaration_date` DESC";
	}

	if ($decl->start_date){
		$sql .= " WHERE declarations.case_id ='". $decl->case_id ."' AND declarations.declaration_date BETWEEN '". $decl->start_date ."' AND '". $decl->end_date ." 23:59:00' AND declarations.invoiced = 0 ORDER BY declarations.declaration_date DESC";
	}

	if ($decl->invoiced){
		$sql .= " WHERE invoiced ='" . $decl->invoiced ."' ORDER BY declarations.`declaration_date` DESC";
	}

	if ($decl->case_id && $decl->all_invoiced){
		$sql .= "  WHERE case_id ='" . $decl->case_id ."' AND invoiced !='' ORDER BY declarations.`declaration_date` DESC";
	}

	if ($decl->user_id){
		$sql .= " WHERE declarations.user_id ='" . $decl->user_id . "'";
	}

	if ($decl->orderBy){
		$sql .= " ORDER BY declarations.`declaration_date` " . $decl->orderBy;
	}

	if ($decl->limit){
		$sql .= " LIMIT " . $decl->limit;
	}

	if ($decl->groupBy){
		$sql .= " GROUP BY case_id";
	}

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"customer_id":"'  . $rs["customer_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	   	$outp .= '"declaration_name":"'  . $rs["declaration_name"] . '",';
	   	$outp .= '"alias":"'  . $rs["alias"] . '",';
	   	$outp .= '"time":"'  . $rs["time"] . '",';
	   	$outp .= '"amount":"'  . $rs["amount"] . '",';
	   	//$outp .= '"paid":"'  . $rs["paid"] . '",';
	   	$outp .= '"invoiced":"'  . $rs["invoiced"] . '",';
	   	$outp .= '"total_amount":"'  . $rs["total_amount"] . '",';
	   	$outp .= '"declaration_date":"'  . date("Y-m-d", strtotime($rs["declaration_date"])) . '",';
	   	$outp .= '"comment":"'  . $rs["comment"] . '",';

		$outp .= '"fname":"'  . $rs["fname"] . '",';	   	
		$outp .= '"lname":"'  . $rs["lname"] . '",';
		$outp .= '"hourrate":"'  . $rs["hourrate"] . '",';
		$outp .= '"hourrate_reduced":"'  . $rs["hourrate_reduced"] . '",';

	    $outp .= '"declaration_name":"'. $rs["declaration_name"]    . '"}'; 
	}
		
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "subscription_history"){

	$sql = "SELECT declarations.id, declarations.time, declarations.amount, declarations.invoiced, declarations.comment, declarations.declaration_date,
		declarations_type.declaration_name,
		cases.casename, cases.id as case_id, cases.customer_id, cases.office_charge,
		users.fname, users.lname, users.hourrate, users.hourrate_reduced FROM declarations 
			LEFT JOIN declarations_type ON declarations.type_declaration = declarations_type.id
			LEFT JOIN cases ON declarations.case_id = cases.id
			LEFT JOIN users ON declarations.user_id = users.id
			 WHERE declarations.subscription_id = " . $args->subscription_id;


	


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"customer_id":"'  . $rs["customer_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	   	$outp .= '"declaration_name":"'  . $rs["declaration_name"] . '",';
	   	$outp .= '"alias":"'  . $rs["alias"] . '",';
	   	$outp .= '"time":"'  . $rs["time"] . '",';
	   	$outp .= '"amount":"'  . $rs["amount"] . '",';
	   	//$outp .= '"paid":"'  . $rs["paid"] . '",';
	   	$outp .= '"invoiced":"'  . $rs["invoiced"] . '",';
	   	$outp .= '"total_amount":"'  . $rs["total_amount"] . '",';
	   	$outp .= '"declaration_date":"'  . date("Y-m-d", strtotime($rs["declaration_date"])) . '",';
	   	$outp .= '"comment":"'  . $rs["comment"] . '",';

		$outp .= '"fname":"'  . $rs["fname"] . '",';	   	
		$outp .= '"lname":"'  . $rs["lname"] . '",';
		$outp .= '"hourrate":"'  . $rs["hourrate"] . '",';
		$outp .= '"hourrate_reduced":"'  . $rs["hourrate_reduced"] . '",';

	    $outp .= '"declaration_name":"'. $rs["declaration_name"]    . '"}'; 
	}
		
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

///
if($subject == "invoices"){

	$sql = "SELECT declarations.*, cases.casename, SUM(declarations.time) AS declaratation_time, SUM(declarations.amount) AS declaration_total FROM declarations 
			INNER JOIN cases ON declarations.case_id = cases.id
			INNER JOIN customers ON cases.customer_id = customers.id
			WHERE invoiced != 'NULL'";

			if ($decl->case_id){
				$sql .= " AND cases.customer_id = " . $decl->case_id;
			}

			if ($decl->customer_id){
				$sql .= " AND customers.id = " . $decl->customer_id;
			}
			
			$sql .= " GROUP BY invoiced";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"invoiced":"'  . $rs["invoiced"] . '",';
	    $outp .= '"declaratation_time":"'  . $rs["declaratation_time"] . '",';
	    $outp .= '"declaration_total":"'. $rs["declaration_total"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "get_invoices"){

	$sql = "SELECT invoice.*, cases.casename, users.fname, users.lname FROM invoice 
	INNER JOIN declarations ON invoice.invoice_alias = declarations.invoiced
	INNER JOIN cases ON declarations.case_id = cases.id
	INNER JOIN users ON invoice.user_id = users.id";
	
	if ($args->case_id){
		$sql .= " WHERE declarations.case_id = '" . $args->case_id . "'";
	}

	if ($args->user_id){
		$sql .= " WHERE users.id = '" . $args->user_id . "'";
	}

	$sql .= " GROUP BY declarations.invoiced";

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"date":"'  . $rs["date"] . '",';
	    $outp .= '"invoice_alias":"'  . $rs["invoice_alias"] . '",';
	    $outp .= '"discount_amount":"'  . $rs["discount_amount"] . '",';
	    $outp .= '"total":"'  . $rs["total"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"lname":"'  . $rs["lname"] . '",';
	    $outp .= '"fname":"'  . $rs["fname"] . '",';
	    $outp .= '"content":"'  . $rs["content"] . '",';
	    $outp .= '"content_invoice":"'  . $rs["content_invoice"] . '"}';
	}

	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}



if($subject == "subscription_time"){

	$sql = "SELECT * FROM subscription
			WHERE customer_id = '" . $id .  "'  AND end_date >= CURDATE()";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"start_date":"'  . $rs["start_date"] . '",';
	    $outp .= '"end_date":"'  . $rs["end_date"] . '",';
	    $outp .= '"minutes":"'  . $rs["minutes"] . '",';
	    $outp .= '"minutes_used":"'  . $rs["minutes_used"] . '",';
	    $outp .= '"amount":"'  . $rs["amount"] . '",';
	    $outp .= '"reduced_hourrate":"'. $rs["reduced_hourrate"] . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "last_declarations"){

	$sql = "SELECT SUM(amount) as total_amount, COUNT(id) as count_declaraties 
			FROM declarations
			WHERE declaration_date >= NOW( ) - INTERVAL " .$args->last_months . " MONTH";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"total_amount":"'  . $rs["total_amount"] . '",';
	    $outp .= '"count_declaraties":"'. $rs["count_declaraties"] . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "options"){

	$sql = "SELECT option_value FROM options
			WHERE option_name = '" . $args .  "'";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= $rs["option_value"]; 
	}
	//$outp ='{"records":['.$outp.']}';
	$outp = $outp;
}

if($subject == "count_declarations"){

	$sql = "SELECT count(id) as count_declarations FROM cases WHERE create_date >= NOW( ) - INTERVAL " .$args->last_months . " MONTH";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"count_declarations":"'  . $rs["count_declarations"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

//count_customers
if($subject == "count_customers"){

	$sql = "SELECT count(id) as count_customers FROM customers WHERE date_add >= NOW( ) - INTERVAL " .$args->last_months . " MONTH";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"count_customers":"'  . $rs["count_customers"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "subscription"){

	$sql = "SELECT * ,DATEDIFF(subscription.end_date, NOW()) AS diffDate, subscription.id as sub_id, customers.id as customer_id
			FROM subscription
			LEFT JOIN customers ON customers.id = subscription.customer_id";
	
	if($args->valid_date){
		$sql .= " WHERE end_date >= NOW( )";
	}

	if ($id){
		$sql .= " WHERE subscription.customer_id ='" . $id ."'";
	}

	if ($args->subscription_id){
		$sql .= " WHERE subscription.id ='" . $args->subscription_id ."'";
	}

	$sql .= " ORDER BY DiffDate DESC";

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"sub_id":"'  . $rs["sub_id"] . '",';
	    $outp .= '"start_date":"'  . $rs["start_date"] . '",';
	    $outp .= '"end_date":"'  . $rs["end_date"] . '",';
	    $outp .= '"minutes":"'  . $rs["minutes"] . '",';
	    $outp .= '"minutes_used":"'  . $rs["minutes_used"] . '",';
	    $outp .= '"amount":"'  . $rs["amount"] . '",';
	    $outp .= '"customer_id":"'  . $rs["customer_id"] . '",';
	    $outp .= '"fname":"'  . $rs["fname"] . '",';
	    $outp .= '"lname":"'  . $rs["lname"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"diffDate":"'. $rs["diffDate"] . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

///
if($subject == "declarations_past"){

	$sql = "SELECT *, SUM(amount) as total_amount FROM declarations
WHERE declaration_date BETWEEN NOW() - INTERVAL " .$args->last_months . " MONTH AND NOW()
GROUP BY declaration_date";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"time":"'  . $rs["time"] . '",';
	    $outp .= '"total_amount":"'  . $rs["total_amount"] . '",';
	    $outp .= '"declaration_date":"'. $rs["declaration_date"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

///
if($subject == "notes"){

	$sql = "SELECT notes.id, notes.content, notes.read, 
			t1.id as from_id, t1.fname as from_fname, t1.lname as from_lname, 
			t2.id as to_id, t2.fname as to_fname, t2.lname as to_lname,
			cases.casename FROM notes
			INNER JOIN users t1 ON notes.from_user_id = t1.id
			INNER JOIN users t2 ON notes.to_user_id = t2.id
			INNER JOIN cases ON notes.case_id = cases.id";

	if ($args->user_id && !$args->readed){
		$sql .= " WHERE notes.to_user_id ='" . $args->user_id ."'  ORDER BY notes.id DESC";
	}

	if ($args->case_id){
		$sql .= " WHERE notes.case_id ='" . $args->case_id ."'   ORDER BY notes.id DESC";
	}

	if ($args->user_id && $args->readed){
		$sql .= " WHERE notes.to_user_id ='" . $args->user_id ."' AND notes.read = 0 ORDER BY notes.id DESC";
	}


	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"content":"'  . $rs["content"] . '",';
	    $outp .= '"from_id":"'  . $rs["from_id"] . '",';
	    $outp .= '"from_fname":"'  . $rs["from_fname"] . '",';
	    $outp .= '"from_lname":"'  . $rs["from_lname"] . '",';
	    $outp .= '"to_id":"'  . $rs["to_id"] . '",';
	    $outp .= '"to_fname":"'  . $rs["to_fname"] . '",';
	    $outp .= '"to_lname":"'  . $rs["to_lname"] . '",';
	    $outp .= '"read":"'  . $rs["read"] . '",';
	    $outp .= '"casename":"'. $rs["casename"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "declarations_credits"){

	$sql = "SELECT * FROM declarations_credits";

	if ($args->case_id){
		$sql .= " WHERE declarations_credits.case_id ='" . $args->case_id ."'";
	}

	if ($args->invoiced){
		$sql .= " AND declarations_credits.invoiced IS NULL";
	}

	if ($args->groupBy){
		$sql .= " INNER JOIN cases ON declarations_credits.case_id = cases.id GROUP BY case_id";
	}


	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"credit_name":"'  . $rs["credit_name"] . '",';
	    $outp .= '"price_ex_btw":"'  . $rs["price_ex_btw"] . '",';
	    $outp .= '"btw":"'  . $rs["btw"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';

	    $outp .= '"invoiced":"'. $rs["invoiced"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "testcase"){

	$sql = "SELECT * FROM invoice WHERE id = '6'";



	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';

	    $outp .= '"content":"'. file_get_contents($rs["content"])    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}


if($subject == "get_paymentinfo"){

	$sql = "SELECT * FROM invoice
			LEFT JOIN declarations ON invoice.invoice_alias = declarations.invoiced
			LEFT JOIN cases ON declarations.case_id = cases.id
			LEFT JOIN customers ON cases.customer_id = customers.id
			WHERE invoice.id = '" . $args->payment_id ."'";



	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"invoice_alias":"'  . $rs["invoice_alias"] . '",';
	    $outp .= '"total":"'  . $rs["total"] . '",';
	    $outp .= '"case_name":"'  . $rs["case_name"] . '",';
	    $outp .= '"fname":"'  . $rs["fname"] . '",';
	    $outp .= '"lname":"'  . $rs["lname"] . '",';
	    $outp .= '"address":"'  . $rs["address"] . '",';
	    $outp .= '"zipcode":"'  . $rs["zipcode"] . '",';
	    $outp .= '"city":"'  . $rs["city"] . '",';
	    $outp .= '"tel":"'  . $rs["tel"] . '",';	
	    $outp .= '"alt_tel":"'  . $rs["alt_tel"] . '",';
	    $outp .= '"email":"'  . $rs["email"] . '",';
	    $outp .= '"btwnr":"'  . $rs["btwnr"] . '",';
	    $outp .= '"banknr":"'  . $rs["banknr"] . '",';
	    $outp .= '"kvk":"'  . $rs["kvk"] . '",';
	    $outp .= '"company":"'. $rs["company"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "get_paymentinfo_payed_rows"){

	$sql = "SELECT * FROM payments WHERE invoice_id = '" . $args->payment_id ."'";

	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"amount":"'  . $rs["amount"] . '",';
	    $outp .= '"type":"'  . $rs["type"] . '",';
	    $outp .= '"date":"'. $rs["date"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "get_paymentinfo_payed"){

	$sql = "SELECT id, SUM(amount) AS total_amount FROM payments WHERE invoice_id = '" . $args->payment_id ."'";

	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"total_amount":"'. $rs["total_amount"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}


if($subject == "get_options"){

	$sql = "SELECT * FROM options";

	$result = $conn->query($sql);

	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"option_name":"'  . $rs["option_name"] . '",';
	    $outp .= '"option_value":"'. $rs["option_value"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "get_customer_financial_details"){

	$sql = "SELECT SUM(amount) as total_declarations, SUM(time) as total_time FROM declarations
			LEFT JOIN cases ON declarations.case_id = cases.id
			LEFT JOIN customers ON cases.customer_id = customers.id
			WHERE customers.id = " . $request->id;
	
	$result = $conn->query($sql);
	
	$outp = "";
	
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"total_declarations":"'  . $rs["total_declarations"] . '",';
	    $outp .= '"total_time":"'  . $rs["total_time"] . '"}';
	}

	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}


if($subject == "opponents"){

	$sql = "SELECT * FROM opponents";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"opp_lawyer_id":"'  . $rs["opp_lawyer_id"] . '",';
	    $outp .= '"opp_company":"'  . $rs["opp_company"] . '",';
	    $outp .= '"opp_fname":"'   . $rs["opp_fname"]        . '",';
	    $outp .= '"opp_lname":"'   . $rs["opp_lname"]        . '",';
	    $outp .= '"opp_tel":"'  . $rs["opp_tel"] . '",';
	    $outp .= '"opp_email":"'  . $rs["opp_email"] . '",';
	    $outp .= '"opp_address":"'  . $rs["opp_address"] . '",';
	    $outp .= '"opp_zipcode":"'  . $rs["opp_zipcode"] . '",';
	    $outp .= '"opp_city":"'  . $rs["opp_city"] . '",';
	    $outp .= '"opp_comment":"'. $rs["opp_comment"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "lawyers"){

	$sql = "SELECT * FROM opponent_lawyer";

	if ($args->id){
		$sql .= " WHERE opponent_lawyer.id ='" . $args->id ."'";
	}


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"lawyer_company":"'  . $rs["lawyer_company"] . '",';
	    $outp .= '"lawyer_fname":"'   . $rs["lawyer_fname"]        . '",';
	    $outp .= '"lawyer_lname":"'   . $rs["lawyer_lname"]        . '",';
	    $outp .= '"lawyer_tel":"'  . $rs["lawyer_tel"] . '",';
	    $outp .= '"lawyer_email":"'  . $rs["lawyer_email"] . '",';
	    $outp .= '"lawyer_address":"'  . $rs["lawyer_address"] . '",';
	    $outp .= '"lawyer_zipcode":"'  . $rs["lawyer_zipcode"] . '",';
	    $outp .= '"lawyer_city":"'  . $rs["lawyer_city"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "lawyers_case_details"){

	$sql = "SELECT *, opponents.id as opp_id, cases.id as case_id FROM opponents 
			JOIN cases ON opponents.id = cases.opponent_id
			WHERE opponents.opp_lawyer_id = " . $args->id . " 
			GROUP BY cases.id
			";

	// if ($args->id){
	// 	$sql .= " WHERE opponent_lawyer.id ='" . $args->id ."'";
	// }


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"opp_fname":"'  . $rs["opp_fname"] . '",';
	    $outp .= '"opp_lname":"'   . $rs["opp_lname"]        . '",';
	    $outp .= '"opp_company":"'   . $rs["opp_company"]        . '",';
	    $outp .= '"opp_id":"'  . $rs["opp_id"] . '",';
	    $outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"case_id":"'  . $rs["case_id"] . '",';
	    $outp .= '"create_date":"'  . $rs["create_date"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "users_stats"){

	$sql = "SELECT user_id, SUM(amount) as amount, SUM(time) as time, COUNT(amount) as count, users.lname, users.fname, users.hourrate 
			FROM declarations
			LEFT JOIN users ON declarations.user_id = users.id";
			
	if ($args->start_date && $args->end_date){
		$sql .= " WHERE declarations.declaration_date BETWEEN '". $args->start_date ."' AND '". $args->end_date ." 23:59:00'";
	}			 	
	
	$sql .=  " GROUP BY user_id";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"user_id":"'  . $rs["user_id"] . '",';
	    $outp .= '"amount":"'  . $rs["amount"] . '",';
	    $outp .= '"time":"'   . $rs["time"]        . '",';
	    $outp .= '"count":"'   . $rs["count"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"fname":"'  . $rs["fname"] . '",';
	    $outp .= '"hourrate":"'  . $rs["hourrate"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "total_invoice"){

	$sql = "SELECT SUM(invoice.total) as total_invoice FROM cases 
			LEFT JOIN declarations ON cases.id = declarations.case_id
			LEFT JOIN invoice ON declarations.invoiced = invoice.invoice_alias";
			

	if ($request->id){
		$sql .= " WHERE cases.customer_id = " . $request->id ;
	}
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"total_invoice":"'  . $rs["total_invoice"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "total_invoice_payed"){

	$sql = "SELECT SUM(payments.amount) as total_payed FROM cases 
			LEFT JOIN declarations ON cases.id = declarations.case_id
			LEFT JOIN invoice ON declarations.invoiced = invoice.invoice_alias
			LEFT JOIN payments ON invoice.id = payments.invoice_id";
			

	if ($request->id){
		$sql .= " WHERE cases.customer_id = " . $request->id ;
	}
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"total_payed":"'  . $rs["total_payed"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "total_invoice_payed"){

	$sql = "SELECT payments.*, SUM(payments.amount) as payed_amount FROM invoice
			LEFT JOIN payments ON invoice.id = payments.invoice_id";
			

	if ($request->id){
		$sql .= " WHERE invoice.id = " . $request->id ;
	}
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"payed_amount":"'  . $rs["payed_amount"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "declarations_minutes"){

	$sql = "SELECT SUM(time) as total_minutes FROM declarations
			WHERE case_id =" . $args->case_id ;
			

	if ($args->check_invoiced){
		$sql .= " AND invoiced != '0'" ;
	}

	if ($args->check_not_invoiced){
		$sql .= " AND invoiced = '0'" ;
	}

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"total_minutes":"'  . $rs["total_minutes"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

//user_declarations_details
if($subject == "user_declarations_details"){

	$sql = "SELECT declarations.amount, declarations.time, declarations.comment, declarations.declaration_date,
cases.casename,	
declarations_type.declaration_name  FROM declarations 
LEFT JOIN cases ON declarations.case_id = cases.id 
LEFT JOIN declarations_type ON declarations.type_declaration = declarations_type.id 
WHERE declarations.user_id = " . $args->user_id ;
			

	if ($args->check_invoiced){
		$sql .= " AND invoiced != '0'" ;
	}
$sql .= " ORDER BY declarations.declaration_date DESC";


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"amount":"'  . $rs["amount"] . '",';
	    $outp .= '"time":"'  . $rs["time"] . '",';
	    $outp .= '"comment":"'  . $rs["comment"] . '",';
	   	$outp .= '"declaration_date":"'  . $rs["declaration_date"] . '",';
	   	$outp .= '"casename":"'  . $rs["casename"] . '",';
	    $outp .= '"declaration_name":"'. $rs["declaration_name"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

//

//user_declarations_details
if($subject == "user_declarations_details_for_chart"){

	$sql = "SELECT DATE(declaration_date) as DATE, SUM(`time`) total_time, SUM(`amount`) total_amount
FROM declarations ";
if ($args->user_id){
	$sql .= " WHERE declarations.user_id = " . $args->user_id;
}


if ($args->start_date && $args->end_date && !$args->user_id){
	$sql .= " WHERE declaration_date BETWEEN '". $args->start_date ."' AND '". $args->end_date ." 23:59:00'";
}	

if ($args->start_date && $args->end_date && $args->user_id){
	$sql .= " AND declaration_date BETWEEN '". $args->start_date ."' AND '". $args->end_date ." 23:59:00'";
}	

$sql .= " GROUP BY DATE(declaration_date)";
			


	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"DATE":"'  . $rs["DATE"] . '",';
	    $outp .= '"total_time":"'  . $rs["total_time"] . '",';
	    $outp .= '"total_amount":"'. $rs["total_amount"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}




$conn->close();

echo $outp;